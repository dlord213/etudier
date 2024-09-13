import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import ThemedText from "@/components/ThemedText";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

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
      <ThemedText
        text="Advanced"
        style={{
          fontFamily: "WorkSans_700Bold",
          fontSize: 14,
          color: Colors[palette][500],
        }}
      />
      <Pressable
        style={({ pressed }) => [
          {
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <AntDesign
          name="reload1"
          size={20}
          color={
            theme == "dark"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default
          }
        />
        <ThemedText
          text="Reset history log"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <FontAwesome6
          name="trash"
          size={24}
          color={
            theme == "dark"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default
          }
        />
        <ThemedText
          text="Clear data"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
      </Pressable>
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
