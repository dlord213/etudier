import Colors from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { Link } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import ThemedText from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedPressable from "@/components/ThemedPressable";
import ThemeContext from "@/contexts/ThemeContext";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles(theme);

  const [name, setName] = useState<string>("");
  const [index, setIndex] = useState(0);

  const pages = [
    <>
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
          setIndex(1);
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
    </>,
    <>
      <Pressable
        onPress={() => {
          setIndex(0);
        }}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color={
            theme != "light"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default
          }
        />
      </Pressable>
      <View>
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          text={"Welcome!"}
        />
        <ThemedText
          style={{ fontFamily: "WorkSans_400Regular", fontSize: 14 }}
          text="Let's make studying simple, focused, and fun. Ready to achieve your goals? We're here to help every step of the way!"
          color="tertiary"
        />
      </View>
      <Link href="homepage" asChild replace>
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
    </>,
  ];

  return (
    <SafeAreaView style={styleState.safeAreaView}>{pages[index]}</SafeAreaView>
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
