import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useWindowDimensions } from "react-native";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import useModalSheetStore from "@/hooks/useModalSheetStore";

export default function Layout() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const { palette } = useThemeStore();
  const { isModalOpen } = useModalSheetStore();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { display: "none" },
        tabBarStyle: {
          backgroundColor: Colors[palette][600],
          height: screenHeight / 12,
          display: isModalOpen ? "none" : "flex",
        },
        tabBarActiveTintColor: Colors.Text_Dark.Default,
        tabBarInactiveTintColor: Colors.Text_Dark.Tertiary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
