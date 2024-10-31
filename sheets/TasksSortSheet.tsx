import { Switch, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useTaskStore from "@/hooks/useTaskStore";

export default function TaskSortSheet() {
  const { isDarkMode, palette } = useThemeStore();

  const {
    todayTasksVisible,
    tomorrowTasksVisible,
    upcomingTasksVisible,
    completedTasksVisible,
    overdueTasksVisible,
    toggleOverdueTasksVisible,
    toggleTodayTasksVisible,
    toggleTomorrowTasksVisible,
    toggleUpcomingTasksVisible,
    toggleCompletedTasksVisible,
    saveTaskSettings,
  } = useTaskStore();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
      onClose={() => {
        saveTaskSettings();
      }}
    >
      <View style={{ padding: 16 }}>
        <View>
          <View style={{ marginBottom: 16 }}>
            <ThemedText
              text="Too cluttered?"
              style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
            />
            <ThemedText
              text="Turn unnecessary categories off!"
              color="Tertiary"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText text="Overdue Tasks" />
            <Switch
              value={overdueTasksVisible}
              onValueChange={toggleOverdueTasksVisible}
              thumbColor={Colors[palette][600]}
              trackColor={{
                false: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                true: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
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
            <ThemedText text="Today's Tasks" />
            <Switch
              value={todayTasksVisible}
              onValueChange={toggleTodayTasksVisible}
              thumbColor={Colors[palette][600]}
              trackColor={{
                false: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                true: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
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
            <ThemedText text="Tomorrow's Tasks" />
            <Switch
              value={tomorrowTasksVisible}
              onValueChange={toggleTomorrowTasksVisible}
              thumbColor={Colors[palette][600]}
              trackColor={{
                false: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                true: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
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
            <ThemedText text="Upcoming Tasks" />
            <Switch
              value={upcomingTasksVisible}
              onValueChange={toggleUpcomingTasksVisible}
              thumbColor={Colors[palette][600]}
              trackColor={{
                false: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                true: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
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
            <ThemedText text="Completed Tasks" />
            <Switch
              value={completedTasksVisible}
              onValueChange={toggleCompletedTasksVisible}
              thumbColor={Colors[palette][600]}
              trackColor={{
                false: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                true: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
              }}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}
