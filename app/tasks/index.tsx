import { useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
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
    handleDeleteTask,
    handleCompleteTask,
    handleStarredTask,
    handleDatePress,
    handleAddTasks,
    handleDescriptionPress,
    handleEditTask,
    setIsDescriptionVisible,
    isDescriptionVisible,
    toggleIsStarred,
  } = useTaskManager();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const sheetRef = useRef<BottomSheetMethods>(null);

  const [viewIndex, setViewIndex] = useState(0);
  const [lastSelectedViewIndex, setLastSelectedViewIndex] = useState(0);

  const views = [
    <>
      {storedTasks ? (
        <>
          {storedTasks.filter(
            (task: any) =>
              task.date < dateToday.toLocaleDateString() &&
              task.isCompleted === false
          ).length > 0 ? (
            <>
              <ThemedText
                text="Due tasks"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color:
                    theme == "dark"
                      ? Colors.Text_Dark.Secondary
                      : Colors.Text_Light.Secondary,
                }}
              />
              <TaskList
                text={"No due tasks."}
                tasks={storedTasks.filter(
                  (task: any) =>
                    task.date < dateToday.toLocaleDateString() &&
                    task.isCompleted === false
                )}
                handleCompleteTask={handleCompleteTask}
                handleDeleteTask={handleDeleteTask}
                handleStarredTask={handleStarredTask}
              />
            </>
          ) : null}
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
            bottomSheetRef={sheetRef}
            isEditingSetState={setIsEditing}
            openedTaskSetState={setTask}
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
            bottomSheetRef={sheetRef}
            isEditingSetState={setIsEditing}
            openedTaskSetState={setTask}
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
                task.date > dateTomorrow.toLocaleDateString() &&
                task.date > dateToday.toLocaleDateString()
            )}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            handleStarredTask={handleStarredTask}
            bottomSheetRef={sheetRef}
            isEditingSetState={setIsEditing}
            openedTaskSetState={setTask}
          />
          {/* Task Lists */}
        </>
      ) : null}
    </>,
    <>
      {storedTasks ? (
        <>
          <ThemedText
            text="Starred"
            style={{
              fontFamily: "WorkSans_400Regular",
              color:
                theme == "dark"
                  ? Colors.Text_Dark.Secondary
                  : Colors.Text_Light.Secondary,
            }}
          />
          <TaskList
            text={"No starred tasks."}
            tasks={storedTasks.filter((task: any) => task.isStarred === true)}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            handleStarredTask={handleStarredTask}
            bottomSheetRef={sheetRef}
            isEditingSetState={setIsEditing}
            openedTaskSetState={setTask}
          />
        </>
      ) : null}
    </>,
    <>
      {storedTasks ? (
        <>
          <ThemedText
            text="Done"
            style={{
              fontFamily: "WorkSans_400Regular",
              color:
                theme == "dark"
                  ? Colors.Text_Dark.Secondary
                  : Colors.Text_Light.Secondary,
            }}
          />
          <TaskList
            text={"No completed tasks."}
            tasks={storedTasks.filter((task: any) => task.isCompleted === true)}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            handleStarredTask={handleStarredTask}
            bottomSheetRef={sheetRef}
            isEditingSetState={setIsEditing}
            openedTaskSetState={setTask}
          />
        </>
      ) : null}
    </>,
    <>
      {storedTasks ? (
        <>
          <ThemedText
            text="Not yet done"
            style={{
              fontFamily: "WorkSans_400Regular",
              color:
                theme == "dark"
                  ? Colors.Text_Dark.Secondary
                  : Colors.Text_Light.Secondary,
            }}
          />
          <TaskList
            text={"No tasks."}
            tasks={storedTasks.filter(
              (task: any) =>
                task.isCompleted === false &&
                task.date > dateToday.toLocaleDateString()
            )}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            handleStarredTask={handleStarredTask}
            bottomSheetRef={sheetRef}
            isEditingSetState={setIsEditing}
            openedTaskSetState={setTask}
          />
        </>
      ) : null}
    </>,
    <></>,
    <></>,
  ]; // 0 - all | 1 - starred | 2 - Done | 3 - Not yet done | 4 - Dues | 5 - Placeholder for storedTasks update

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
      <ScrollView
        contentContainerStyle={{ gap: 16 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
        >
          <ThemedPressable
            onPress={() => setViewIndex(0)}
            children={
              <>
                <ThemedText
                  text="All"
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
            onPress={() => setViewIndex(1)}
            style={{ paddingHorizontal: 24 }}
            children={
              <>
                <FontAwesome
                  name="star"
                  size={24}
                  color={Colors[palette][600]}
                />
              </>
            }
            backgroundColor={Colors[palette][200]}
          />
          <ThemedPressable
            onPress={() => setViewIndex(2)}
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
            onPress={() => setViewIndex(3)}
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
          <ThemedPressable
            onPress={() => setViewIndex(4)}
            children={
              <>
                <ThemedText
                  text="Dues"
                  style={{
                    fontFamily: "WorkSans_400Regular",
                    color: Colors[palette][600],
                  }}
                />
              </>
            }
            backgroundColor={Colors[palette][200]}
          />
        </ScrollView>
        {views[viewIndex]}
      </ScrollView>
      <ThemedBottomSheetModal
        onOpen={() => {
          setIsModalVisible(true);
          setLastSelectedViewIndex(viewIndex);
          setViewIndex(5);
        }}
        onClose={() => {
          if (isEditing) {
            handleEditTask(
              storedTasks.findIndex((obj: any) => task.id === obj.id)
            );
          }
          setTimeout(() => {
            setViewIndex(lastSelectedViewIndex);
            setTask({
              date: new Date(),
              description: "",
              id: Date.now(),
              isCompleted: false,
              isStarred: false,
              title: "",
            });
            setIsEditing(false);
            setIsDescriptionVisible(false);
            setIsModalVisible(false);
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
                style={{ display: isEditing ? "none" : "flex" }}
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
                display: !task.title || isEditing ? "none" : "flex",
              },
            ]}
          >
            <Ionicons name="send" size={16} color={Colors.Text_Dark.Default} />
          </Pressable>
        </View>
      </ThemedBottomSheetModal>
      <Pressable
        onPress={() => {
          sheetRef.current?.open();
          setIsModalVisible(true);
          setIsEditing(false);
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
            display: isModalVisible ? "none" : "flex",
          },
        ]}
      >
        <FontAwesome6 name="add" size={16} color={Colors.Text_Dark.Default} />
      </Pressable>
      <StatusBar style={theme == "dark" ? "light" : "inverted"} />
    </SafeAreaView>
  );
}
