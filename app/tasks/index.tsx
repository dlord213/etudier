import { useContext, useEffect, useRef, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ThemedPressable from "@/components/ThemedPressable";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import styles from "@/styles/tasks";
import ThemedModalTextInput from "@/components/ThemedModalTextInput";
import ThemedPressableOpacity from "@/components/ThemedPressableOpacity";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Index() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);
  const { height: screenHeight } = useWindowDimensions();

  const [task, setTask] = useState({
    title: "",
    description: "",
    date: new Date(),
    isStarred: false,
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
      date: newDate,
    }));
  };

  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const iconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  const sheetRef = useRef<BottomSheetMethods>(null);

  const dateOnChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    handleDateChange(selectedDate);
  };

  const handleDatePress = () => {
    DateTimePickerAndroid.open({
      value: task.date,
      onChange: dateOnChange,
      mode: "date",
      is24Hour: true,
      display: "calendar",
    });
  };

  const handleDescriptionPress = () => {
    setIsDescriptionVisible((prevState) => !prevState);
  };

  const handleAddTasks = async () => {
    sheetRef.current?.close();

    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    tasks.push(task);
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
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
  }, [task]);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={{ flexDirection: "row" }}>
        <ThemedText
          text="Tasks"
          style={[styleState.headingTextStyle, { textAlign: "center" }]}
        />
      </View>
      <View
        style={[
          styleState.cardStyle,
          { backgroundColor: Colors[palette][600] },
        ]}
      >
        <View>
          <ThemedText
            text="Number of tasks completed"
            style={styleState.cardBodyTextStyle}
          />
          <ThemedText text="0" style={styleState.cardHeadingTextStyle} />
        </View>

        <FontAwesome5
          name="clipboard-check"
          size={48}
          color={Colors.Text_Dark.Default}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <ThemedPressable
          style={{ paddingHorizontal: 24 }}
          children={
            <>
              <FontAwesome name="star" size={24} color={Colors[palette][600]} />
            </>
          }
          backgroundColor={Colors[palette][200]}
        />
        <ThemedPressable
          children={
            <>
              <ThemedText
                text="Tasks"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </>
          }
          backgroundColor={Colors[palette][200]}
        />
      </View>
      <Pressable
        onPress={() => {
          sheetRef.current?.open();
        }}
        style={({ pressed }) => [
          {
            bottom: 25,
            position: "absolute",
            right: 25,
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 8,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <FontAwesome6 name="add" size={16} color={Colors.Text_Dark.Default} />
      </Pressable>
      {storedTasks != null
        ? storedTasks.map((obj) => (
            <View>
              <ThemedText
                text={obj.title}
                style={{ fontFamily: "WorkSans_700Bold", fontSize: 16 }}
              />
              <ThemedText
                text={obj.description}
                style={{
                  fontFamily: "WorkSans_400Regular",
                  display: obj.description ? "flex" : "none",
                  color:
                    theme == "dark"
                      ? Colors.Text_Dark.Secondary
                      : Colors.Text_Light.Secondary,
                }}
              />
            </View>
          ))
        : null}
      <ThemedBottomSheetModal
        onClose={() => {
          setTimeout(() => {
            setTask({
              title: "",
              description: "",
              date: new Date(),
              isStarred: false,
            });
            setIsDescriptionVisible(false);
          }, 250);
        }}
        ref={sheetRef}
        height={isDescriptionVisible ? "50%" : "25%"}
      >
        <View style={{ marginBottom: 8 }}>
          <ThemedModalTextInput
            onChangeText={handleTitleChange}
            value={task.title}
            placeholder="Title"
            multiline={false}
            style={{ fontSize: 24 }}
          />
          <ThemedModalTextInput
            onChangeText={handleDescriptionChange}
            value={task.description}
            placeholder="Description"
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 14,
              display: isDescriptionVisible ? "flex" : "none",
              maxHeight: screenHeight / 4,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 16 }}>
            <ThemedPressableOpacity onPress={handleDescriptionPress}>
              <Octicons
                name="note"
                size={24}
                color={
                  theme == "dark"
                    ? Colors.Text_Dark.Default
                    : Colors.Text_Light.Default
                }
              />
            </ThemedPressableOpacity>
            <ThemedPressableOpacity onPress={handleDatePress}>
              <MaterialIcons
                name="date-range"
                size={24}
                color={
                  theme == "dark"
                    ? Colors.Text_Dark.Default
                    : Colors.Text_Light.Default
                }
              />
            </ThemedPressableOpacity>
            <ThemedPressableOpacity onPress={toggleIsStarred}>
              {!task.isStarred ? (
                <FontAwesome name="star-o" size={24} color={iconColor} />
              ) : (
                <FontAwesome name="star" size={24} color={iconColor} />
              )}
            </ThemedPressableOpacity>
          </View>
          <Pressable
            onPress={handleAddTasks}
            style={({ pressed }) => [
              {
                backgroundColor: Colors[palette][600],
                padding: 8,
                borderRadius: 8,
                opacity: pressed ? 0.8 : 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                display: !task.title ? "none" : "flex",
              },
            ]}
          >
            <Ionicons name="send" size={16} color={Colors.Text_Dark.Default} />
          </Pressable>
        </View>
      </ThemedBottomSheetModal>
      <StatusBar style={theme == "dark" ? "light" : "inverted"} />
    </SafeAreaView>
  );
}
