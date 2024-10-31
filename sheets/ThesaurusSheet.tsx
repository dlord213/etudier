import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  View,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import React from "react";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

export default function ThesaurusSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const apiKey = process.env.EXPO_PUBLIC_ETUDIER_API_NINJAS_KEY;

  const [word, setWord] = useState<string>("");

  const fetchThesaurusData = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/thesaurus?word=${word}
`,
        {
          headers: { "X-Api-Key": apiKey },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ["thesaurus"],
    queryFn: fetchThesaurusData,
    enabled: false,
  });

  const handleSubmit = () => {
    if (!word) {
      return;
    }
    refetch();
  };

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
    >
      <View style={{ padding: 16, gap: 8 }}>
        <ThemedText
          text="Thesaurus"
          style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            autoFocus={true}
            onSubmitEditing={handleSubmit}
            enterKeyHint="search"
            style={{
              padding: 8,
              borderRadius: 8,
              fontFamily: "WorkSans_400Regular",
              paddingHorizontal: 16,
              flex: 1,
              backgroundColor: isDarkMode
                ? Colors.Backgrounds_Light.Brand
                : Colors.Backgrounds_Dark.Brand,
              color: isDarkMode
                ? Colors.Text_Light.Default
                : Colors.Text_Dark.Default,
            }}
            placeholder="Search for a word"
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
            placeholderTextColor={
              isDarkMode ? Colors.Text_Light.Default : Colors.Text_Dark.Default
            }
            value={word}
            onChangeText={(val) => setWord(val)}
          />
        </View>
      </View>
      {data ? (
        <SectionList
          sections={[
            { title: "Synonyms", data: data.synonyms },
            { title: "Antonyms", data: data.antonyms },
          ].filter((section) => section.data.length > 0)}
          keyExtractor={(item: any, index: any) => `${item}-${index}`}
          renderSectionHeader={({ section: { title } }) => (
            <ThemedText
              text={title}
              style={{
                fontSize: 24,
                fontFamily: "WorkSans_700Bold",
                paddingHorizontal: 16,
                marginVertical: 8,
              }}
            />
          )}
          renderItem={({ item }) => (
            <ThemedText
              text={item}
              style={{ paddingHorizontal: 16, fontSize: 16, marginVertical: 4 }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : null}
      {isError ? (
        <ThemedText
          text="Can't retrieve data, please try again."
          style={{ paddingHorizontal: 16 }}
        />
      ) : null}
    </ActionSheet>
  );
}
