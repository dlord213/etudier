import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function useThemeColors() {
  const themeMode = useColorScheme();

  const [palette, setPalette] = useState("");
  const [theme, setTheme] = useState(themeMode);

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
  }, [palette]);

  return [palette, theme, setPalette, setTheme];
}
