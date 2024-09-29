import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useNoteManager() {
  const dateToday = new Date();

  const [notesForm, setNotesForm] = useState({
    id: Date.now(),
    title: "",
    description: "",
    isPriority: false,
    date: dateToday.toLocaleDateString(),
  });

  const [storedNotes, setStoredNotes] = useState();

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

  const toggleIsPriority = () => {
    setNotesForm((prevNote) => ({
      ...prevNote,
      isPriority: !prevNote.isPriority,
    }));
  };

  const handleAddNotes = async () => {
    const notesString = await AsyncStorage.getItem("@notes");
    let notes = notesString !== null ? JSON.parse(notesString) : [];

    notes.push(notesForm);

    console.log(notes);

    setStoredNotes([...notes]);
    await AsyncStorage.setItem("@notes", JSON.stringify(notes));
  };

  const handleDeleteNote = async (noteIndex: any) => {
    const notesString = await AsyncStorage.getItem("@notes");
    let notes = notesString !== null ? JSON.parse(notesString) : [];

    notes.splice(noteIndex, 1);

    setStoredNotes([...notes]);
    await AsyncStorage.setItem("@notes", JSON.stringify(notes));
  };

  useEffect(() => {
    const getStoredNotes = async () => {
      let result = await AsyncStorage.getItem("@notes");
      if (result) {
        setStoredNotes(JSON.parse(result));
      }
    };

    if (!storedNotes) {
      getStoredNotes();
    }
  }, []);

  return {
    notesForm,
    storedNotes,
    setNotesForm,
    setStoredNotes,
    handleAddNotes,
    handleDeleteNote,
    handleTitleChange,
    handleDescriptionChange,
    toggleIsPriority,
  };
}
