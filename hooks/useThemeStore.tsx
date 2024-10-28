import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { create } from "zustand";

interface ThemeStoreInterface {
  palette: string;
  isDarkMode: boolean;
  isOLEDMode: boolean;
  setDarkMode: (value: boolean) => void;
  setOLEDMode: (value: boolean) => void;
  setPalette: (newPalette: string) => void;
  toggleDarkMode: () => void;
  toggleOLEDMode: () => void;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
}

const useThemeStore = create<ThemeStoreInterface>()((set, get) => ({
  palette: "Wewak",
  isDarkMode: true,
  isOLEDMode: false,
  setPalette: (newPalette: string) => set({ palette: newPalette }),
  setDarkMode: (value: boolean) => set({ isDarkMode: value }),
  setOLEDMode: (value: boolean) => set({ isOLEDMode: value }),
  toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode }),
  toggleOLEDMode: () => {
    if (get().isDarkMode) {
      set({ isOLEDMode: !get().isOLEDMode });
    }
  },
  loadSettings: async () => {
    const themeSettings = await AsyncStorage.getItem("@theme_settings");
    if (themeSettings) {
      const settings = JSON.parse(themeSettings);
      console.log(settings);
      set({
        palette: settings.palette,
        isDarkMode: settings.isDarkMode,
        isOLEDMode: settings.isOLEDMode,
      });
    }
  },
  saveSettings: async () => {
    await AsyncStorage.setItem(
      "@theme_settings",
      JSON.stringify({
        palette: get().palette,
        isDarkMode: get().isDarkMode,
        isOLEDMode: get().isOLEDMode,
      })
    );
  },
}));

export default useThemeStore;
