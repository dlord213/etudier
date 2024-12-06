import { create } from "zustand";
import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { differenceInDays, parseISO } from "date-fns";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner-native";
import * as Network from "expo-network";

interface AuthFormInterface {
  email: string;
  password: string;
  name?: string;
}

interface SessionInterface {
  record: {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    updated: string;
    username: string;
    verified: boolean;
    is_premium: boolean;
  };
  token: string;
}

interface AuthStoreInterface {
  client_instance: PocketBase;
  form: AuthFormInterface;
  session: RecordAuthResponse<RecordModel> | SessionInterface;
  isChangeEmailSent: boolean;
  isChangePasswordSent: boolean;
  isVerifyEmailSent: boolean;
  loadStoredSession: () => Promise<void>;
  updateSession: () => Promise<void>;
  clearStoredSession: () => Promise<void>;
  handleLogin: () => Promise<void>;
  handleRegister: () => Promise<void>;
  handleLogout: () => Promise<void>;
  requestVerification: () => Promise<void>;
  requestChangeEmail: () => Promise<void>;
  requestChangePassword: () => Promise<void>;
  setEmail: (emailVal: string) => void;
  setPassword: (passwordVal: string) => void;
  setName: (nameVal: string) => void;
  resetForm: () => void;
  toggleIsAuthing: () => void;
  isAuthing: boolean;
  isLoggedIn: boolean;
  uploadOnCloud: (tasks: string, notes: string) => Promise<number | undefined>;
  getDataOnCloud: () => Promise<void>;
}

function canUpdateAfterThreeDays(lastUpdated: string): boolean {
  const daysSinceLastUpdate = differenceInDays(
    new Date(),
    parseISO(lastUpdated)
  );
  return daysSinceLastUpdate >= 3;
}

