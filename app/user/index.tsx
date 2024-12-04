import Colors from "@/constants/Colors";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as IntentLauncher from "expo-intent-launcher";
import { SheetManager } from "react-native-actions-sheet";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import ThemedText from "@/components/ThemedText";
import useThemeStore from "@/hooks/useThemeStore";
import useAuthStore from "@/hooks/useAuthStore";
import useNoteStore from "@/hooks/useNoteStore";
import useTaskStore from "@/hooks/useTaskStore";
import { useEffect, useState } from "react";

export default function Page() {
  const { isDarkMode, palette, isOLEDMode } = useThemeStore();
  const { storedNotes, clearStoredNotes } = useNoteStore();
  const { storedTasks, clearStoredTasks } = useTaskStore();

  const {
    client_instance,
    session,
    handleLogout,
    requestVerification,
    requestChangeEmail,
    requestChangePassword,
    uploadOnCloud,
  } = useAuthStore();

  const [avatarURL, setAvatarURL] = useState<any>(
    client_instance.files.getUrl(session.record, session.record.avatar)
  );
  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const styleState = styles(isDarkMode, isOLEDMode);

  const dataOnCloudMutation = useMutation({
    mutationFn: () =>
      uploadOnCloud(JSON.stringify(storedTasks), JSON.stringify(storedNotes)),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Data synced!", { dismissible: false, duration: 3000 });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Data not synced, please try again.", {
        dismissible: false,
        duration: 3000,
      });
    },

    onMutate: () => {
      toast.dismiss();
      toast.loading("Syncing...", { dismissible: false });
    },
  });

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
          <AntDesign
            name="arrowleft"
            size={28}
            color={iconColor}
            onPress={() => router.back()}
          />
          <ThemedText
            text="Profile"
            style={{ fontFamily: "WorkSans_700Bold", fontSize: 32 }}
          />
        </View>
        <FontAwesome
          name="gear"
          size={28}
          color={iconColor}
          onPress={() => router.push("/settings")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!session.record.avatar ? (
          <FontAwesome
            name="user-circle"
            size={64}
            color={
              isDarkMode ? Colors.Text_Dark.Default : Colors.Text_Light.Default
            }
          />
        ) : avatarURL ? (
          <Image
            style={{
              width: 64,
              height: 64,
              backgroundColor: isDarkMode
                ? Colors.Backgrounds_Dark.Brand
                : Colors.Backgrounds_Light.Brand,
              borderRadius: 999,
            }}
            src={avatarURL}
          />
        ) : null}
        <View>
          <ThemedText
            text={session.record.name != "" ? session.record.name : "No name"}
            style={{
              fontFamily: "WorkSans_700Bold",
              color: Colors[palette][500],
              fontSize: 24,
            }}
          />
          <ThemedText text={session.record.email} color="Tertiary" />
        </View>
      </View>
      <View
        style={{ justifyContent: "space-between", flex: 1, paddingBottom: 16 }}
      >
        <View style={{ gap: 16 }}>
          <View style={{ gap: 16 }}>
            <ThemedText
              text="General"
              style={{
                fontFamily: "WorkSans_700Bold",
              }}
              color="Tertiary"
            />
            <Pressable
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
              onPress={() => SheetManager.show("settings-edit-profile-sheet")}
            >
              <Ionicons name="pencil-sharp" size={24} color={iconColor} />
              <ThemedText text="Edit Profile" />
            </Pressable>
          </View>
          <View style={{ gap: 16 }}>
            <ThemedText
              text="Account"
              style={{
                fontFamily: "WorkSans_700Bold",
              }}
              color="Tertiary"
            />
            <Pressable
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
              onPress={requestChangePassword}
            >
              <Ionicons name="lock-closed" size={24} color={iconColor} />
              <ThemedText text="Change password" />
            </Pressable>
            <Pressable
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
              onPress={requestChangeEmail}
            >
              <Ionicons name="mail-sharp" size={24} color={iconColor} />
              <ThemedText text="Change email address" />
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
                display: session.record.verified ? "none" : "flex",
              }}
              onPress={requestVerification}
            >
              <MaterialCommunityIcons
                name="account-check"
                size={24}
                color={iconColor}
              />
              <ThemedText text="Verify email address" />
            </Pressable>
          </View>
          <View style={{ gap: 16 }}>
            <ThemedText
              text="Notifications"
              style={{
                fontFamily: "WorkSans_700Bold",
              }}
              color="Tertiary"
            />
            <Pressable
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
              onPress={async () => {
                IntentLauncher.startActivityAsync(
                  IntentLauncher.ActivityAction.APPLICATION_SETTINGS
                );
              }}
            >
              <Ionicons name="notifications" size={24} color={iconColor} />
              <View style={{ flexShrink: 1 }}>
                <ThemedText text="Allow on do not disturb mode" />
                <ThemedText
                  text="By turning this on, you'll get notified more of your reminders/tasks."
                  color="Secondary"
                />
              </View>
            </Pressable>
          </View>
          <View style={{ gap: 16 }}>
            <ThemedText
              text="Premium"
              style={{
                fontFamily: "WorkSans_700Bold",
              }}
              color="Tertiary"
            />
            <Pressable
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
                display: session.record.is_premium ? "none" : "flex",
              }}
              onPress={() => SheetManager.show("premium-upgrade-sheet")}
            >
              <MaterialCommunityIcons
                name="account-arrow-up"
                size={24}
                color={iconColor}
              />
              <ThemedText text="Upgrade to premium" />
            </Pressable>
            <Pressable
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
              onPress={() => {
                if (session.record.is_premium) {
                  dataOnCloudMutation.mutate();
                } else {
                  SheetManager.show("premium-upgrade-sheet");
                }
              }}
            >
              <MaterialCommunityIcons name="sync" size={24} color={iconColor} />
              <ThemedText text="Sync your data" />
            </Pressable>
          </View>
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
          }}
          onPress={() => {
            handleLogout();
            clearStoredNotes();
            clearStoredTasks();
          }}
        >
          <Ionicons name="log-out" size={24} color={iconColor} />
          <ThemedText text="Log-out" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = (isDarkMode: boolean, isOLEDMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? isOLEDMode
          ? "#000000"
          : Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      paddingHorizontal: 16,
      gap: 16,
    },
  });
