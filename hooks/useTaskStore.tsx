import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ToastAndroid } from "react-native";
import { parseISO, isSameDay, isAfter, addDays } from "date-fns";

const tomorrow = addDays(new Date(), 1);

interface TaskForm {
  id: number;
  title: string;
  date: string | Date;
  isCompleted: boolean;
}

interface TaskStoreInterface {
  storedTasks: TaskForm[];
  todayTasks: TaskForm[];
  tomorrowTasks: TaskForm[];
  upcomingTasks: TaskForm[];
  completedTasks: TaskForm[];
  isEditingTask: boolean;
  form: TaskForm;
  loadStoredTasks: () => Promise<void>;
  saveStoredStateTasks: () => Promise<void>;
  getTodayTasks: () => void;
  getTomorrowTasks: () => void;
  getUpcomingTasks: () => void;
  getCompletedTasks: () => void;
  updateTitle: (newTitle: TaskForm["title"]) => void;
  updateDate: () => void;
  toggleIsCompleted: (id: number) => Promise<void>;
  addTask: () => Promise<void>;
  resetForm: () => void;
}

const useTaskStore = create<TaskStoreInterface>()(
  immer((set, get) => ({
    storedTasks: [],
    todayTasks: [],
    tomorrowTasks: [],
    upcomingTasks: [],
    completedTasks: [],
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
          get().getTodayTasks();
          get().getTomorrowTasks();
          get().getUpcomingTasks();
          get().getCompletedTasks();
        }
      } catch (error) {
        console.error("Error loading tasks: ", error);
      }
    },
    getTodayTasks: () => {
      set({
        todayTasks: get().storedTasks.filter((task: any) => {
          const taskDate =
            typeof task.date === "string" ? parseISO(task.date) : task.date;
          return !task.isCompleted && isSameDay(taskDate, new Date());
        }),
      });
    },
    getTomorrowTasks: () => {
      set({
        tomorrowTasks: get().storedTasks.filter((task) => {
          const taskDate =
            typeof task.date === "string" ? parseISO(task.date) : task.date;
          return !task.isCompleted && isSameDay(taskDate, tomorrow);
        }),
      });
    },
    getUpcomingTasks: () => {
      set({
        upcomingTasks: get().storedTasks.filter((task) => {
          const taskDate =
            typeof task.date === "string" ? parseISO(task.date) : task.date;
          return !task.isCompleted && isAfter(taskDate, tomorrow);
        }),
      });
    },
    getCompletedTasks: () => {
      set({
        completedTasks: get().storedTasks.filter(
          (task) => task.isCompleted === true
        ),
      });
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
        get().getTodayTasks();
        get().getTomorrowTasks();
        get().getUpcomingTasks();
        get().getCompletedTasks();
        await AsyncStorage.setItem("@tasks", JSON.stringify(get().storedTasks));
      } catch (error) {
        ToastAndroid.show(`Error changing state: ${error}`, ToastAndroid.SHORT);
      }
    },
    addTask: async () => {
      if (!get().form.title) {
        ToastAndroid.show("Title cannot be empty!", ToastAndroid.SHORT);
        return;
      }

      try {
        const newTask = { ...get().form };
        set((state) => {
          state.storedTasks.push(newTask);
        });
        get().getTodayTasks();
        get().getTomorrowTasks();
        get().getUpcomingTasks();
        get().getCompletedTasks();
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
