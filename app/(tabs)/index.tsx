import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import Colors from "@/constants/Colors";
import { useContext } from "react";
import ThemeContext from "@/contexts/ThemeContext";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles(theme);

  return <SafeAreaView style={styleState.safeAreaView}></SafeAreaView>;
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
      justifyContent: "flex-end",
      gap: 16,
    },
  });
