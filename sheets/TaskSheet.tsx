import React from "react";
import { View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Colors from "@/constants/Colors";
import useModalSheetStore from "@/hooks/useModalSheetStore";
import useTaskStore from "@/hooks/useTaskStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedTextInput from "@/components/ThemedTextInput";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TaskSheet() {
  const {
    addTask,
    deleteTask,
    form,
    isEditingTask,
    resetForm,
    updateDate,
    updateTask,
    updateTitle,
    toggleIsEditingTask,
  } = useTaskStore();
  const { isDarkMode, palette } = useThemeStore();
  const { toggleModalVisibility } = useModalSheetStore();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  return (
    <ActionSheet
      onClose={() => {
        toggleModalVisibility();
        if (isEditingTask) {
          toggleIsEditingTask();
          resetForm();
        }
      }}
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        paddingVertical: 24,
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
            <View style={{ flexDirection: "row", gap: 16 }}>
              <FontAwesome6
                name="delete-left"
                size={28}
                color={Colors[palette][600]}
                onPress={async () => {
                  await deleteTask(form.id.toString());
                  SheetManager.hide("task-sheet");
                }}
              />
              <MaterialIcons
                name="edit-square"
                size={28}
                color={Colors[palette][400]}
                onPress={() => {
                  updateTask();
                  if (form.title) {
                    SheetManager.hide("task-sheet");
                  }
                }}
              />
            </View>
          ) : (
            <AntDesign
              name="plussquare"
              size={32}
              color={Colors[palette][400]}
              onPress={() => {
                addTask();
                if (form.title) {
                  SheetManager.hide("task-sheet");
                }
              }}
            />
          )}
        </View>
      </View>
    </ActionSheet>
  );
}
