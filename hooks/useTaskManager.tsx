import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function useTaskManager() {
  const [task, setTask] = useState({
    id: 0,
    title: "",
    description: "",
    date: new Date(),
    isStarred: false,
    isCompleted: false,
  });

  const [storedTasks, setStoredTasks] = useState(null);
  const [tasksCompletedLength, setTasksCompletedLength] = useState(null);

  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleDescriptionPress = () => {
    setIsDescriptionVisible((prevState) => !prevState);
  };

  const handleTitleChange = (newTitle: any) => {
    setTask((prevTask) => ({
      ...prevTask,
      title: newTitle,
    }));
  };

  const handleDescriptionChange = (newDescription: any) => {
    setTask((prevTask) => ({
      ...prevTask,
      description: newDescription,
    }));
  };

  const toggleIsStarred = () => {
    setTask((prevTask) => ({
      ...prevTask,
      isStarred: !prevTask.isStarred,
    }));
  };

  const handleDateChange = (newDate: any) => {
    const formattedDate = newDate instanceof Date ? newDate : new Date(newDate);

    setTask((prevTask) => ({
      ...prevTask,
      date: formattedDate,
    }));
  };

  const dateOnChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      handleDateChange(selectedDate);
    }
  };

  const handleDeleteTask = async (taskIndex: any) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    tasks.splice(taskIndex, 1);

    setStoredTasks([...tasks]);
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  };

  const handleCompleteTask = async (taskIndex: any) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    if (tasks[taskIndex].isCompleted == true) {
      tasks[taskIndex].isCompleted = false;
    } else {
      tasks[taskIndex].isCompleted = true;
    }

    setStoredTasks([...tasks]);
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  };

  const handleEditTask = async (taskIndex: any) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: task.title,
        description: task.description,
        date: task.date,
        isStarred: task.isStarred,
        isCompleted: task.isCompleted,
      };
    }

    setStoredTasks([...tasks]);
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  };

  const handleStarredTask = async (taskIndex: any) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    tasks[taskIndex].isStarred = !tasks[taskIndex].isStarred;

    setStoredTasks([...tasks]);
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  };

  const handleDatePress = () => {
    DateTimePickerAndroid.open({
      value: task.date,
      onChange: dateOnChange,
      mode: "date",
      is24Hour: true,
      display: "calendar",
      minimumDate: new Date(),
    });
  };

  const handleAddTasks = async () => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    const formattedTask = {
      ...task,
      id: Date.now(),
      date:
        task.date instanceof Date
          ? task.date.toLocaleDateString()
          : new Date(task.date).toLocaleDateString(),
    };

    tasks.push(formattedTask);

    setStoredTasks([...tasks]);
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    const getStoredTasks = async () => {
      let result = await AsyncStorage.getItem("@tasks");
      if (result) {
        setStoredTasks(JSON.parse(result));
      }
    };

    if (!storedTasks) {
      getStoredTasks();
    }
  }, []);

  useEffect(() => {
    if (storedTasks) {
      setTasksCompletedLength(
        storedTasks.filter((task: any) => task.isCompleted === true).length
      );
    }
  }, [storedTasks]);

  return {
    task,
    storedTasks,
    setStoredTasks,
    tasksCompletedLength,
    isDescriptionVisible,
    handleTitleChange,
    handleDescriptionChange,
    handleDateChange,
    handleDeleteTask,
    handleCompleteTask,
    handleStarredTask,
    handleDatePress,
    handleDescriptionPress,
    handleAddTasks,
    handleEditTask,
    toggleIsStarred,
    setIsDescriptionVisible,
    setTask,
  };
}
