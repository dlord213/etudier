import { SheetProvider } from "react-native-actions-sheet";
import { Stack } from "expo-router";
import { useEffect } from "react";

import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";

export default function RootLayout() {
  const { isDarkMode } = useThemeStore();

  const { loadStoredSession } = useAuthStore();
  const { loadSettings } = useThemeStore();

  useEffect(() => {
    loadStoredSession();
    loadSettings();
  }, []);

  return (
    <SheetProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: isDarkMode ? "light" : "dark",
          statusBarTranslucent: true,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(dashboard)" options={{ animation: "fade" }} />
        <Stack.Screen
          name="user/index"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="settings/index"
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack>
    </SheetProvider>
  );
}
