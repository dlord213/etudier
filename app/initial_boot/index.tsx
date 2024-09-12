import Colors from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import AntDesign from "@expo/vector-icons/AntDesign";
import ThemedText from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedPressable from "@/components/ThemedPressable";
import ThemeContext from "@/contexts/ThemeContext";

async function save(key: any, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles(theme);
  const router = useRouter();

  const [name, setName] = useState<string>("");

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View>
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          text={"Name"}
        />
        <ThemedText
          style={{ fontFamily: "WorkSans_400Regular", fontSize: 14 }}
          text="Tell us your name!"
          color="tertiary"
        />
      </View>
      <ThemedTextInput
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />
      <ThemedPressable
        onPress={() => {
          save("name", name);
          router.replace("/initial_boot/welcome");
        }}
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
              Next
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
      <View style={{ gap: 8, flexDirection: "row" }}>
        <View
          style={{
            width: "49%",
            height: 8,
            backgroundColor: Colors[palette][600],
            borderRadius: 16,
          }}
        ></View>
        <View
          style={{
            width: "49%",
            height: 8,
            backgroundColor: Colors.Backgrounds_Dark.Hover,
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
