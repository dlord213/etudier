import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
  const { height, width } = useWindowDimensions();
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles(theme);

  return (
    <SafeAreaView style={[styleState.safeAreaView, { height: height / 4 }]}>
      <ThemedText text="TEST" style={{ fontFamily: "WorkSans_400Regular" }} />
    </SafeAreaView>
  );
}

const styles = (context: any) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor:
        context != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      gap: 16,
    },
  });
