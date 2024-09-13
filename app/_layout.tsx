import ThemeContext from "@/contexts/ThemeContext";
import useThemeColors from "@/hooks/useThemeColors";
import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";

export default function RootLayout() {
  const [palette, theme, togglePalette, setTheme] = useThemeColors();

  return (
    <ThemeContext.Provider value={{ palette, theme, togglePalette, setTheme }}>
      <Stack
        initialRouteName="index"
        screenOptions={{ headerShown: false, orientation: "portrait" }}
      >
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen
          name="initial_boot/index"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="initial_boot/welcome"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ animation: "fade", animationDuration: 5000 }}
        />
        <Stack.Screen
          name="settings/index"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="activity_log/index"
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack>
    </ThemeContext.Provider>
  );
}
