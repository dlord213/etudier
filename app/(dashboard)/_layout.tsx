import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import useModalSheetStore from "@/hooks/useModalSheetStore";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Layout() {
  const { palette, isDarkMode, isOLEDMode, hasColorOnNavBar } = useThemeStore();
  const { isModalOpen } = useModalSheetStore();

  const navBarBackgroundColor = hasColorOnNavBar
    ? isDarkMode
      ? isOLEDMode
        ? "#000000"
        : Colors[palette][600]
      : Colors[palette][600]
    : isDarkMode
    ? isOLEDMode
      ? "#000000"
      : Colors.Backgrounds_Dark.Brand
    : Colors.Backgrounds_Light.Brand;

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { display: "none" },
        tabBarStyle: {
          backgroundColor: navBarBackgroundColor,
          display: isModalOpen ? "none" : "flex",
          elevation: 0,
          borderColor: navBarBackgroundColor,
        },
        tabBarActiveTintColor: !hasColorOnNavBar
          ? Colors[palette][400]
          : Colors.Text_Dark.Default,
        tabBarInactiveTintColor: Colors.Text_Dark.Tertiary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="note-sticky" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
