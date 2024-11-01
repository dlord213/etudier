import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";
import { ResponsiveGrid } from "react-native-flexible-grid";
import { SheetManager } from "react-native-actions-sheet";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import useNoteStore from "@/hooks/useNoteStore";
import NoteItemComponent from "@/components/NoteItemComponent";

export default function Page() {
  const { palette, isDarkMode, isOLEDMode } = useThemeStore();
  const {
    storedNotes,
    sortedStoredNotes,
    loadStoredNotes,
    resetForm,
    isGridView,
  } = useNoteStore();
  const navigation = useNavigation();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const styleState = styles(isDarkMode, isOLEDMode);

  useFocusEffect(
    useCallback(() => {
      loadStoredNotes();
      return () => resetForm();
    }, [navigation])
  );

  if (isGridView) {
    return (
      <SafeAreaView style={styleState.safeAreaView}>
        {storedNotes.length > 0 ? (
          <ResponsiveGrid
            data={sortedStoredNotes}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <NoteItemComponent
                date={item.item.id}
                title={item.item.title}
                style={{
                  flex: 1,
                  margin: 2,
                }}
              />
            )}
            maxItemsPerColumn={2}
            virtualization={true}
            showScrollIndicator={false}
            HeaderComponent={
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
                <MaterialIcons
                  name="sort"
                  size={24}
                  color={iconColor}
                  onPress={() => {
                    SheetManager.show("note-sort-sheet");
                  }}
                />
              </View>
            }
          />
        ) : (
          <ThemedText
            text="No notes stored."
            style={{ fontFamily: "WorkSans_900Black", fontSize: 24 }}
          />
        )}
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
        <MaterialIcons
          name="sort"
          size={24}
          color={iconColor}
          onPress={() => {
            SheetManager.show("note-sort-sheet");
          }}
        />
      </View>
      {storedNotes.length > 0 ? (
        <FlatList
          data={sortedStoredNotes}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <NoteItemComponent date={item.item.id} title={item.item.title} />
          )}
          contentContainerStyle={{ gap: 8 }}
        />
      ) : (
        <ThemedText
          text="No notes stored."
          style={{ fontFamily: "WorkSans_900Black", fontSize: 24 }}
        />
      )}
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
