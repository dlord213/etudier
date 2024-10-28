import Colors from "@/constants/Colors";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { router } from "expo-router";
import ThemedText from "@/components/ThemedText";
import useThemeStore from "@/hooks/useThemeStore";
import useAuthStore from "@/hooks/useAuthStore";

export default function Page() {
  const { isDarkMode, palette } = useThemeStore();

  const {
    session,
    handleLogout,
    requestVerification,
    requestChangeEmail,
    requestChangePassword,
    isVerifyEmailSent,
  } = useAuthStore();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const styleState = styles(isDarkMode);

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
      <View style={{ gap: 16, marginBottom: 8 }}>
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
                isDarkMode
                  ? Colors.Text_Dark.Default
                  : Colors.Text_Light.Default
              }
            />
          ) : (
            <Image
              style={{
                width: 64,
                height: 64,
                backgroundColor: isDarkMode
                  ? Colors.Backgrounds_Dark.Brand
                  : Colors.Backgrounds_Light.Brand,
                borderRadius: 999,
              }}
              src={session.record.avatar}
            />
          )}
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
            >
              <Ionicons name="bar-chart-outline" size={24} color={iconColor} />
              <ThemedText text="Activity Log" />
            </Pressable>
            <Pressable
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
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
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
          }}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={24} color={iconColor} />
          <ThemedText text="Log-out" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      paddingHorizontal: 16,
      gap: 16,
    },
  });
