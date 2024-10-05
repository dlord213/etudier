import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { theme, palette } = useContext(ThemeContext);
  const styleState = styles(theme);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText text="Settings" style={styleState.headingTextStyle} />
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
    headingTextStyle: {
      fontFamily: "WorkSans_700Bold",
      fontSize: 30,
    },
  });
