import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function useThemeColors() {
  const systemTheme = useColorScheme();

  const [palette, setPalette] = useState("");
  const [theme, setTheme] = useState(systemTheme);

  async function getStoredPalette() {
    let result = await SecureStore.getItemAsync("palette");
    if (result) {
      setPalette(result);
    } else {
      setPalette("Wewak");
    }
  }

  async function getStoredTheme() {
    let result = await SecureStore.getItemAsync("theme");
    if (result) {
      setTheme(result);
    } else {
      setTheme(systemTheme);
    }
  }

  useEffect(() => {
    if (!palette) {
      getStoredPalette();
      getStoredTheme();
    }
  }, [palette, theme]);

  useEffect(() => {
    if (!theme || theme === "system") {
      setTheme(systemTheme);
    }
  }, [systemTheme]);

  return [palette, theme, setPalette, setTheme];
}
