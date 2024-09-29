import { useCallback, useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import useNoteManager from "@/hooks/useNoteManager";
import NoteList from "@/components/NoteList";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

import ThemedPressable from "@/components/ThemedPressable";
import ThemedText from "@/components/ThemedText";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";
import ThemedModalTextInput from "@/components/ThemedModalTextInput";
import ThemeContext from "@/contexts/ThemeContext";
import TabBarVisibilityContext from "@/contexts/TabBarVisibilityContext";

import Colors from "@/constants/Colors";
import styles from "@/styles/tabs_notes";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const { setIsTabBarVisible } = useContext(TabBarVisibilityContext);
  const { height: screenHeight } = useWindowDimensions();

  const {
    notesForm,
    storedNotes,
    setNotesForm,
    setStoredNotes,
    handleAddNotes,
    handleDeleteNote,
    handleDescriptionChange,
    handleTitleChange,
    toggleIsPriority,
  } = useNoteManager();

  const styleState = styles(theme);

  const dateToday = new Date();

  const sheetRef = useRef<BottomSheetMethods>(null);

  const [viewIndex, setViewIndex] = useState(0);

  const views = [
    <>
      {storedNotes ? (
        <NoteList
          text={"No notes."}
          notes={storedNotes}
          handleDeleteNote={handleDeleteNote}
        />
      ) : null}
    </>,
    <>
      {storedNotes ? (
        <NoteList
          text={"No priority notes."}
          notes={storedNotes.filter((note: any) => note.isPriority === true)}
          handleDeleteNote={handleDeleteNote}
        />
      ) : null}
    </>,
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        const notesString = await AsyncStorage.getItem("@notes");
        let notes = notesString !== null ? JSON.parse(notesString) : [];
        setStoredNotes(notes);
      };

      fetchNotes();
    }, [])
  );

  if (!storedNotes) {
    return (
      <SafeAreaView style={styleState.safeAreaView}>
        <ActivityIndicator color={Colors[palette][600]} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText text="Notes" style={styleState.headingTextStyle} />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <ThemedPressable
          onPress={() => {
            setViewIndex(0);
          }}
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
          onPress={() => {
            setViewIndex(1);
          }}
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
      <ScrollView
        contentContainerStyle={{ gap: 16 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {views[viewIndex]}
      </ScrollView>
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
        <FontAwesome6 name="add" size={16} color={Colors.Text_Dark.Default} />
      </Pressable>
      <ThemedBottomSheetModal
        onClose={() => {
          setNotesForm({
            id: Date.now(),
            title: "",
            description: "",
            isPriority: false,
            date: dateToday.toLocaleDateString(),
          });
          setTimeout(() => {
            setIsTabBarVisible(true);
          }, 200);
        }}
        onOpen={() => {
          setIsTabBarVisible(false);
        }}
        ref={sheetRef}
        height={notesForm.title ? "50%" : "25%"}
      >
        <View style={{ marginBottom: 8 }}>
          <ThemedModalTextInput
            onChangeText={handleTitleChange}
            value={notesForm.title}
            placeholder="Title"
            multiline={false}
            style={{ fontSize: 24 }}
          />
          <ThemedModalTextInput
            onChangeText={handleDescriptionChange}
            value={notesForm.description}
            placeholder="Description"
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 14,
              maxHeight: screenHeight / 4,
            }}
          />
        </View>
        <View
          style={[
            styleState.borderStyle,
            { borderColor: Colors[palette][600] },
          ]}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            display: !notesForm.title ? "none" : "flex",
          }}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Checkbox
              value={notesForm.isPriority}
              onValueChange={toggleIsPriority}
              color={Colors[palette][600]}
              style={{ borderRadius: 4 }}
            />
            <ThemedText
              text="Priority"
              style={{ fontFamily: "WorkSans_400Regular" }}
              color="tertiary"
            />
          </View>
          <Pressable
            onPress={() => {
              sheetRef.current?.close();
              setTimeout(() => {
                setNotesForm({
                  id: Date.now(),
                  title: "",
                  description: "",
                  isPriority: false,
                  date: dateToday.toLocaleDateString(),
                });
              }, 500);
              handleAddNotes();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: Colors[palette][600],
                padding: 8,
                borderRadius: 8,
                opacity: pressed ? 0.8 : 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <Ionicons name="send" size={16} color={Colors.Text_Dark.Default} />
          </Pressable>
        </View>
      </ThemedBottomSheetModal>
      <StatusBar style={theme == "dark" ? "light" : "inverted"} />
    </SafeAreaView>
  );
}
