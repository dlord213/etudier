import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedText from "@/components/ThemedText";
import ThemeContext from "@/contexts/ThemeContext";
import useNoteManager from "@/hooks/useNoteManager";
import Colors from "@/constants/Colors";
import ThemedTextInput from "@/components/ThemedTextInput";

export default function Page() {
  const { theme, palette } = useContext(ThemeContext);
  const { storedNotes } = useNoteManager();
  const navigation = useNavigation();

  const { id: noteId } = useLocalSearchParams();

  const styleState = styles(theme);

  const [noteForm, setNoteForm] = useState({
    id: null,
    title: "",
    description: "",
    isPriority: null,
    date: null,
  });

  useEffect(() => {
    const getNoteDetails = async () => {
      console.log("Stored Notes:", storedNotes);
      if (storedNotes) {
        let details = storedNotes.filter(
          (note: any) => note.id === Number(noteId)
        );
        if (details.length > 0) {
          const note = details[0];
          setNoteForm({
            id: note.id,
            title: note.title,
            description: note.description,
            isPriority: note.isPriority,
            date: note.date,
          });
          console.log("Note Title:", note.title);
        } else {
          console.log("No note found with ID:", noteId);
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
        e.preventDefault();

        Alert.alert("Unsaved changes", "Save changes in your note?", [
          { text: "Cancel", style: "cancel", onPress: () => {} },
          { text: "No", style: "cancel", onPress: () => {} },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]);
      });

      return unsubscribe;
    }, [navigation])
  );

  if (!noteForm.id) {
    return (
      <SafeAreaView style={styleState.safeAreaView}>
        <ActivityIndicator color={Colors[palette][600]} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText
        text={noteForm.title}
        style={{
          fontFamily: "WorkSans_700Bold",
          textAlign: "center",
          fontSize: 36,
        }}
      />
      <ScrollView>
        <TextInput multiline style={{ fontFamily: "WorkSans_400Regular" }}>
          {noteForm.description}
        </TextInput>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (context: any) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:
        context != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      gap: 16,
    },
  });
