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
}));

export default useThemeStore;
