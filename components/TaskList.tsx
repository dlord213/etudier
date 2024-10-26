import { Pressable, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import ThemedText from "./ThemedText";
import useTaskStore, { TaskForm } from "@/hooks/useTaskStore";
import useThemeStore from "@/hooks/useThemeStore";
import Colors from "@/constants/Colors";
import useModalSheetStore from "@/hooks/useModalSheetStore";

interface TaskListInterface {
  task: TaskForm[];
  text: string;
  modal: any;
}

export default function TaskList({ task, text, modal }: TaskListInterface) {
  const { toggleIsCompleted, toggleIsEditingTask, form, isEditingTask } =
    useTaskStore();
  const { isDarkMode } = useThemeStore();

  const { toggleModalVisibility } = useModalSheetStore();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  return (
    <View style={{ gap: 8 }}>
      <ThemedText
        text={text}
        style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
      />
      {task.length > 0 ? (
        task.map((task: TaskForm) => (
          <Pressable
            style={{ flexDirection: "row", gap: 8 }}
            key={task.id}
            onPress={() => {
              toggleIsEditingTask();
              toggleModalVisibility();
              form.title = task.title;
              form.date = new Date(task.date);
              form.id = task.id;
              modal.current?.open();
            }}
          >
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
  );
}
