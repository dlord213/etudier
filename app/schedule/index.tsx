import ThemedPressableOpacity from "@/components/ThemedPressableOpacity";
import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useContext } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { theme, palette } = useContext(ThemeContext);
  const { height: screenHeight } = useWindowDimensions();

  const headingIconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  const styleState = styles(theme);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText text="Schedules" style={styleState.headingTextStyle} />
        <ThemedPressableOpacity>
          <FontAwesome6 name="add" size={20} color={headingIconColor} />
        </ThemedPressableOpacity>
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
    headingTextStyle: {
      fontFamily: "WorkSans_700Bold",
      fontSize: 30,
    },
  });
