import { SheetProvider } from "react-native-actions-sheet";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import Colors from "@/constants/Colors";

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
    <GestureHandlerRootView>
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
              name="resource/[id]"
              options={{ animation: "fade_from_bottom" }}
            />
            <Stack.Screen
              name="flashcard/[flashcard]"
              options={{ animation: "fade_from_bottom" }}
            />
            <Stack.Screen
              name="flashcard/quiz/[quiz]"
              options={{
                animation: "fade_from_bottom",
                statusBarColor: Colors[palette][600],
                statusBarStyle: "light",
              }}
            />
            <Stack.Screen
              name="flashcard/upload"
              options={{
                animation: "fade_from_bottom",
                statusBarColor: Colors[palette][600],
                statusBarStyle: "light",
              }}
            />
          </Stack>
          <Toaster
            visibleToasts={1}
            position="bottom-center"
            closeButton={true}
            theme={isDarkMode ? "dark" : "light"}
          />
        </SheetProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
