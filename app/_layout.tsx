import { SheetProvider } from "react-native-actions-sheet";
import { Stack } from "expo-router";
import { useEffect } from "react";

import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import Colors from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { isDarkMode, isOLEDMode, palette, hasColorOnNavBar } = useThemeStore();

  const { loadStoredSession } = useAuthStore();
  const { loadThemeSettings } = useThemeStore();

  useEffect(() => {
    loadStoredSession();
    loadThemeSettings();
  }, []);

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
    <QueryClientProvider client={queryClient}>
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
          <Stack.Screen
            name="(dashboard)"
            options={{
              animation: "fade",
              navigationBarColor: navBarBackgroundColor,
            }}
          />
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
          <Stack.Screen
            name="hub/[flashcard]"
            options={{ animation: "fade_from_bottom" }}
          />
        </Stack>
      </SheetProvider>
    </QueryClientProvider>
  );
}
