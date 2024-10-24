import { useColorScheme } from "react-native";
import { create } from "zustand";

interface ThemeStoreInterface {
  palette: string;
  isDarkMode: boolean;
  setPalette: (newPalette: string) => void;
  toggleDarkMode: () => void;
}

const useThemeStore = create<ThemeStoreInterface>()((set, get) => ({
  palette: "Victoria",
  isDarkMode: false,
  setPalette: (newPalette: string) => set({ palette: newPalette }),
  toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode }),
}));

export default useThemeStore;
