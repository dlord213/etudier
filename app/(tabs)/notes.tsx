import { useContext, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ThemedPressable from "@/components/ThemedPressable";
import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import { useNavigation } from "expo-router";
import TabBarVisibilityContext from "@/contexts/TabBarVisibilityContext";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const { setIsTabBarVisible } = useContext(TabBarVisibilityContext);

  const styleState = styles(theme);

  const sheetRef = useRef<BottomSheetMethods>(null);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText
        text="Notes"
        style={{
          fontFamily: "WorkSans_700Bold",
          textAlign: "center",
          fontSize: 36,
        }}
      />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <ThemedPressable
          children={
            <>
              <ThemedText
                text="All"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </>
          }
          backgroundColor={Colors[palette][200]}
        />
        <ThemedPressable
          children={
            <>
              <ThemedText
                text="Priority"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </>
          }
          backgroundColor={Colors[palette][200]}
        />
      </View>
      <Pressable
        onPress={() => {
          sheetRef.current?.open();
        }}
        style={({ pressed }) => [
          {
            bottom: 100,
            position: "absolute",
            right: 40,
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 8,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <FontAwesome6
          name="add"
          size={16}
          color={
            theme == "dark"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default
          }
        />
      </Pressable>
      <BottomSheet
        ref={sheetRef}
        style={{ padding: 16 }}
        height="50%"
        disableKeyboardHandling
        closeDuration={250}
        onOpen={() => {
          setIsTabBarVisible(false);
        }}
        onClose={() => {
          setIsTabBarVisible(true);
        }}
      >
        <View>
          <TextInput
            placeholder="Title"
            inputMode="text"
            multiline
            placeholderTextColor={
              theme == "dark"
                ? Colors.Text_Dark.Tertiary
                : Colors.Text_Light.Tertiary
            }
            style={{
              fontFamily: "WorkSans_700Bold",
              fontSize: 24,
              color:
                theme == "dark"
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default,
            }}
          />
          <TextInput
            placeholder="Description"
            inputMode="text"
            multiline
            placeholderTextColor={
              theme == "dark"
                ? Colors.Text_Dark.Tertiary
                : Colors.Text_Light.Tertiary
            }
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 14,
              color:
                theme == "dark"
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default,
            }}
          />
        </View>
        <Pressable
          onPress={() => {
            sheetRef.current?.open();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: Colors[palette][600],
              padding: 16,
              marginVertical: 8,
              borderRadius: 8,
              opacity: pressed ? 0.8 : 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <FontAwesome6
            name="add"
            size={16}
            color={
              theme == "dark"
                ? Colors.Text_Dark.Default
                : Colors.Text_Light.Default
            }
          />
          <ThemedText
            text="Add note"
            style={{ fontFamily: "WorkSans_400Regular" }}
          />
        </Pressable>
      </BottomSheet>
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
