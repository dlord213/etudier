import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { create } from "zustand";

interface TaskForm {
  id: number;
  title: string;
  description: string;
  date: Date;
  isStarred: boolean;
  isCompleted: boolean;
}

interface TaskManagerStoreInterface {
  form: TaskForm;
  storedTasks: TaskForm[] | null;
  tasksCompleted: number | null;
  isDescriptionVisible: boolean;
  setDescriptionVisibility: (visibility: boolean) => void;
  setStoredTasks: (tasks: any) => void;
  setTask: (task: any) => void;
  updateTitle: (newTitle: TaskForm["title"]) => void;
  updateDescription: (newDescription: TaskForm["description"]) => void;
  updateDate: (newDate: TaskForm["date"]) => void;
  updateIsStarred: () => void;
  toggleDescriptionVisibility: () => void;
  addTask: () => Promise<void>;
  deleteTask: (index: number) => Promise<void>;
  completeTask: (index: number) => Promise<void>;
  editTask: (index: number) => Promise<void>;
  starTask: (index: number) => Promise<void>;
  resetTask: () => void;
  loadStoredTasks: () => Promise<void>;
}

const useTaskManager = create<TaskManagerStoreInterface>()((set, get) => ({
  form: {
    id: 0,
    title: "",
    description: "",
    date: new Date(),
    isStarred: false,
    isCompleted: false,
  },
  storedTasks: null,
  tasksCompleted: null,
  isDescriptionVisible: false,
  setStoredTasks: (tasks: any) => set((state: any) => ({ storedTasks: tasks })),
  setDescriptionVisibility: (visibility: boolean) =>
    set((state: any) => ({ isDescriptionVisible: visibility })),
  setTask: (task: any) => set((state: any) => ({ form: task })),
  updateTitle: (newTitle: string) =>
    set((state: any) => ({
      form: { ...state.form, title: newTitle },
    })),
  updateDescription: (newDescription: string) =>
    set((state: any) => ({
      form: { ...state.form, description: newDescription },
    })),
  updateDate: (newDate: Date) => {
    DateTimePickerAndroid.open({
      value: get().form.date,
      onChange: (e: any, selectedDate: any) => {
        if (selectedDate) {
          set((state: any) => ({
            form: {
              ...state.form,
              date: newDate instanceof Date ? newDate : new Date(newDate),
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
  updateIsStarred: () =>
    set((state: any) => ({
      form: { ...state.form, isStarred: !state.form.isStarred },
    })),
  toggleDescriptionVisibility: () => {
    set((state: any) => ({
      isDescriptionVisible: !state.isDescriptionVisible,
    }));
  },
  addTask: async () => {
    try {
      const tasksStorage = await AsyncStorage.getItem("@tasks");
      let tasks = tasksStorage !== null ? JSON.parse(tasksStorage) : [];

      tasks.push({
        id: Date.now(),
        title: get().form.title,
        description: get().form.description,
        date:
          get().form.date instanceof Date
            ? get().form.date.toLocaleDateString()
            : new Date(get().form.date).toLocaleDateString(),
        isStarred: get().form.isStarred,
        isCompleted: get().form.isCompleted,
      });

      set({ storedTasks: tasks });
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to delete task: ", err);
    }
  },
  deleteTask: async (index: number) => {
    try {
      const tasksStorage = await AsyncStorage.getItem("@tasks");
      let tasks = tasksStorage !== null ? JSON.parse(tasksStorage) : [];

      tasks.splice(index, 1);
      set({ storedTasks: tasks });
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to delete task: ", err);
    }
  },
  completeTask: async (index: number) => {
    try {
      const tasksStorage = await AsyncStorage.getItem("@tasks");
      let tasks = tasksStorage !== null ? JSON.parse(tasksStorage) : [];

      tasks[index].isCompleted = !tasks[index].isCompleted;

      set({ storedTasks: tasks });
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to complete task: ", err);
    }
  },
  editTask: async (index: number) => {
    try {
      const tasksStorage = await AsyncStorage.getItem("@tasks");
      let tasks = tasksStorage !== null ? JSON.parse(tasksStorage) : [];

      if (index !== -1) {
        tasks[index] = {
          ...tasks[index],
          title: get().form.title,
          description: get().form.description,
          date: get().form.date,
          isStarred: get().form.isStarred,
          isCompleted: get().form.isCompleted,
        };
      }

      set({ storedTasks: tasks });
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to edit task: ", err);
    }
  },
  starTask: async (index: number) => {
    try {
      const tasksStorage = await AsyncStorage.getItem("@tasks");
      let tasks = tasksStorage !== null ? JSON.parse(tasksStorage) : [];

      tasks[index].isStarred = !tasks[index].isStarred;

      set({ storedTasks: tasks });
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to complete task: ", err);
    }
  },
  resetTask: () => {
    set((state: any) => ({
      form: {
        id: 0,
        title: "",
        description: "",
        date: new Date(),
        isStarred: false,
        isCompleted: false,
      },
    }));
  },
  loadStoredTasks: async () => {
    try {
      let storedTasks = await AsyncStorage.getItem("@tasks");
      console.log(storedTasks, "Fetched");
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        set({ storedTasks: tasks });
        set({
          tasksCompleted: tasks.filter((task: any) => task.isCompleted).length,
        });
      }
    } catch (error) {
      console.error("Error fetching: ", error);
    }
  },
}));

export default useTaskManager;
