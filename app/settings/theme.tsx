import { useContext } from "react";
import { Pressable, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import styles from "@/styles/settings";

export default function Page() {
  const { palette, setPalette, theme, setTheme } = useContext(ThemeContext);
  const styleState = styles(theme);

  async function changeStoredPalette(palette: string) {
    await SecureStore.setItemAsync("palette", palette);
  }

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await SecureStore.setItemAsync("theme", newTheme);
  };

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText
        text="Theme"
        style={{
          fontFamily: "WorkSans_700Bold",
          fontSize: 36,
          textAlign: "center",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="Dark Mode"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
        <Switch
          value={theme == "dark" ? true : false}
          thumbColor={Colors[palette][500]}
          trackColor={{
            false: Colors[palette][300],
            true: Colors[palette][100],
          }}
          ios_backgroundColor={Colors[palette][50]}
          onValueChange={toggleTheme}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "space-evenly",
        }}
      >
        <Pressable
          onPress={() => {
            changeStoredPalette("Astral");
            setPalette("Astral");
          }}
          style={{
            backgroundColor: Colors.Astral[500],
            width: 36,
            height: 36,
            borderRadius: 999,
          }}
        />
        <Pressable
          onPress={() => {
            changeStoredPalette("Emerald");
            setPalette("Emerald");
          }}
          style={{
            backgroundColor: Colors.Emerald[500],
            width: 36,
            height: 36,
            borderRadius: 999,
          }}
        />
        <Pressable
          onPress={() => {
            changeStoredPalette("Victoria");
            setPalette("Victoria");
          }}
          style={{
            backgroundColor: Colors.Victoria[500],
            width: 36,
            height: 36,
            borderRadius: 999,
          }}
        />
        <Pressable
          onPress={() => {
            changeStoredPalette("Wewak");
            setPalette("Wewak");
          }}
          style={{
            backgroundColor: Colors.Wewak[500],
            width: 36,
            height: 36,
            borderRadius: 999,
          }}
        />
        <Pressable
          onPress={() => {
            changeStoredPalette("Willow");
            setPalette("Willow");
          }}
          style={{
            backgroundColor: Colors.Willow[500],
            width: 36,
            height: 36,
            borderRadius: 999,
          }}
        />
      </View>
      <StatusBar style={theme == "dark" ? "light" : "inverted"} />
    </SafeAreaView>
  );
}
