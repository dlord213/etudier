import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ToastAndroid } from "react-native";

interface TaskForm {
  id: number;
  title: string;
  date: string | Date;
  isCompleted: boolean;
}

interface TaskStoreInterface {
  storedTasks: TaskForm[];
  isEditingTask: boolean;
  form: TaskForm;
  loadStoredTasks: () => Promise<void>;
  saveStoredStateTasks: () => Promise<void>;
  updateTitle: (newTitle: TaskForm["title"]) => void;
  updateDate: () => void;
  toggleIsCompleted: (id: number) => Promise<void>;
  addTask: () => Promise<void>;
  resetForm: () => void;
}

const useTaskStore = create<TaskStoreInterface>()(
  immer((set, get) => ({
    storedTasks: [],
    isEditingTask: false,
    form: {
      id: Date.now(),
      title: "",
      date: new Date(),
      isCompleted: false,
    },
    loadStoredTasks: async () => {
      try {
        const tasks = await AsyncStorage.getItem("@tasks");
        if (tasks) {
          const parsedTasks = JSON.parse(tasks);
          set({ storedTasks: parsedTasks });
        }
      } catch (error) {
        console.error("Error loading tasks: ", error);
      }
    },
    saveStoredStateTasks: async () => {
      try {
        await AsyncStorage.setItem("@tasks", JSON.stringify(get().storedTasks));
      } catch (err) {
        ToastAndroid.show(`Error saving tasks: ${err}`, ToastAndroid.SHORT);
      }
    },
    updateTitle: (newTitle: string) => {
      set({ form: { ...get().form, title: newTitle } });
    },
    updateDate: () => {
      DateTimePickerAndroid.open({
        value: get().form.date,
        onChange: (e: any, selectedDate: any) => {
          if (selectedDate) {
            set((state: any) => ({
              form: {
                ...state.form,
                date:
                  selectedDate instanceof Date
                    ? selectedDate
                    : new Date(selectedDate),
              },
            }));
          }
        },
        mode: "date",
        is24Hour: true,
        display: "calendar",
        minimumDate: new Date(),
      });
    },
    toggleIsCompleted: async (id: number) => {
      set((state) => {
        const taskIndex = state.storedTasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          state.storedTasks[taskIndex].isCompleted =
            !state.storedTasks[taskIndex].isCompleted;
        }
      });
      try {
        await AsyncStorage.setItem("@tasks", JSON.stringify(get().storedTasks));
      } catch (error) {
        ToastAndroid.show(`Error changing state: ${error}`, ToastAndroid.SHORT);
      }
    },
    addTask: async () => {
      try {
        const newTask = { ...get().form };
        set((state) => {
          state.storedTasks.push(newTask);
        });
        await AsyncStorage.setItem("@tasks", JSON.stringify(get().storedTasks));
        get().resetForm();
      } catch (error) {
        ToastAndroid.show(`Error adding task: ${error}`, ToastAndroid.SHORT);
      }
    },
    resetForm: () => {
      set({
        form: {
          id: Date.now(),
          title: "",
          date: new Date(),
          isCompleted: false,
        },
      });
    },
  }))
);

export default useTaskStore;
