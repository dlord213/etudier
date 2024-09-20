import { View } from "react-native";
import { useContext, useEffect } from "react";

import ThemedPressableOpacity from "./ThemedPressableOpacity";
import ThemedText from "./ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import TaskProps from "@/constants/TaskProps";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useTaskManager from "@/hooks/useTaskManager";

interface TaskListProps {
  tasks: TaskProps[];
  text: any;
  handleCompleteTask: (index: number) => void;
  handleStarredTask: (index: number) => void;
  handleDeleteTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  text,
  handleCompleteTask,
  handleStarredTask,
  handleDeleteTask,
}) => {
  const { theme } = useContext(ThemeContext);
  const { storedTasks } = useTaskManager();
  const iconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  if (storedTasks) {
    return tasks.length > 0 ? (
      tasks.map((task) => {
        const index = storedTasks.findIndex(
          (obj: any) => task.title === obj.title && task.date === obj.date
        );
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
                flex: 1,
              }}
            >
              <ThemedPressableOpacity onPress={() => handleCompleteTask(index)}>
                <MaterialIcons
                  name={
                    task.isCompleted ? "check-circle" : "check-circle-outline"
                  }
                  size={24}
                  color={iconColor}
                />
              </ThemedPressableOpacity>
              <View style={{ flex: 1 }}>
                <ThemedText
                  text={task.title}
                  style={{
                    fontFamily: "WorkSans_700Bold",
                    fontSize: 16,
                    flexWrap: "wrap",
                    flexShrink: 1,
                  }}
                />
                {task.description ? (
                  <ThemedText
                    text={task.description}
                    style={{
                      fontFamily: "WorkSans_400Regular",
                      color:
                        theme == "dark"
                          ? Colors.Text_Dark.Tertiary
                          : Colors.Text_Light.Tertiary,
                      flexWrap: "wrap",
                      flexShrink: 1,
                    }}
                  />
                ) : null}
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <ThemedPressableOpacity onPress={() => handleStarredTask(index)}>
                {!task.isStarred ? (
                  <FontAwesome name="star-o" size={24} color={iconColor} />
                ) : (
                  <FontAwesome name="star" size={24} color={iconColor} />
                )}
              </ThemedPressableOpacity>
              <ThemedPressableOpacity onPress={() => handleDeleteTask(index)}>
                <MaterialIcons name="delete" size={24} color={iconColor} />
              </ThemedPressableOpacity>
            </View>
          </View>
        );
      })
    ) : (
      <ThemedText text={text} style={{ fontFamily: "WorkSans_400Regular" }} />
    );
  }
};

export default TaskList;