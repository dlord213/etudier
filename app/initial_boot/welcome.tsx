import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import { useContext } from "react";
import * as SecureStore from "expo-secure-store";

import AntDesign from "@expo/vector-icons/AntDesign";
import ThemeContext from "@/contexts/ThemeContext";
import Colors from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import ThemedPressable from "@/components/ThemedPressable";
import { Link } from "expo-router";

async function getValueFor(key: any) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles(theme);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <Link href="/initial_boot">
        <AntDesign
          name="arrowleft"
          size={24}
          color={
            theme != "light"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default
          }
        />
      </Link>
      <View>
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          text={"Welcome"}
        />
        <ThemedText
          style={{ fontFamily: "WorkSans_400Regular", fontSize: 14 }}
          text="Let's make studying simple, focused, and fun. Ready to achieve your goals? We're here to help every step of the way!"
          color="tertiary"
        />
      </View>
      <Link asChild href="(tabs)">
        <ThemedPressable
          backgroundColor={Colors[palette][600]}
          children={
            <>
              <Text
                style={{
                  color:
                    theme != "light"
                      ? Colors.Text_Dark.Default
                      : Colors.Text_Light.Default,
                  fontFamily: "WorkSans_400Regular",
                  fontSize: 14,
                }}
              >
                Get started
              </Text>
              <AntDesign
                name="arrowright"
                size={24}
                color={
                  theme != "light"
                    ? Colors.Text_Dark.Default
                    : Colors.Text_Light.Default
                }
              />
            </>
          }
        />
      </Link>
      <View style={{ gap: 8, flexDirection: "row" }}>
        <View
          style={{
            width: "49%",
            height: 8,
            backgroundColor: Colors.Backgrounds_Dark.Hover,
            borderRadius: 16,
          }}
        ></View>
        <View
          style={{
            width: "49%",
            height: 8,
            backgroundColor: Colors[palette][600],
            borderRadius: 16,
          }}
        ></View>
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
      justifyContent: "flex-end",
      gap: 16,
    },
  });
