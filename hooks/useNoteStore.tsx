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
  sortedStoredNotes: NoteForm[];
  form: NoteForm;
  allNotesVisible: boolean;
  priorityNotesVisible: boolean;
  isSortingNotesAscending: boolean;
  isSortingNotesDescending: boolean;
  isGridView: boolean;
  loadStoredNotes: () => Promise<void>;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  toggleAllNotesVisible: () => void;
  togglePriorityNotesVisible: () => void;
  toggleIsSortingNotesAscending: () => void;
  toggleIsSortingNotesDescending: () => void;
  toggleGridView: () => void;
  addNote: () => Promise<void>;
  findNote: (id: string) => void;
  saveNoteChanges: () => Promise<void>;
  resetForm: () => void;
  loadNoteSettings: () => Promise<void>;
  saveNoteSettings: () => Promise<void>;
}

const useNoteStore = create<NoteStoreInterface>()(
  immer((set, get) => ({
    storedNotes: [],
    sortedStoredNotes: [],
    form: {
      id: new Date(),
      title: "",
      description: "",
    },
    allNotesVisible: false,
    priorityNotesVisible: false,
    isSortingNotesAscending: true,
    isSortingNotesDescending: false,
    isGridView: false,
    loadStoredNotes: async () => {
      let notes = await AsyncStorage.getItem("@notes");
      if (notes) {
        set({
          storedNotes: JSON.parse(notes),
          sortedStoredNotes: [...get().storedNotes].sort((a, b) => {
            return new Date(a.id).getTime() - new Date(b.id).getTime();
          }),
        });
      }
    },
    setTitle: (val: string) => {
      set({ form: { ...get().form, title: val } });
    },
    setDescription: (val: string) => {
      set({ form: { ...get().form, description: val } });
    },
    toggleAllNotesVisible: () => {
      set({ allNotesVisible: !get().allNotesVisible });
    },
    togglePriorityNotesVisible: () => {
      set({ priorityNotesVisible: !get().priorityNotesVisible });
    },
    toggleIsSortingNotesAscending: () => {
      set({
        sortedStoredNotes: [...get().storedNotes].sort((a, b) => {
          return new Date(a.id).getTime() - new Date(b.id).getTime();
        }),
        isSortingNotesAscending: true,
        isSortingNotesDescending: false,
      });
    },
    toggleIsSortingNotesDescending: () => {
      set({
        sortedStoredNotes: [...get().storedNotes].sort((a, b) => {
          return new Date(b.id).getTime() - new Date(a.id).getTime();
        }),
        isSortingNotesAscending: false,
        isSortingNotesDescending: true,
      });
    },
    toggleGridView: () => {
      set({ isGridView: !get().isGridView });
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
        get().resetForm();
        await AsyncStorage.setItem("@notes", JSON.stringify(get().storedNotes));
      } catch (error) {
        console.log(error);
      }
    },
    findNote: (id: string) => {
      const note = get().storedNotes.find((note) => note.id.toString() === id);
      if (note) {
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
    loadNoteSettings: async () => {
      const noteSettings = await AsyncStorage.getItem("@note_settings");
      if (noteSettings) {
        const settings = JSON.parse(noteSettings);
        set({
          isGridView: settings.isGridView,
        });
      }
    },
    saveNoteSettings: async () => {
      await AsyncStorage.setItem(
        "@note_settings",
        JSON.stringify({
          isGridView: get().isGridView,
        })
      );
    },
  }))
);

export default useNoteStore;
