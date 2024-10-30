import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import useNoteStore from "@/hooks/useNoteStore";
import NoteItemComponent from "@/components/NoteItemComponent";

export default function Page() {
  const { palette, isDarkMode, isOLEDMode } = useThemeStore();
  const { storedNotes, loadStoredNotes } = useNoteStore();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const styleState = styles(isDarkMode, isOLEDMode);

  useFocusEffect(
    useCallback(() => {
      loadStoredNotes();
    }, [])
  );

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 32 }}
          text="Notes"
        />
        <Pressable>
          <MaterialIcons name="sort" size={24} color={iconColor} />
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? Colors[palette][300]
                : Colors[palette][200],
              paddingVertical: 4,
              paddingHorizontal: 24,
              borderRadius: 16,
            },
          ]}
        >
          <ThemedText text="All" style={{ color: Colors[palette][500] }} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? Colors[palette][300]
                : Colors[palette][200],
              paddingVertical: 4,
              paddingHorizontal: 24,
              borderRadius: 16,
            },
          ]}
        >
          <ThemedText text="Priority" style={{ color: Colors[palette][500] }} />
        </Pressable>
      </View>
      {storedNotes.length > 0 ? (
        <FlatList
          data={storedNotes}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <NoteItemComponent date={item.item.id} title={item.item.title} />
          )}
          contentContainerStyle={{ gap: 8 }}
        />
      ) : null}
      <Pressable
        style={{
          position: "absolute",
          backgroundColor: Colors[palette][600],
          width: 48,
          height: 48,
          borderRadius: 8,
          bottom: 16,
          right: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          router.push("/notes/add");
        }}
      >
        <Ionicons name="add" size={24} color={Colors.Text_Dark.Default} />
      </Pressable>
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
