import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export enum FocusModeStates {
  Study = 0,
  Break = 1,
}

interface Timer {
  hours: number;
  minutes: number;
  seconds: number;
}

interface FocusModeInterface {
  currentState: FocusModeStates;
  focusModeTimer: Timer;
  breakModeTimer: Timer;
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
  calculateTimerDuration: (timer: Timer) => number;
  adjustTimerDuration: () => void;
  setFocusModeDuration: (time: Timer) => void;
  setBreakModeDuration: (time: Timer) => void;
}

const useFocusModeStore = create<FocusModeInterface>()(
  immer((set, get) => ({
    currentState: FocusModeStates.Study,
    focusModeTimer: {
      hours: 0,
      minutes: 15,
      seconds: 0,
    },
    breakModeTimer: {
      hours: 0,
      minutes: 5,
      seconds: 0,
    },
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
      get().adjustTimerDuration();
    },
    toggleIsOnBreakMode: () => {
      set({ isOnFocusMode: false, isOnBreakMode: true });
      get().adjustTimerDuration();
    },
    toggleIsSheetIconVisible: (val: boolean) => {
      set({ isSheetIconVisible: val });
    },
    setFocusModeState: (val: FocusModeStates) => {
      set({ currentState: val });
      get().adjustTimerDuration();
    },
    calculateTimerDuration: (timer: Timer) => {
      return timer.minutes * 60;
    },
    adjustTimerDuration: () => {
      const { currentState, focusModeTimer, breakModeTimer } = get();
      const activeTimer =
        currentState === FocusModeStates.Study
          ? focusModeTimer
          : breakModeTimer;

      set({ timerDuration: get().calculateTimerDuration(activeTimer) });
    },
    setFocusModeDuration: (time: Timer) => {
      set({ focusModeTimer: time });
      if (get().currentState === FocusModeStates.Study) {
        set({ timerDuration: get().calculateTimerDuration(time) });
      }
    },
    setBreakModeDuration: (time: Timer) => {
      set({ breakModeTimer: time });
      if (get().currentState === FocusModeStates.Break) {
        set({ timerDuration: get().calculateTimerDuration(time) });
      }
    },
  }))
);

export default useFocusModeStore;
