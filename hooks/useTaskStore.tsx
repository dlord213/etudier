import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ToastAndroid } from "react-native";
import {
  parseISO,
  isSameDay,
  isAfter,
  addDays,
  isBefore,
  startOfToday,
} from "date-fns";
import { toast } from "sonner-native";

const tomorrow = addDays(new Date(), 1);

export interface TaskForm {
  id: number;
  title: string;
  date: string | Date;
  isCompleted: boolean;
}

interface TaskStoreInterface {
  storedTasks: TaskForm[];
  overdueTasks: TaskForm[];
  todayTasks: TaskForm[];
  tomorrowTasks: TaskForm[];
  upcomingTasks: TaskForm[];
  completedTasks: TaskForm[];
  overdueTasksVisible: boolean;
  todayTasksVisible: boolean;
  tomorrowTasksVisible: boolean;
  upcomingTasksVisible: boolean;
  completedTasksVisible: boolean;
  isEditingTask: boolean;
  form: TaskForm;
  loadStoredTasks: () => Promise<void>;
  saveStoredStateTasks: () => Promise<void>;
  getOverdueTasks: () => void;
  getTodayTasks: () => void;
  getTomorrowTasks: () => void;
  getUpcomingTasks: () => void;
  getCompletedTasks: () => void;
  updateTitle: (newTitle: TaskForm["title"]) => void;
  updateDate: () => void;
  updateTask: () => Promise<void>;
  toggleIsCompleted: (id: number) => Promise<void>;
  toggleIsEditingTask: () => void;
  toggleOverdueTasksVisible: () => void;
  toggleTodayTasksVisible: () => void;
  toggleTomorrowTasksVisible: () => void;
  toggleUpcomingTasksVisible: () => void;
  toggleCompletedTasksVisible: () => void;
  addTask: () => Promise<void>;
  resetForm: () => void;
  saveTaskSettings: () => Promise<void>;
  loadTaskSettings: () => Promise<void>;
}

const useTaskStore = create<TaskStoreInterface>()(
  immer((set, get) => ({
    storedTasks: [],
    overdueTasks: [],
    todayTasks: [],
    tomorrowTasks: [],
    upcomingTasks: [],
    completedTasks: [],
    isEditingTask: false,
    overdueTasksVisible: true,
    todayTasksVisible: true,
    tomorrowTasksVisible: true,
    upcomingTasksVisible: true,
    completedTasksVisible: true,
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
          set({ storedTasks: parsedTasks }, false);
          const {
            getOverdueTasks,
            getTodayTasks,
            getTomorrowTasks,
            getUpcomingTasks,
            getCompletedTasks,
          } = get();

          getOverdueTasks();
          getTodayTasks();
          getTomorrowTasks();
          getUpcomingTasks();
          getCompletedTasks();
        }
      } catch (error) {
        console.error("Error loading tasks: ", error);
      }
    },
    getOverdueTasks: () => {
      set({
        overdueTasks: get().storedTasks.filter((task: any) => {
          const taskDate =
            typeof task.date === "string" ? parseISO(task.date) : task.date;
          return !task.isCompleted && isBefore(taskDate, startOfToday());
        }),
      });
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
        const { storedTasks } = get();
        if (storedTasks && storedTasks.length > 0) {
          setTimeout(async () => {
            await AsyncStorage.setItem("@tasks", JSON.stringify(storedTasks));
          }, 0);
        }
      } catch (err) {
        toast(`Error saving tasks: ${err}`);
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
    updateTask: async () => {
      if (get().isEditingTask) {
        if (!get().form.title) {
          ToastAndroid.show("Title cannot be empty!", ToastAndroid.SHORT);
          return;
        }

        const taskId = get().form.id;
        const taskIndex = get().storedTasks.findIndex(
          (task) => task.id === taskId
        );

        if (taskIndex !== -1) {
          set((state) => {
            state.storedTasks[taskIndex].title = get().form.title;
            state.storedTasks[taskIndex].date = get().form.date;
          });
        }

        try {
          get().getOverdueTasks();
          get().getTodayTasks();
          get().getTomorrowTasks();
          get().getUpcomingTasks();
          get().getCompletedTasks();

          await AsyncStorage.setItem(
            "@tasks",
            JSON.stringify(get().storedTasks)
          );
        } catch (error) {
          ToastAndroid.show(
            `Error updating task: ${error}`,
            ToastAndroid.SHORT
          );
        }
      }
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
        get().getOverdueTasks();
        get().getTodayTasks();
        get().getTomorrowTasks();
        get().getUpcomingTasks();
        get().getCompletedTasks();
        await AsyncStorage.setItem("@tasks", JSON.stringify(get().storedTasks));
      } catch (error) {
        ToastAndroid.show(`Error changing state: ${error}`, ToastAndroid.SHORT);
      }
    },
    toggleIsEditingTask: () => {
      set({ isEditingTask: !get().isEditingTask });
    },
    toggleOverdueTasksVisible: () => {
      set({ overdueTasksVisible: !get().overdueTasksVisible });
    },
    toggleTodayTasksVisible: () => {
      set({ todayTasksVisible: !get().todayTasksVisible });
    },
    toggleTomorrowTasksVisible: () => {
      set({ tomorrowTasksVisible: !get().tomorrowTasksVisible });
    },
    toggleUpcomingTasksVisible: () => {
      set({ upcomingTasksVisible: !get().upcomingTasksVisible });
    },
    toggleCompletedTasksVisible: () => {
      set({ completedTasksVisible: !get().completedTasksVisible });
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

        get().getOverdueTasks();
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
    saveTaskSettings: async () => {
      await AsyncStorage.setItem(
        "@tasks_settings",
        JSON.stringify({
          overdueTasksVisible: get().overdueTasksVisible,
          todayTasksVisible: get().todayTasksVisible,
          tomorrowTasksVisible: get().tomorrowTasksVisible,
          upcomingTasksVisible: get().upcomingTasksVisible,
          completedTasksVisible: get().completedTasksVisible,
        })
      );
    },
    loadTaskSettings: async () => {
      const taskSettings = await AsyncStorage.getItem("@tasks_settings");
      if (taskSettings) {
        const settings = JSON.parse(taskSettings);
        set({
          overdueTasksVisible: settings.overdueTasksVisible,
          todayTasksVisible: settings.todayTasksVisible,
          tomorrowTasksVisible: settings.tomorrowTasksVisible,
          upcomingTasksVisible: settings.upcomingTasksVisible,
          completedTasksVisible: settings.completedTasksVisible,
        });
      }
    },
  }))
);

export default useTaskStore;
