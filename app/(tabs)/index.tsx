import { ActivityIndicator, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";

import ThemeContext from "@/contexts/ThemeContext";
import ThemedText from "@/components/ThemedText";
import ThemedPressableOpacity from "@/components/ThemedPressableOpacity";
import Colors from "@/constants/Colors";
import styles from "@/styles/tabs_index";
import useProfile from "@/hooks/useProfile";
import useTaskManager from "@/hooks/useTaskManager";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);

  let dateToday = new Date();

  const styleState = styles([theme, palette]);
  const router = useRouter();

  const { name } = useProfile();
  const { storedTasks, setStoredTasks } = useTaskManager();
  const [tasksLength, setTasksLength] = useState(null);

  useEffect(() => {
    if (storedTasks) {
      setTasksLength(
        storedTasks.filter(
          (task: any) =>
            task.date === dateToday.toLocaleDateString() &&
            task.isCompleted === false
        ).length
      );
    }
  }, [storedTasks]);

  useFocusEffect(
    useCallback(() => {
      const fetchTasks = async () => {
        const tasksString = await AsyncStorage.getItem("@tasks");
        let tasks = tasksString !== null ? JSON.parse(tasksString) : [];
        setStoredTasks(tasks);
      };

      fetchTasks();
    }, [])
  );

  const headingIconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  if (!name) {
    return (
      <ActivityIndicator
        color={
          theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default
        }
        size={64}
      />
    );
  }

  return (
    <SafeAreaView
      style={[
        styleState.safeAreaView,
        { justifyContent: !name ? "center" : "flex-start" },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, maxWidth: "70%" }}>
          <ThemedText
            text={"Welcome, " + name}
            style={styleState.headingBoldTextStyle}
          />
          <ThemedText
            text={
              tasksLength > 0
                ? tasksLength > 1
                  ? `Today, you have ${tasksLength} tasks.`
                  : `Today, you have ${tasksLength} task.`
                : "You have no tasks today."
            }
            color="tertiary"
            style={styleState.headingTertiaryTextStyle}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <ThemedPressableOpacity
            onPress={() => {
              router.push("/activity_log");
            }}
          >
            <Ionicons name="stats-chart" size={20} color={headingIconColor} />
          </ThemedPressableOpacity>
          <ThemedPressableOpacity
            onPress={() => {
              router.push("/settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color={headingIconColor}
            />
          </ThemedPressableOpacity>
          <FontAwesome5 name="bell" size={20} color={headingIconColor} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="Tasks overview"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
        <ThemedPressableOpacity
          onPress={() => {
            router.push("/tasks");
          }}
        >
          <FontAwesome6 name="add" size={20} color={headingIconColor} />
        </ThemedPressableOpacity>
      </View>
      {tasksLength && tasksLength > 0 ? (
        <ThemedPressableOpacity
          onPress={() => {
            router.push("/tasks");
          }}
          style={[
            styleState.cardStyle,
            { backgroundColor: Colors[palette][600] },
          ]}
        >
          <View>
            <ThemedText
              text="Number of tasks completed today"
              style={styleState.cardBodyTextStyle}
            />
            <ThemedText
              text={
                storedTasks
                  ? storedTasks.filter(
                      (task: any) =>
                        task.date === dateToday.toLocaleDateString() &&
                        task.isCompleted === true
                    ).length
                  : "-"
              }
              style={styleState.cardHeadingTextStyle}
            />
          </View>
          <FontAwesome5
            name="clipboard-check"
            size={48}
            color={Colors.Text_Dark.Default}
          />
        </ThemedPressableOpacity>
      ) : (
        <ThemedPressableOpacity
          onPress={() => {
            router.push("/tasks");
          }}
        >
          <View
            style={[
              styleState.cardStyle,
              { backgroundColor: Colors[palette][600] },
            ]}
          >
            <ThemedText
              text="No tasks."
              style={styleState.cardHeadingTextStyle}
            />
            <FontAwesome5
              name="clipboard"
              size={48}
              color={Colors.Text_Dark.Default}
            />
          </View>
        </ThemedPressableOpacity>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="Schedule overview"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
        <Pressable onPress={() => router.push("/schedule")}>
          <Entypo
            name="list"
            size={24}
            color={
              theme == "dark"
                ? Colors.Text_Dark.Default
                : Colors.Text_Light.Default
            }
          />
        </Pressable>
      </View>
      <ThemedPressableOpacity onPress={() => router.push("/schedule")}>
        <View
          style={[
            styleState.cardStyle,
            { backgroundColor: Colors[palette][600] },
          ]}
        >
          <ThemedText
            text="No schedules."
            style={styleState.cardHeadingTextStyle}
          />
          <FontAwesome5
            name="clock"
            size={36}
            color={Colors.Text_Dark.Default}
          />
        </View>
      </ThemedPressableOpacity>
      <StatusBar style={theme == "dark" ? "light" : "inverted"} />
    </SafeAreaView>
  );
}
