import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import { useContext } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
  const { palette, theme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor:
            theme != "dark"
              ? Colors.Backgrounds_Dark.Brand
              : Colors.Backgrounds_Light.Brand,
          borderWidth: 0,
        },
        tabBarActiveTintColor:
          theme != "dark"
            ? Colors.Text_Dark.Default
            : Colors.Text_Light.Default,
        tabBarInactiveTintColor:
          theme != "dark"
            ? Colors.Text_Dark.Secondary
            : Colors.Text_Light.Secondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="assignment-add" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
