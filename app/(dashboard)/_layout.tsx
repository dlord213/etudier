import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useWindowDimensions } from "react-native";

import Colors from "@/constants/Colors";

export default function Layout() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { display: "none" },
        tabBarStyle: {
          backgroundColor: Colors.Wewak[600],
          height: screenHeight / 12,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
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
