import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface NoteForm {
  id: Date;
  title: string;
  description: string;
}

interface NoteStoreInterface {
  storedNotes: NoteForm[];
  form: NoteForm;
  loadStoredNotes: () => Promise<void>;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  addNote: () => Promise<void>;
  findNote: (id: string) => void;
  saveNoteChanges: () => Promise<void>;
  resetForm: () => void;
}

const useNoteStore = create<NoteStoreInterface>()(
  immer((set, get) => ({
    storedNotes: [],
    form: {
      id: new Date(),
      title: "",
      description: "",
    },
    loadStoredNotes: async () => {
      let notes = await AsyncStorage.getItem("@notes");
      if (notes) {
        console.log(JSON.parse(notes));
        set({ storedNotes: JSON.parse(notes) });
      }
    },
    setTitle: (val: string) => {
      set({ form: { ...get().form, title: val } });
    },
    setDescription: (val: string) => {
      set({ form: { ...get().form, description: val } });
    },
    addNote: async () => {
      if (!get().form.title) {
        return;
      }

      try {
        const newNote = { ...get().form };

        set((state) => {
          state.storedNotes.push(newNote);
        });
        await AsyncStorage.setItem("@notes", JSON.stringify(get().storedNotes));
      } catch (error) {
        console.log(error);
      }
    },
    findNote: (id: string) => {
      const note = get().storedNotes.find((note) => note.id.toString() === id);
      if (note) {
        console.log(note);
        set({ form: note });
      }
    },
    saveNoteChanges: async () => {
      const updatedNote = get().form;
      const updatedNotes = get().storedNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );

      set({ storedNotes: updatedNotes });
      await AsyncStorage.setItem("@notes", JSON.stringify(updatedNotes));
    },
    resetForm: () => {
      set({ form: { id: new Date(), title: "", description: "" } });
    },
  }))
);

export default useNoteStore;
