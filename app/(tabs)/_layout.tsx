import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import { useContext } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTabBar from "@/components/CustomTabBar";

export default function Layout() {
  const { palette, theme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor:
          theme != "dark"
            ? Colors.Text_Dark.Default
            : Colors.Text_Light.Default,
        tabBarInactiveTintColor:
          theme != "dark"
            ? Colors.Text_Dark.Secondary
            : Colors.Text_Light.Secondary,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="assignment-add" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
