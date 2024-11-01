import { FlatList, Pressable, ScrollView, TextInput, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import React from "react";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

export default function DictionarySheet() {
  const { isDarkMode, palette } = useThemeStore();
  const dictionaryAPILink = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

  const [word, setWord] = useState<string>("");

  const getSortedDefinitions = (data: any) => {
    return data.map((entry: any) => {
      const meanings = entry.meanings.reduce(
        (acc: any, meaning: any) => {
          if (meaning.partOfSpeech === "noun" && acc.nouns.length < 3) {
            acc.nouns.push(...meaning.definitions.slice(0, 3));
          } else if (meaning.partOfSpeech === "verb" && acc.verbs.length < 3) {
            acc.verbs.push(...meaning.definitions.slice(0, 3));
          }
          return acc;
        },
        { nouns: [], verbs: [] }
      );

      return {
        word: entry.word,
        phonetic: entry.phonetic,
        nouns: meanings.nouns,
        verbs: meanings.verbs,
      };
    });
  };

  const fetchWordData = async () => {
    try {
      const response = await axios.get(dictionaryAPILink + word);
      const sortedData = getSortedDefinitions(response.data);
      return sortedData;
    } catch (error) {
      throw error;
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["dictionary", word],
    queryFn: fetchWordData,
    enabled: false,
  });

  const handleSubmit = async () => {
    if (!word) return;
    refetch();
  };

  const DictionaryEntry = ({ entry }) => {
    return (
      <>
        {entry.verbs && entry.verbs.length > 0 && (
          <View style={{ padding: 8, gap: 16 }}>
            {entry.verbs.slice(0, 1).map((definition: any, index: any) => (
              <View key={index} style={{ gap: 4 }}>
                <ThemedText text="verb" color="Secondary" />
                <ThemedText text={definition.definition} />
                {definition.example && (
                  <ThemedText
                    text={definition.example}
                    color="Tertiary"
                    style={{
                      fontFamily: "WorkSans_400Regular_Italic",
                      backgroundColor: isDarkMode
                        ? Colors.Text_Dark.Secondary
                        : Colors.Text_Light.Secondary,
                      padding: 8,
                      borderRadius: 8,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        )}

        {entry.nouns && entry.nouns.length > 0 && (
          <View style={{ padding: 8, gap: 16 }}>
            {entry.nouns.slice(0, 1).map((definition: any, index: any) => (
              <View key={index} style={{ gap: 4 }}>
                <ThemedText text="noun" color="Secondary" />
                <ThemedText text={definition.definition} />
                {definition.example && (
                  <ThemedText
                    text={definition.example}
                    color="Tertiary"
                    style={{
                      fontFamily: "WorkSans_400Regular_Italic",
                      backgroundColor: isDarkMode
                        ? Colors.Text_Dark.Secondary
                        : Colors.Text_Light.Secondary,
                      padding: 8,
                      borderRadius: 8,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        )}
      </>
    );
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
        {data ? null : (
          <ThemedText
            text="Dictionary"
            style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          />
        )}
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
              backgroundColor: isDarkMode
                ? Colors.Backgrounds_Light.Brand
                : Colors.Backgrounds_Dark.Brand,
              color: isDarkMode
                ? Colors.Text_Light.Default
                : Colors.Text_Dark.Default,
              padding: 8,
              borderRadius: 8,
              fontFamily: "WorkSans_400Regular",
              paddingHorizontal: 16,
              flex: 1,
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
        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          <View>
            <ThemedText
              text={data[0].word}
              style={{ fontFamily: "WorkSans_700Bold", fontSize: 36 }}
            />
            <ThemedText text={data[0].phonetic} color="Tertiary" />
          </View>
          <ScrollView horizontal contentContainerStyle={{ gap: 8 }}>
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
                text="noun"
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
                text="verb"
                color="Default"
                style={{
                  fontFamily: "WorkSans_700Bold",
                  color: Colors[palette][600],
                }}
              />
            </Pressable>
          </ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.word + index}
            renderItem={({ item }) => <DictionaryEntry entry={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : null}
    </ActionSheet>
  );
}
