import { useContext } from "react";
import { ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import ThemedText from "@/components/ThemedText";
import ThemedPressableOpacity from "@/components/ThemedPressableOpacity";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "@/styles/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  const router = useRouter();

  const iconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  async function clearData() {
    await SecureStore.deleteItemAsync("name");
    await SecureStore.deleteItemAsync("palette");
    router.dismissAll();
    router.replace("/");
    ToastAndroid.show("Cleared data", ToastAndroid.SHORT);
  }

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText
        text="Settings"
        style={{
          fontFamily: "WorkSans_700Bold",
          fontSize: 36,
          textAlign: "center",
        }}
      />
      <ThemedPressableOpacity
        style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
      >
        <MaterialCommunityIcons name="bell" size={24} color={iconColor} />
        <ThemedText
          text="Notifications"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
      </ThemedPressableOpacity>
      <ThemedPressableOpacity
        style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
        onPress={() => {
          router.push("settings/theme");
        }}
      >
        <Ionicons name="color-palette" size={24} color={iconColor} />
        <ThemedText
          text="Theme"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
      </ThemedPressableOpacity>
      <ThemedText
        text="Advanced"
        style={{
          fontFamily: "WorkSans_700Bold",
          fontSize: 14,
          color: Colors[palette][500],
        }}
      />
      <ThemedPressableOpacity
        style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
      >
        <AntDesign name="reload1" size={20} color={iconColor} />
        <ThemedText
          text="Reset activity log"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
      </ThemedPressableOpacity>
      <ThemedPressableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
        }}
        style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
      >
        <MaterialCommunityIcons
          name="note-remove"
          size={24}
          color={iconColor}
        />
        <ThemedText
          text="Clear all tasks & logs"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
      </ThemedPressableOpacity>
      <ThemedPressableOpacity
        style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
        onPress={() => {
          clearData();
        }}
      >
        <FontAwesome6 name="trash" size={24} color={iconColor} />
        <ThemedText
          text="Clear data"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
      </ThemedPressableOpacity>
      <StatusBar style={theme == "dark" ? "light" : "inverted"} />
    </SafeAreaView>
  );
}