const useAuthStore = create<AuthStoreInterface>()(
  immer((set, get) => ({
    client_instance: new PocketBase("https://etudier.pockethost.io/"),
    form: {
      email: "",
      password: "",
      name: "",
    },
    session: {
      record: {
        avatar: "",
        collectionId: "",
        collectionName: "",
        created: "",
        email: "",
        emailVisibility: false,
        id: "",
        name: "",
        updated: "",
        username: "",
        verified: false,
      },
      token: "",
    },
    isChangeEmailSent: false,
    isChangePasswordSent: false,
    isVerifyEmailSent: false,
    loadStoredSession: async () => {
      try {
        let session = await AsyncStorage.getItem("@session");
        if (session) {
          set({ isAuthing: true });
          let parsedSession = JSON.parse(session);
          set({ session: parsedSession });
          get().client_instance.authStore.save(parsedSession.token);
          if (get().client_instance.authStore.isValid) {
            try {
              const refreshedData = await get()
                .client_instance.collection("users")
                .authRefresh();

              set({ session: refreshedData });

              await AsyncStorage.setItem(
                "@session",
                JSON.stringify(refreshedData)
              );

              set({ isAuthing: false });
              set({ isLoggedIn: true });
            } catch (error) {
              get().clearStoredSession();
              set({ isAuthing: false, isLoggedIn: false });
            }
          }
        } else {
          get().clearStoredSession();
          set({ isAuthing: false, isLoggedIn: false });
        }
      } catch (err) {
        get().clearStoredSession();
        set({ isAuthing: false, isLoggedIn: false });
      }
    },
    updateSession: async () => {
      try {
        if (get().client_instance.authStore.isValid) {
          try {
            const refreshedData = await get()
              .client_instance.collection("users")
              .authRefresh();

            set({ session: refreshedData });

            await AsyncStorage.setItem(
              "@session",
              JSON.stringify(refreshedData)
            );

            set({ isAuthing: false });
            set({ isLoggedIn: true });
          } catch (error) {
            get().clearStoredSession();
            set({ isAuthing: false, isLoggedIn: false });
          }
        }
      } catch (err) {
        throw err;
      }
    },
    clearStoredSession: async () => {
      await AsyncStorage.removeItem("@session");
    },
    handleLogin: async () => {
      const { email, password } = get().form;

      if (!email || !password) {
        ToastAndroid.show(
          `Email and Password fields cannot be empty.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        ToastAndroid.show(
          `Please enter a valid email address.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return;
      }

      if (password.length < 8) {
        ToastAndroid.show(
          `Password must be at least 8 characters long.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return;
      }

      try {
        const authData = await get()
          .client_instance.collection("users")
          .authWithPassword(email, password);
        set({ session: authData });
        await AsyncStorage.setItem("@session", JSON.stringify(authData));
        await AsyncStorage.removeItem("@notes");
        await AsyncStorage.removeItem("@tasks");
        await get().getDataOnCloud();

        set({ isAuthing: false });
        set({ isLoggedIn: true });
      } catch (error) {
        set({ isAuthing: false });
        set({ isLoggedIn: false });
        get().resetForm();
        toast(`Login failed, please check your credentials.`, {
          duration: 3000,
        });
      }
    },
    handleRegister: async () => {
      const { email, password, name } = get().form;

      if (!email || !password || !name) {
        ToastAndroid.show(
          `Email/Password/Name fields cannot be empty.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        ToastAndroid.show(
          `Please enter a valid email address.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return;
      }

      if (password.length < 8) {
        ToastAndroid.show(
          `Password must be at least 8 characters long.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return;
      }

      try {
        const registrationData = await get()
          .client_instance.collection("users")
          .create({
            email: get().form.email,
            password: get().form.password,
            passwordConfirm: get().form.password,
            name: get().form.name,
          });

        const authData = await get()
          .client_instance.collection("users")
          .authWithPassword(email, password);

        set({ session: authData });

        await AsyncStorage.setItem("@session", JSON.stringify(authData));
        await AsyncStorage.removeItem("@notes");
        await AsyncStorage.removeItem("@tasks");

        set({ isAuthing: false, isLoggedIn: true });
      } catch (error) {
        set({ isAuthing: false, isLoggedIn: false });
        get().resetForm();

        ToastAndroid.show(
          `Register failed: ${
            error.details || error.message || "Unknown error occurred"
          }`,
          ToastAndroid.LONG
        );
      }
    },
    handleLogout: async () => {
      try {
        await AsyncStorage.removeItem("@session");
        await AsyncStorage.removeItem("@notes");
        await AsyncStorage.removeItem("@tasks");

        get().client_instance.authStore.clear();
        set({ isEmailSent: false, isAuthing: false, isLoggedIn: false });
        router.replace("/");
      } catch (error) {
        get().resetForm();
        ToastAndroid.show(
          `Login failed: ${error.message || "Unknown error occurred"}`,
          ToastAndroid.LONG
        );
      }
    },
    requestVerification: async () => {
      if (get().isLoggedIn) {
        const isVerified = get().session.record.verified == true ? true : false;

        if (isVerified) {
          ToastAndroid.show("Account already verified", ToastAndroid.SHORT);
          return;
        }

        if (get().isVerifyEmailSent) {
          ToastAndroid.show(
            "Email verification already sent, check your email.",
            ToastAndroid.SHORT
          );
          return;
        }

        try {
          await get()
            .client_instance.collection("users")
            .requestVerification(get().session.record.email);

          set({ isVerifyEmailSent: true });

          ToastAndroid.show(
            "Please check your e-mail address.",
            ToastAndroid.SHORT
          );
        } catch (err) {
          ToastAndroid.show(`Error: ${err.message}`, ToastAndroid.SHORT);
        }
      }
    },
    requestChangeEmail: async () => {
      if (get().isLoggedIn) {
        const isVerified = get().session.record.verified == true ? true : false;
        const lastUpdated = get().session.record.updated;

        if (!isVerified) {
          ToastAndroid.show(
            "Please verify your email address before changing your email address.",
            ToastAndroid.SHORT
          );
          return;
        }

        if (!canUpdateAfterThreeDays(lastUpdated)) {
          ToastAndroid.show(
            "You can only request after 3 days of your last update.",
            ToastAndroid.SHORT
          );
          return;
        }

        if (get().isChangeEmailSent) {
          ToastAndroid.show(
            "Please check your email, it's already sent.",
            ToastAndroid.SHORT
          );
          return;
        }

        try {
          await get()
            .client_instance.collection("users")
            .requestEmailChange(get().session.record.email);

          set({ isChangeEmailSent: true });

          ToastAndroid.show(
            "Please check your e-mail address.",
            ToastAndroid.SHORT
          );
        } catch (err) {
          ToastAndroid.show(`Error: ${err.message}`, ToastAndroid.SHORT);
        }
      }
    },
    requestChangePassword: async () => {
      if (get().isLoggedIn) {
        const isVerified = get().session.record.verified == true ? true : false;
        const lastUpdated = get().session.record.updated;

        if (!isVerified) {
          ToastAndroid.show(
            "Please verify your email address before changing your email address.",
            ToastAndroid.SHORT
          );
          return;
        }

        if (!canUpdateAfterThreeDays(lastUpdated)) {
          ToastAndroid.show(
            "You can only request after 3 days of your last update.",
            ToastAndroid.SHORT
          );
          return;
        }

        if (get().isChangePasswordSent) {
          ToastAndroid.show(
            "Please check your email, it's already sent.",
            ToastAndroid.SHORT
          );
          return;
        }

        try {
          await get()
            .client_instance.collection("users")
            .requestPasswordReset(get().session.record.email);

          set({ isChangeEmailSent: true });

          ToastAndroid.show(
            "Please check your e-mail address.",
            ToastAndroid.SHORT
          );
        } catch (err) {
          ToastAndroid.show(`Error: ${err.message}`, ToastAndroid.SHORT);
        }
      }
    },
    setEmail: (emailVal: string) =>
      set({ form: { ...get().form, email: emailVal } }),
    setPassword: (passwordVal: string) =>
      set({ form: { ...get().form, password: passwordVal } }),
    setName: (nameVal: string) =>
      set({ form: { ...get().form, name: nameVal } }),
    resetForm: () =>
      set({
        form: {
          email: "",
          password: "",
          name: "",
        },
      }),
    toggleIsAuthing: () => set({ isAuthing: !get().isAuthing }),
    isAuthing: false,
    isLoggedIn: false,
    uploadOnCloud: async (tasks: string, notes: string) => {
      const networkState = await Network.getNetworkStateAsync();
      if (networkState.isInternetReachable) {
        try {
          const data = {
            user_id: get().session.record.id,
            tasks: JSON.parse(tasks),
            notes: JSON.parse(notes),
          };

          const existingTasksRecord = await get()
            .client_instance.collection("task")
            .getList(1, 5, {
              filter: `user_id="${get().client_instance.authStore.model?.id}"`,
            });

          const existingNotesRecord = await get()
            .client_instance.collection("note")
            .getList(1, 5, {
              filter: `user_id="${get().client_instance.authStore.model?.id}"`,
            });

          if (existingTasksRecord.items.length == 0) {
            const createTasksRecord = await get()
              .client_instance.collection("task")
              .create({ user_id: data.user_id, tasks: data.tasks });

            if (createTasksRecord) {
              await AsyncStorage.setItem(
                "@tasks",
                JSON.stringify(createTasksRecord.tasks)
              );
            }
          } else {
            const updateExistingTaskRecord = await get()
              .client_instance.collection("task")
              .update(existingTasksRecord.items[0].id, { tasks: data.tasks });

            if (updateExistingTaskRecord) {
              await AsyncStorage.setItem(
                "@tasks",
                JSON.stringify(updateExistingTaskRecord.tasks)
              );
            }
          }

          if (existingNotesRecord.items.length == 0) {
            const createNotesRecord = await get()
              .client_instance.collection("note")
              .create({ user_id: data.user_id, notes: data.notes });

            if (createNotesRecord) {
              await AsyncStorage.setItem(
                "@notes",
                JSON.stringify(createNotesRecord.notes)
              );
            }
          } else {
            const updateExistingNotesRecord = await get()
              .client_instance.collection("note")
              .update(existingNotesRecord.items[0].id, { notes: data.notes });

            if (updateExistingNotesRecord) {
              await AsyncStorage.setItem(
                "@notes",
                JSON.stringify(updateExistingNotesRecord.notes)
              );
            }
          }

          return 200;
        } catch (error) {
          toast.error(`Error uploading on cloud: ${error}`);
          console.log(error);
          throw error;
        }
      } else {
        return;
      }
    },
    getDataOnCloud: async () => {
      await AsyncStorage.removeItem("@notes");
      await AsyncStorage.removeItem("@tasks");
      try {
        const existingTasksRecord = await get()
          .client_instance.collection("task")
          .getList(1, 5, {
            filter: `user_id="${get().client_instance.authStore.model?.id}"`,
          });

        const existingNotesRecord = await get()
          .client_instance.collection("note")
          .getList(1, 5, {
            filter: `user_id="${get().client_instance.authStore.model?.id}"`,
          });

        if (existingTasksRecord.items.length >= 1) {
          await AsyncStorage.setItem(
            "@tasks",
            JSON.stringify(existingTasksRecord.items[0].tasks)
          );
        }

        if (existingNotesRecord.items.length >= 1) {
          await AsyncStorage.setItem(
            "@notes",
            JSON.stringify(existingNotesRecord.items[0].notes)
          );
        }

        return;
      } catch (error) {
        throw error;
      }
    },
  }))
);

export default useAuthStore;
