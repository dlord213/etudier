import ThemeContext from "@/contexts/ThemeContext";
import useThemeColors from "@/hooks/useThemeColors";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [palette, theme, togglePalette, setTheme] = useThemeColors();

  return (
    <ThemeContext.Provider value={{ palette, theme, togglePalette, setTheme }}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="initial_boot/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="initial_boot/welcome"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="homepage/index" options={{ headerShown: false }} />
      </Stack>
    </ThemeContext.Provider>
  );
}
