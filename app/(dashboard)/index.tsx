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
import { parseISO, isSameDay, addDays, isAfter } from "date-fns";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import useThemeStore from "@/hooks/useThemeStore";
import useModalSheetStore from "@/hooks/useModalSheetStore";
import useTaskStore from "@/hooks/useTaskStore";
import ThemedText from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";

export default function Page() {
  const { palette, isDarkMode } = useThemeStore();
  const { setIsModalOpen } = useModalSheetStore();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const {
    form,
    isEditingTask,
    todayTasks,
    tomorrowTasks,
    upcomingTasks,
    completedTasks,
    saveStoredStateTasks,
    toggleIsCompleted,
    updateTitle,
    updateDate,
    addTask,
    loadStoredTasks,
  } = useTaskStore();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const taskModalRef = useRef<BottomSheetMethods>(null);
  const styleState = styles(isDarkMode);

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
        {/* TODAY */}
        <View style={{ gap: 8 }}>
          <ThemedText
            text="Today"
            style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
          />
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => (
              <Pressable style={{ flexDirection: "row", gap: 8 }} key={task.id}>
                {task.isCompleted ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={iconColor}
                    onPress={() => {
                      toggleIsCompleted(task.id);
                    }}
                  />
                ) : (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color={iconColor}
                    onPress={() => {
                      toggleIsCompleted(task.id);
                    }}
                  />
                )}
                <ThemedText text={task.title} />
              </Pressable>
            ))
          ) : (
            <ThemedText text="No tasks for today." />
          )}
        </View>
        {/* TODAY */}

        {/* TOMORROW */}
        <View style={{ gap: 8 }}>
          <ThemedText
            text="Tomorrow"
            style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
          />
          {tomorrowTasks.length > 0 ? (
            tomorrowTasks.map((task) => (
              <Pressable style={{ flexDirection: "row", gap: 8 }} key={task.id}>
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
            ))
          ) : (
            <ThemedText text="No tasks for tomorrow." />
          )}
        </View>
        {/* TOMORROW */}

        {/* UPCOMING */}
        <View style={{ gap: 8 }}>
          <ThemedText
            text="Upcoming"
            style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
          />
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <Pressable style={{ flexDirection: "row", gap: 8 }} key={task.id}>
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
            ))
          ) : (
            <ThemedText text="No upcoming tasks." />
          )}
        </View>
        {/* UPCOMING */}
      </ScrollView>
      <Pressable
        onPress={() => {
          taskModalRef.current?.open();
          setIsModalOpen();
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
          setIsModalOpen();
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
            <AntDesign
              name="plussquare"
              size={32}
              color={Colors[palette][600]}
              onPress={() => {
                addTask();
                if (form.title) {
                  taskModalRef.current?.close();
                }
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      padding: 16,
      gap: 8,
    },
  });
