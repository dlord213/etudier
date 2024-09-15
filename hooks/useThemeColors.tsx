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

  useEffect(() => {
    if (!palette) {
      getStoredPalette();
    }
  }, [palette, theme]);

  useEffect(() => {
    if (!theme || theme === "system") {
      setTheme(systemTheme); // Keep system theme unless manually changed
    }
  }, [systemTheme]);

  return [palette, theme, setPalette, setTheme];
}
