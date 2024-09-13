import ThemeContext from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import { useContext } from "react";

import CustomTabBar from "@/components/CustomTabBar";

export default function Layout() {
  const { palette, theme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="notes" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="timer" />
    </Tabs>
  );
}
