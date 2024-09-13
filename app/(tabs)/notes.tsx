import { useContext, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
        style={{ zIndex: 10 }}
        onOpen={() => {
          setIsTabBarVisible(false);
        }}
        onClose={() => {
          setIsTabBarVisible(true);
        }}
      >
        <ThemedText text="TEST" style={{ fontFamily: "WorkSans_400Regular" }} />
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
