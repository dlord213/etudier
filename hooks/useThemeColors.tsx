import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function useThemeColors() {
  const themeMode = useColorScheme();

  const [palette, setPalette] = useState("Wewak");
  const [theme, setTheme] = useState(themeMode);

  const togglePalette = (palette: any) => {
    setPalette(palette);
  };

  return [palette, theme, setPalette, setTheme];
}