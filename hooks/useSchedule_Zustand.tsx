import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { create } from "zustand";

interface ScheduleForm {
  id: Date;
  title: string;
  recurringSchedule: boolean;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
}

interface ScheduleStoreInterface {
  form: ScheduleForm;
  isEndTimeEnabled: boolean;
  setScheduleForm: (updatedForm: ScheduleForm) => void;
  setIsEndTimeEnabled: (enabled: boolean) => void;
  updateTitle: (newTitle: string) => void;
  updateStartDate: (newDate: Date) => void;
  updateStartTime: (newTime: Date) => void;
  updateEndDate: (newDate: Date) => void;
  updateEndTime: (newTime: Date) => void;
  openStartDate: () => void;
  resetForm: () => void;
}

const useSchedule = create<ScheduleStoreInterface>()((set) => ({
  form: {
    id: new Date(),
    title: "",
    recurringSchedule: false,
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
  },
  isEndTimeEnabled: false,
  setScheduleForm: (updatedForm: ScheduleForm) =>
    set((state: any) => ({
      form: { ...state.form, ...updatedForm },
    })),
  updateTitle: (newTitle: string) =>
    set((state: any) => ({
      form: { ...state.form, title: newTitle },
    })),
  updateStartDate: (newDate: Date) =>
    set((state: any) => ({
      form: {
        ...state.form,
        startDate: newDate instanceof Date ? newDate : new Date(newDate),
      },
    })),
  updateStartTime: (newTime: Date) =>
    set((state: any) => ({
      form: {
        ...state.form,
        startTime: newTime instanceof Date ? newTime : new Date(newTime),
      },
    })),
  updateEndDate: (newDate: Date) =>
    set((state: any) => ({
      form: {
        ...state.form,
        endDate: newDate instanceof Date ? newDate : new Date(newDate),
      },
    })),
  updateEndTime: (newDate: Date) =>
    set((state: any) => ({
      form: {
        ...state.form,
        endTime: newDate instanceof Date ? newDate : new Date(newDate),
      },
    })),
  setIsEndTimeEnabled: (enabled: boolean) => set({ isEndTimeEnabled: enabled }),
  openStartDate: () => {
    DateTimePickerAndroid.open({
      value: useSchedule.getState().form.startDate,
      onChange: (e, selectedDate) => {
        if (selectedDate) {
          useSchedule.getState().updateStartDate(selectedDate);
        }
      },
      mode: "date",
      is24Hour: false,
    });
  },
  openStartTime: () => {
    DateTimePickerAndroid.open({
      value: useSchedule.getState().form.startTime,
      onChange: (e, selectedTime) => {
        if (selectedTime) {
          useSchedule.getState().updateStartTime(selectedTime);
        }
      },
      mode: "time",
      is24Hour: false,
    });
  },
  openEndDate: () => {
    DateTimePickerAndroid.open({
      value: useSchedule.getState().form.endDate,
      onChange: (e, selectedDate) => {
        if (selectedDate) {
          useSchedule.getState().updateEndDate(selectedDate);
        }
      },
      mode: "date",
      is24Hour: false,
    });
  },
  openEndTime: () => {
    DateTimePickerAndroid.open({
      value: useSchedule.getState().form.endTime,
      onChange: (e, selectedTime) => {
        if (selectedTime) {
          useSchedule.getState().updateEndTime(selectedTime);
        }
      },
      mode: "time",
      is24Hour: false,
    });
  },
  resetForm: () =>
    set({
      form: {
        id: new Date(),
        title: "",
        recurringSchedule: false,
        startDate: new Date(),
        startTime: new Date(),
        endDate: new Date(),
        endTime: new Date(),
      },
    }),
}));

export default useSchedule;
