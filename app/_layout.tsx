import { SheetProvider } from "react-native-actions-sheet";
import { Stack } from "expo-router";
import { useEffect } from "react";

import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import useModalSheetStore from "@/hooks/useModalSheetStore";
import Colors from "@/constants/Colors";

export default function RootLayout() {
  const { isDarkMode, isOLEDMode } = useThemeStore();

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
          navigationBarColor: isDarkMode
            ? isOLEDMode
              ? "#000000"
              : Colors.Backgrounds_Dark.Brand
            : Colors.Backgrounds_Light.Brand,
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
        <Stack.Screen
          name="notes/add"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="notes/[id]"
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack>
    </SheetProvider>
  );
}
