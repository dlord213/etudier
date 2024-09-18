import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function useTaskManager() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: new Date(),
    isStarred: false,
    isCompleted: false,
  });

  const [storedTasks, setStoredTasks] = useState(null);

  const handleTitleChange = (newTitle) => {
    setTask((prevTask) => ({
      ...prevTask,
      title: newTitle,
    }));
  };

  const handleDescriptionChange = (newDescription) => {
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

  const handleDateChange = (newDate) => {
    setTask((prevTask) => ({
      ...prevTask,
      date: newDate.toLocaleDateString(),
    }));
  };

  const dateOnChange = (event, selectedDate) => {
    handleDateChange(selectedDate);
  };

  const handleCompleteTask = async (taskIndex) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    tasks[taskIndex].isCompleted = true;

    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));

    setStoredTasks([...tasks]);
    console.log("Task marked as completed:", tasks[taskIndex]);
  };

  const handleStarredTask = async (taskIndex) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    tasks[taskIndex].isStarred = !tasks[taskIndex].isStarred;

    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));

    setStoredTasks([...tasks]);
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

    tasks.push(task);

    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));

    setStoredTasks(tasks);
    console.log("Task added successfully!", tasks);
  };

  useEffect(() => {
    const getStoredTasks = async () => {
      let result = await AsyncStorage.getItem("@tasks");
      if (result) {
        setStoredTasks(JSON.parse(result));
      }
    };

    if (storedTasks == null) {
      getStoredTasks();
    }
  }, [storedTasks]);

  return {
    task,
    storedTasks,
    handleTitleChange,
    handleDescriptionChange,
    toggleIsStarred,
    handleDateChange,
    handleCompleteTask,
    handleStarredTask,
    handleDatePress,
    handleAddTasks,
  };
}
