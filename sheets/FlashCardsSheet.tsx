import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useAuthStore from "@/hooks/useAuthStore";

import AntDesign from "@expo/vector-icons/AntDesign";
import useQuizStore from "@/hooks/useQuizStore";
import { toast } from "sonner-native";

export default function FlashCardsSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { client_instance, session } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);

  const { resetQuestion, resetResource, resetQuestions, resetResources } =
    useQuizStore();

  const fetchFlashCards = async () => {
    try {
      const flashCardsData = await client_instance
        .collection("flashcard")
        .getList(currentPage, 5);

      return flashCardsData;
    } catch (error) {
      throw error;
    }
  };

  const { isPending, data } = useQuery({
    queryKey: ["flashcards", currentPage],
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AntDesign
            name="addfile"
            size={24}
            color={
              isDarkMode ? Colors.Text_Dark.Default : Colors.Text_Light.Default
            }
            onPress={() => {
              if (!session.record.verified) {
                toast(
                  "You're not a verified user, please verify your email address to create flashcard/s.",
                  { position: "top-center" }
                );
              } else {
                resetQuestion();
                resetResource();
                resetQuestions();
                resetResources();
                router.push("flashcard/upload");
                SheetManager.hide("hub-flashcards-sheet");
              }
            }}
          />
          <ThemedText
            style={{ fontFamily: "WorkSans_900Black", fontSize: 32 }}
            text="Flashcards"
          />
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <AntDesign
              name="caretleft"
              size={24}
              color={
                isDarkMode
                  ? Colors.Text_Dark.Default
                  : Colors.Text_Light.Default
              }
              style={{ display: currentPage == 1 ? "none" : "flex" }}
              onPress={() => setCurrentPage((val) => val - 1)}
            />
            <AntDesign
              name="caretright"
              size={24}
              color={
                isDarkMode
                  ? Colors.Text_Dark.Default
                  : Colors.Text_Light.Default
              }
              onPress={() => setCurrentPage((val) => val + 1)}
            />
          </View>
        </View>

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
                        pathname: "/flashcard/[flashcard]",
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
