import Colors from "@/constants/Colors";
import {
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";
import { router, useFocusEffect } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import useThemeStore from "@/hooks/useThemeStore";
import useModalSheetStore from "@/hooks/useModalSheetStore";
import useTaskStore from "@/hooks/useTaskStore";
import ThemedText from "@/components/ThemedText";
import TaskList from "@/components/TaskList";
import { SheetManager } from "react-native-actions-sheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Page() {
  const { palette, isDarkMode, isOLEDMode } = useThemeStore();
  const { toggleModalVisibility } = useModalSheetStore();

  const {
    overdueTasks,
    todayTasks,
    tomorrowTasks,
    upcomingTasks,
    completedTasks,
    overdueTasksVisible,
    todayTasksVisible,
    tomorrowTasksVisible,
    upcomingTasksVisible,
    completedTasksVisible,
    saveStoredStateTasks,
    loadStoredTasks,
    toggleIsCompleted,
    toggleIsEditingTask,
    form,
  } = useTaskStore();

  const sections = [
    { title: "Overdue", data: overdueTasks, isVisible: overdueTasksVisible },
    { title: "Today", data: todayTasks, isVisible: todayTasksVisible },
    { title: "Tomorrow", data: tomorrowTasks, isVisible: tomorrowTasksVisible },
    { title: "Upcoming", data: upcomingTasks, isVisible: upcomingTasksVisible },
    {
      title: "Completed",
      data: completedTasks,
      isVisible: completedTasksVisible,
    },
  ];

  const styleState = styles(isDarkMode, isOLEDMode);

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  useFocusEffect(
    useCallback(() => {
      loadStoredTasks();

      return () => saveStoredStateTasks();
    }, [])
  );

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 32 }}
          text="Tasks"
        />
        <View style={{ flexDirection: "row", gap: 24 }}>
          <Pressable onPress={() => SheetManager.show("task-sort-sheet")}>
            <MaterialIcons name="sort" size={24} color={iconColor} />
          </Pressable>
          <Pressable onPress={() => router.push("/user")}>
            <FontAwesome name="user-circle-o" size={24} color={iconColor} />
          </Pressable>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: Colors[palette][600],
          padding: 16,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <ThemedText
            text="Number of tasks completed"
            inverted={isDarkMode ? false : true}
          />
          <ThemedText
            text={completedTasks.length.toString()}
            style={{ fontFamily: "WorkSans_700Bold", fontSize: 28 }}
            inverted={isDarkMode ? false : true}
          />
        </View>
        <MaterialCommunityIcons
          name="clipboard-check-multiple-outline"
          size={48}
          color={Colors.Text_Dark.Default}
        />
      </Pressable>
      <SectionList
        sections={sections.filter(
          (section) => section.isVisible && section.data.length > 0
        )}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedText
            text={title}
            style={{
              fontFamily: "WorkSans_700Bold",
              fontSize: 24,
              marginVertical: 8,
            }}
          />
        )}
        renderItem={({ item: task }) => (
          <Pressable
            style={{ flexDirection: "row", gap: 8, paddingVertical: 4 }}
            onPress={() => {
              toggleIsEditingTask();
              toggleModalVisibility();
              form.title = task.title;
              form.date = new Date(task.date);
              form.id = task.id;
              SheetManager.show("task-sheet");
            }}
          >
            <Ionicons
              name={
                task.isCompleted
                  ? "checkmark-circle"
                  : "checkmark-circle-outline"
              }
              size={24}
              color={iconColor}
              onPress={() => toggleIsCompleted(task.id)}
            />
            <ThemedText text={task.title} />
          </Pressable>
        )}
        ListEmptyComponent={
          <ThemedText
            text="No tasks available."
            style={{ fontFamily: "WorkSans_900Black", fontSize: 24 }}
          />
        }
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
      <Pressable
        onPress={() => {
          SheetManager.show("task-sheet");
          toggleModalVisibility();
        }}
        style={{
          padding: 16,
          backgroundColor: isDarkMode ? Colors.Text_Dark.Secondary : "#F4F4F4",
          borderRadius: 16,
          bottom: 12,
        }}
      >
        <ThemedText text="I want to..." color="Tertiary" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = (isDarkMode: boolean, isOLEDMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? isOLEDMode
          ? "#000000"
          : Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      paddingHorizontal: 16,
      gap: 8,
    },
  });
