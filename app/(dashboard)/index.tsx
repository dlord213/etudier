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
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { router, useFocusEffect } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import useThemeStore from "@/hooks/useThemeStore";
import useModalSheetStore from "@/hooks/useModalSheetStore";
import useTaskStore from "@/hooks/useTaskStore";
import ThemedText from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import TaskList from "@/components/TaskList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Page() {
  const { palette, isDarkMode, isOLEDMode } = useThemeStore();
  const { toggleModalVisibility } = useModalSheetStore();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const {
    form,
    toggleIsEditingTask,
    isEditingTask,
    todayTasks,
    tomorrowTasks,
    upcomingTasks,
    completedTasks,
    saveStoredStateTasks,
    updateTitle,
    updateDate,
    updateTask,
    addTask,
    loadStoredTasks,
    resetForm,
  } = useTaskStore();

  const taskModalRef = useRef<BottomSheetMethods>(null);
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
        <Pressable onPress={() => router.push("/user")}>
          <FontAwesome name="user-circle-o" size={24} color={iconColor} />
        </Pressable>
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
        contentContainerStyle={{ gap: 8, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <TaskList task={todayTasks} text="Today" modal={taskModalRef} />
        <TaskList task={tomorrowTasks} text="Tomorrow" modal={taskModalRef} />
        <TaskList task={upcomingTasks} text="Upcoming" modal={taskModalRef} />
      </ScrollView>
      <Pressable
        onPress={() => {
          taskModalRef.current?.open();
          toggleModalVisibility();
        }}
        style={{
          padding: 16,
          backgroundColor: isDarkMode ? Colors.Text_Dark.Secondary : "#F4F4F4",
          borderRadius: 16,
          position: "absolute",
          bottom: 12,
          left: 8,
          width: screenWidth - 24,
        }}
      >
        <ThemedText text="I want to..." color="Tertiary" />
      </Pressable>
      <BottomSheet
        ref={taskModalRef}
        height={screenHeight / 5}
        disableKeyboardHandling
        onClose={() => {
          toggleModalVisibility();
          if (isEditingTask) {
            toggleIsEditingTask();
            resetForm();
          }
        }}
        style={{
          backgroundColor: isDarkMode
            ? Colors.Backgrounds_Dark.Brand
            : Colors.Backgrounds_Light.Brand,
        }}
      >
        <View style={{ paddingVertical: 8, paddingHorizontal: 16, gap: 12 }}>
          <ThemedTextInput
            style={{
              fontFamily: "WorkSans_700Bold",
              fontSize: 32,
            }}
            value={form.title}
            onChangeText={updateTitle}
            placeholderText="Title"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="calendar"
              size={28}
              color={iconColor}
              onPress={updateDate}
            />
            {isEditingTask ? (
              <MaterialIcons
                name="edit-square"
                size={28}
                color={Colors[palette][400]}
                onPress={() => {
                  updateTask();
                  if (form.title) {
                    taskModalRef.current?.close();
                  }
                }}
              />
            ) : (
              <AntDesign
                name="plussquare"
                size={32}
                color={Colors[palette][400]}
                onPress={() => {
                  addTask();
                  if (form.title) {
                    taskModalRef.current?.close();
                  }
                }}
              />
            )}
          </View>
        </View>
      </BottomSheet>
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
