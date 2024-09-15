import { useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ThemedPressable from "@/components/ThemedPressable";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  const [timer, setTimer] = useState("25:00");

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View
          style={{
            width: "49%",
            height: 8,
            backgroundColor: Colors.Backgrounds_Dark.Hover,
            borderRadius: 16,
          }}
        />
        <View
          style={{
            width: "49%",
            height: 8,
            backgroundColor: Colors.Backgrounds_Dark.Hover,
            borderRadius: 16,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <ThemedText
          text={timer}
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 36 }}
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: Colors.Backgrounds_Dark.Hover,
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <FontAwesome5 name="play" size={24} color={Colors[palette][400]} />
        </Pressable>
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
      textAlign: "center",
      fontSize: 36,
    },
  });
