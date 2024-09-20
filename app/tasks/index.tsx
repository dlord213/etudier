import { useContext, useRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { StatusBar } from "expo-status-bar";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import styles from "@/styles/tasks";
import ThemedModalTextInput from "@/components/ThemedModalTextInput";
import ThemedPressableOpacity from "@/components/ThemedPressableOpacity";
import ThemeContext from "@/contexts/ThemeContext";
import ThemedPressable from "@/components/ThemedPressable";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";
import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";

import useTaskManager from "@/hooks/useTaskManager";
import TaskList from "@/components/TaskList";

export default function Index() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);
  const { height: screenHeight } = useWindowDimensions();

  const iconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  const dateToday = new Date();
  const dateTomorrow = new Date(dateToday);
  dateTomorrow.setDate(dateToday.getDate() + 1);

  const {
    task,
    setTask,
    storedTasks,
    tasksCompletedLength,
    handleTitleChange,
    handleDescriptionChange,
    toggleIsStarred,
    handleDeleteTask,
    handleCompleteTask,
    handleStarredTask,
    handleDatePress,
    handleAddTasks,
    setIsDescriptionVisible,
    isDescriptionVisible,
    handleDescriptionPress,
  } = useTaskManager();

  const sheetRef = useRef<BottomSheetMethods>(null);

  if (!storedTasks) {
    return (
      <SafeAreaView style={styleState.safeAreaView}>
        <ActivityIndicator color={Colors[palette][600]} />
      </SafeAreaView>
    );
  }

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
          <ThemedText
            text={tasksCompletedLength}
            style={styleState.cardHeadingTextStyle}
          />
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
                text="Done"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </>
          }
          backgroundColor={Colors[palette][200]}
        />
        <ThemedPressable
          children={
            <>
              <ThemedText
                text="Not yet done"
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
      <ThemedText
        text="Today"
        style={{
          fontFamily: "WorkSans_400Regular",
          color:
            theme == "dark"
              ? Colors.Text_Dark.Secondary
              : Colors.Text_Light.Secondary,
        }}
      />
      <TaskList
        text={"No tasks for today."}
        tasks={storedTasks.filter(
          (task: any) => task.date === dateToday.toLocaleDateString()
        )}
        handleCompleteTask={handleCompleteTask}
        handleDeleteTask={handleDeleteTask}
        handleStarredTask={handleStarredTask}
      />
      <ThemedText
        text="Tomorrow"
        style={{
          fontFamily: "WorkSans_400Regular",
          color:
            theme == "dark"
              ? Colors.Text_Dark.Secondary
              : Colors.Text_Light.Secondary,
        }}
      />
      <TaskList
        text={"No tasks for tomorrow."}
        tasks={storedTasks.filter(
          (task: any) => task.date === dateTomorrow.toLocaleDateString()
        )}
        handleCompleteTask={handleCompleteTask}
        handleDeleteTask={handleDeleteTask}
        handleStarredTask={handleStarredTask}
      />
      <ThemedText
        text="Upcoming tasks"
        style={{
          fontFamily: "WorkSans_400Regular",
          color:
            theme == "dark"
              ? Colors.Text_Dark.Secondary
              : Colors.Text_Light.Secondary,
        }}
      />
      <TaskList
        text={"No upcoming tasks."}
        tasks={storedTasks.filter(
          (task: any) =>
            task.date !== dateTomorrow.toLocaleDateString() &&
            task.date !== dateToday.toLocaleDateString()
        )}
        handleCompleteTask={handleCompleteTask}
        handleDeleteTask={handleDeleteTask}
        handleStarredTask={handleStarredTask}
      />
      <ThemedBottomSheetModal
        onClose={() => {
          setTimeout(() => {
            setTask({
              title: "",
              description: "",
              date: new Date(),
              isStarred: false,
              isCompleted: false,
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
            onPress={() => {
              handleAddTasks();
              sheetRef.current?.close();
            }}
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
