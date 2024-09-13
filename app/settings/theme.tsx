import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";

export default function Page() {
  const { setPalette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  async function changeStoredPalette(palette: string) {
    await SecureStore.setItemAsync("palette", palette);
  }

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
    </SafeAreaView>
  );
}

const styles = (context: any) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:
        context != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      gap: 16,
    },
  });
