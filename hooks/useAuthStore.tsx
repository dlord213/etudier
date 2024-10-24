import { create } from "zustand";
import PocketBase from "pocketbase";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  };
  token: string;
}

interface AuthStoreInterface {
  client_instance: PocketBase;
  form: AuthFormInterface;
  session: SessionInterface;
  loadStoredSession: () => Promise<void>;
  clearStoredSession: () => Promise<void>;
  handleLogin: () => Promise<void>;
  handleRegister: () => Promise<void>;
  setEmail: (emailVal: string) => void;
  setPassword: (passwordVal: string) => void;
  setName: (nameVal: string) => void;
  resetForm: () => void;
  toggleIsAuthing: () => void;
  isAuthing: boolean;
  isLoggedIn: boolean;
}

const useAuthStore = create<AuthStoreInterface>()((set, get) => ({
  client_instance: new PocketBase("https://oasis-mob-prog-act.pockethost.io"),
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
  loadStoredSession: async () => {
    try {
      let session = await AsyncStorage.getItem("@session");
      if (session) {
        set({ isAuthing: true });
        let parsedSession = JSON.parse(session);
        set({ session: parsedSession });
        console.log(get().session.record.email);
        get().client_instance.authStore.save(parsedSession.token);
        if (get().client_instance.authStore.isValid) {
          set({ isAuthing: false });
          set({ isLoggedIn: true });
        }
      }
    } catch (err) {
      return;
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
      console.log(authData);
      await AsyncStorage.setItem("@session", JSON.stringify(authData));
      set({ isAuthing: false });
      set({ isLoggedIn: true });
    } catch (error) {
      console.error("Login error: ", error);
      set({ isAuthing: false });
      set({ isLoggedIn: false });
      get().resetForm();
      ToastAndroid.show(
        `Login failed: ${error.message || "Unknown error occurred"}`,
        ToastAndroid.LONG
      );
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

      console.log(authData);
      await AsyncStorage.setItem("@session", JSON.stringify(authData));
      set({ isAuthing: false });
      set({ isLoggedIn: true });
    } catch (error) {
      console.error("Login error: ", error);
      set({ isAuthing: false });
      set({ isLoggedIn: false });
      get().resetForm();
      ToastAndroid.show(
        `Login failed: ${error.message || "Unknown error occurred"}`,
        ToastAndroid.LONG
      );
    }
  },
  setEmail: (emailVal: string) =>
    set({ form: { ...get().form, email: emailVal } }),
  setPassword: (passwordVal: string) =>
    set({ form: { ...get().form, password: passwordVal } }),
  setName: (nameVal: string) => set({ form: { ...get().form, name: nameVal } }),
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
}));

export default useAuthStore;
