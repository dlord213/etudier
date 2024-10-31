import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useAuthStore from "@/hooks/useAuthStore";

export default function FlashCardsSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { client_instance } = useAuthStore();

  const fetchFlashCards = async () => {
    try {
      const flashCardsData = await client_instance
        .collection("flashcard")
        .getList(1, 20);

      return flashCardsData;
    } catch (error) {
      throw error;
    }
  };

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["flashcards"],
    queryFn: fetchFlashCards,
    enabled: true,
  });

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
    >
      <View style={{ padding: 4, gap: 8 }}>
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 32 }}
          text="Flashcards"
        />
        {isPending ? (
          <ActivityIndicator size={48} color={Colors[palette][600]} />
        ) : (
          <ScrollView
            contentContainerStyle={{ gap: 8 }}
            showsVerticalScrollIndicator={false}
          >
            {data
              ? data.items.map((item: any) => (
                  <Pressable
                    key={item.id}
                    style={({ pressed }) => [
                      {
                        backgroundColor: isDarkMode
                          ? Colors.Backgrounds_Light.Brand
                          : Colors.Backgrounds_Dark.Brand,
                        padding: 12,
                        borderRadius: 8,
                        opacity: pressed ? 0.9 : 1,
                      },
                    ]}
                    onPress={() => {
                      router.push({
                        pathname: "/hub/[flashcard]",
                        params: { id: item.id },
                      });
                      SheetManager.hide("hub-flashcards-sheet");
                    }}
                  >
                    <ThemedText
                      text={item.quiz.quiz.title}
                      style={{
                        color: isDarkMode
                          ? Colors.Text_Light.Default
                          : Colors.Text_Dark.Default,
                        fontFamily: "WorkSans_700Bold",
                        fontSize: 20,
                      }}
                    />
                    <ThemedText
                      text={item.quiz.quiz.description}
                      style={{
                        color: isDarkMode
                          ? Colors.Text_Dark.Secondary
                          : Colors.Text_Light.Tertiary,
                      }}
                    />
                  </Pressable>
                ))
              : null}
          </ScrollView>
        )}
      </View>
    </ActionSheet>
  );
}
