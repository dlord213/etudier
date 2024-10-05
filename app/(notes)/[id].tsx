import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ToastAndroid,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetMethods } from "@devvie/bottom-sheet";

import AntDesign from "@expo/vector-icons/AntDesign";

import useNoteManager from "@/hooks/useNoteManager";
import ThemeContext from "@/contexts/ThemeContext";
import Colors from "@/constants/Colors";

import ThemedOpaqueTextInput from "@/components/ThemedOpaqueTextInput";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";
import ThemedText from "@/components/ThemedText";
import ThemedPressable from "@/components/ThemedPressable";

import styles from "@/styles/note";

export default function Page() {
  const { theme, palette } = useContext(ThemeContext);
  const { height: screenHeight } = useWindowDimensions();
  const { notesForm, setNotesForm, storedNotes, handleEditNote } =
    useNoteManager();
  const navigation = useNavigation();
  const sheetRef = useRef<BottomSheetMethods>(null);
  const eventRef = useRef(null);
  const { id: noteId } = useLocalSearchParams();

  const styleState = styles(theme);
  const iconColor =
    theme != "light" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  const [noteData, setNoteData] = useState({
    id: null,
    title: "",
    description: "",
    isPriority: null,
    date: null,
  });

  const noteIndex = storedNotes
    ? storedNotes.findIndex((obj: any) => noteData.id === obj.id)
    : 0;

  const handleTitleChange = (newTitle: any) => {
    setNotesForm((prevNote) => ({
      ...prevNote,
      title: newTitle,
    }));
  };

  const handleDescriptionChange = (newDescription: any) => {
    setNotesForm((prevNote) => ({
      ...prevNote,
      description: newDescription,
    }));
  };

  useEffect(() => {
    const getNoteDetails = async () => {
      if (storedNotes) {
        let details = storedNotes.filter(
          (note: any) => note.id === Number(noteId)
        );
        if (details.length > 0) {
          const note = details[0];
          setNotesForm({
            id: note.id,
            title: note.title,
            description: note.description,
            isPriority: note.isPriority,
            date: note.date,
          });
          setNoteData({
            id: note.id,
            title: note.title,
            description: note.description,
            isPriority: note.isPriority,
            date: note.date,
          });
        }
      }
    };

    if (noteId) {
      getNoteDetails();
    }
  }, [noteId, storedNotes]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        if (
          notesForm.title !== noteData.title ||
          notesForm.description !== noteData.description
        ) {
          e.preventDefault();

          eventRef.current = e;

          sheetRef.current?.open();
        }
      });

      return unsubscribe;
    }, [navigation, notesForm, noteData])
  );

  if (!noteData.id) {
    return (
      <SafeAreaView style={styleState.safeAreaView}>
        <ActivityIndicator color={Colors[palette][600]} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <AntDesign name="arrowleft" size={24} color={iconColor} />
        <ThemedOpaqueTextInput
          value={notesForm.title}
          onChange={handleTitleChange}
          style={{
            fontFamily: "WorkSans_700Bold",
            fontSize: 30,
            flex: 1,
          }}
          onChangeText={handleTitleChange}
          placeholder="Title"
        />
      </View>
      <ThemedOpaqueTextInput
        multiline={true}
        value={notesForm.description}
        onChangeText={handleDescriptionChange}
        placeholder=""
      />
      <View></View>
      <ThemedBottomSheetModal ref={sheetRef} height={screenHeight / 6}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            alignItems: "flex-end",
          }}
        >
          <View>
            <ThemedText
              text="Unsaved changes"
              style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
            />
            <ThemedText
              text="Save changes in your note?"
              style={{ fontFamily: "WorkSans_400Regular" }}
              color="tertiary"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <ThemedPressable
              backgroundColor={Colors[palette][800]}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <ThemedText
                text="No"
                style={{ fontFamily: "WorkSans_400Regular" }}
              />
            </ThemedPressable>
            <ThemedPressable
              backgroundColor={Colors[palette][600]}
              onPress={async () => {
                ToastAndroid.show("Note saved.", ToastAndroid.SHORT);

                sheetRef.current?.close();

                await handleEditNote(noteIndex);

                if (eventRef.current) {
                  navigation.dispatch(eventRef.current.data.action);
                  eventRef.current = null;
                }
              }}
            >
              <ThemedText
                text="Save"
                style={{ fontFamily: "WorkSans_400Regular" }}
              />
            </ThemedPressable>
          </View>
        </View>
      </ThemedBottomSheetModal>
    </SafeAreaView>
  );
}
