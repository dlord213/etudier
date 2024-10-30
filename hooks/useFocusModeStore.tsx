import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export enum FocusModeStates {
  Study = 0,
  Break = 1,
}

interface FocusModeInterface {
  currentState: FocusModeStates;
  timerDuration: number;
  isPlaying: boolean;
  isOnFocusMode: boolean;
  isOnBreakMode: boolean;
  isSheetIconVisible: boolean;
  toggleIsOnFocusMode: () => void;
  toggleIsPlaying: () => void;
  toggleIsOnBreakMode: () => void;
  toggleIsSheetIconVisible: (val: boolean) => void;
  setFocusModeState: (val: FocusModeStates) => void;
  adjustTimerDuration: () => void;
}

const useFocusModeStore = create<FocusModeInterface>()(
  immer((set, get) => ({
    currentState: FocusModeStates.Study,
    timerDuration: 15 * 60,
    isPlaying: false,
    isOnFocusMode: true,
    isOnBreakMode: false,
    isSheetIconVisible: false,
    toggleIsPlaying: () => {
      set({ isPlaying: !get().isPlaying });
    },
    toggleIsOnFocusMode: () => {
      set({ isOnFocusMode: true, isOnBreakMode: false });
    },
    toggleIsOnBreakMode: () => {
      set({ isOnFocusMode: false, isOnBreakMode: true });
    },
    toggleIsSheetIconVisible: (val: boolean) => {
      set({ isSheetIconVisible: val });
    },
    setFocusModeState: (val: FocusModeStates) => {
      set({ currentState: val });
    },
    adjustTimerDuration: () => {
      if (get().currentState == FocusModeStates.Study) {
        set({ timerDuration: 15 * 60 });
      } else {
        set({ timerDuration: 5 * 60 });
      }
    },
  }))
);

export default useFocusModeStore;
