import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Feather from "@expo/vector-icons/Feather";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import { router } from "expo-router";
import { SheetManager } from "react-native-actions-sheet";

export default function Page() {
  const { palette, isDarkMode, isOLEDMode } = useThemeStore();

  const styleState = styles(isDarkMode, isOLEDMode);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText
        style={{ fontFamily: "WorkSans_900Black", fontSize: 32 }}
        text="Resource Hub"
      />
      <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors[palette][300]
                  : Colors[palette][200],
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 16,
              },
            ]}
            onPress={() => SheetManager.show("hub-dictionary-sheet")}
          >
            <ThemedText
              text="Dictionary"
              color="Default"
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors[palette][600],
              }}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors[palette][300]
                  : Colors[palette][200],
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 16,
              },
            ]}
            onPress={() => SheetManager.show("hub-holiday-sheet")}
          >
            <ThemedText
              text="Holidays"
              color="Default"
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors[palette][600],
              }}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors[palette][300]
                  : Colors[palette][200],
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 16,
              },
            ]}
          >
            <ThemedText
              text="Thesaurus"
              color="Default"
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors[palette][600],
              }}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors[palette][300]
                  : Colors[palette][200],
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 16,
              },
            ]}
          >
            <ThemedText
              text="Flashcards"
              color="Default"
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors[palette][600],
              }}
            />
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = (isDarkMode: boolean, isOLEDMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? isOLEDMode
          ? "#000000"
          : Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      paddingHorizontal: 16,
      gap: 8,
    },
  });
