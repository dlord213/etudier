import { ScrollView, View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import React from "react";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import { Link } from "expo-router";

export default function FlashcardResourcesSheet(
  props: SheetProps<"hub-flashcards-resources-sheet">
) {
  const { isDarkMode, palette } = useThemeStore();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
      id={props.sheetId}
    >
      <View style={{ padding: 16, gap: 16 }}>
        <View>
          <ThemedText
            text="Resources"
            style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          />
          <ThemedText
            text="Don't know where to start? Here's some resources before you take the quiz to learn or refresh your mind!"
            color="Tertiary"
          />
        </View>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {props.payload?.resources.map((item: any) => (
            <Link href={item.link} key={item.link}>
              <ThemedText
                text={item.title}
                style={{ color: Colors[palette][600] }}
              />
            </Link>
          ))}
        </ScrollView>
      </View>
    </ActionSheet>
  );
}
