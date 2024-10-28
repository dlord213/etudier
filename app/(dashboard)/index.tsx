import Colors from "@/constants/Colors";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useRef } from "react";
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

export default function Page() {
  const { palette, isDarkMode, isOLEDMode } = useThemeStore();
  const { toggleModalVisibility } = useModalSheetStore();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const {
    todayTasks,
    tomorrowTasks,
    upcomingTasks,
    completedTasks,
    todayTasksVisible,
    tomorrowTasksVisible,
    upcomingTasksVisible,
    completedTasksVisible,
    saveStoredStateTasks,
    loadStoredTasks,
  } = useTaskStore();

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
      <ScrollView
        contentContainerStyle={{ gap: 8, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <TaskList
          task={todayTasks}
          text="Today"
          modal="task-sheet"
          isVisible={todayTasksVisible}
        />
        <TaskList
          task={tomorrowTasks}
          text="Tomorrow"
          modal="task-sheet"
          isVisible={tomorrowTasksVisible}
        />
        <TaskList
          task={upcomingTasks}
          text="Upcoming"
          modal="task-sheet"
          isVisible={upcomingTasksVisible}
        />
        <TaskList
          task={completedTasks}
          text="Completed"
          modal="task-sheet"
          isVisible={completedTasksVisible}
        />
      </ScrollView>
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
