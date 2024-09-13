import ThemeContext from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import { useContext, useState } from "react";

import CustomTabBar from "@/components/CustomTabBar";
import TabBarVisibilityContext from "@/contexts/TabBarVisibilityContext";

export default function Layout() {
  const { palette, theme } = useContext(ThemeContext);
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  return (
    <TabBarVisibilityContext.Provider
      value={{ isTabBarVisible, setIsTabBarVisible }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => (
          <CustomTabBar {...props} isTabBarVisible={isTabBarVisible} />
        )}
      >
        <Tabs.Screen name="notes" />
        <Tabs.Screen name="index" />
        <Tabs.Screen name="timer" />
      </Tabs>
    </TabBarVisibilityContext.Provider>
  );
}
