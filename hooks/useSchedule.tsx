import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function useSchedule() {
  const [scheduleForm, setScheduleForm] = useState({
    id: new Date(),
    title: "",
    recurringSchedule: false,
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
  });

  const [isEndTimeEnabled, setIsEndTimeEnabled] = useState(false);

  const handleTitleChange = (newTitle: any) => {
    setScheduleForm((prevSched: any) => ({
      ...prevSched,
      title: newTitle,
    }));
  };

  const handleStartDateChange = (newDate: any) => {
    const formattedDate = newDate instanceof Date ? newDate : new Date(newDate);

    setScheduleForm((prevSched: any) => ({
      ...prevSched,
      startDate: formattedDate,
    }));
  };

  const startDateOnChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      handleStartDateChange(selectedDate);
    }
  };

  const handleStartDatePress = () => {
    DateTimePickerAndroid.open({
      value: scheduleForm.startDate,
      onChange: startDateOnChange,
      mode: "date",
      is24Hour: true,
      minimumDate: new Date(),
    });
  };

  const handleStartTimeChange = (newDate: any) => {
    const formattedTime = newDate instanceof Date ? newDate : new Date(newDate);

    setScheduleForm((prevSched: any) => ({
      ...prevSched,
      startTime: formattedTime,
    }));
  };

  const startTimeOnChange = (event: any, selectedTime: any) => {
    if (selectedTime) {
      handleStartTimeChange(selectedTime);
    }
  };

  const handleStartTimePress = () => {
    DateTimePickerAndroid.open({
      value: scheduleForm.startTime,
      onChange: startTimeOnChange,
      mode: "time",
      is24Hour: false,
    });
  };

  const handleEndDateChange = (newDate: any) => {
    const formattedDate = newDate instanceof Date ? newDate : new Date(newDate);

    setScheduleForm((prevSched: any) => ({
      ...prevSched,
      enDate: formattedDate,
    }));
  };

  const endDateOnChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      handleEndDateChange(selectedDate);
    }
  };

  const handleEndDatePress = () => {
    DateTimePickerAndroid.open({
      value: scheduleForm.endDate,
      onChange: endDateOnChange,
      mode: "date",
      is24Hour: true,
      minimumDate: new Date(),
    });
  };

  const handleEndTimeChange = (newDate: any) => {
    const formattedTime = newDate instanceof Date ? newDate : new Date(newDate);

    setScheduleForm((prevSched: any) => ({
      ...prevSched,
      endTime: formattedTime,
    }));
  };

  const endTimeOnChange = (event: any, selectedTime: any) => {
    if (selectedTime) {
      handleEndTimeChange(selectedTime);
    }
  };

  const handleEndTimePress = () => {
    DateTimePickerAndroid.open({
      value: scheduleForm.endTime,
      onChange: endTimeOnChange,
      mode: "time",
      is24Hour: false,
    });
  };

  const resetScheduleForm = () => {
    setScheduleForm({
      id: new Date(),
      title: "",
      recurringSchedule: false,
      startDate: new Date(),
      startTime: new Date(),
      endDate: new Date(),
      endTime: new Date(),
    });
  };

  return {
    scheduleForm,
    setScheduleForm,
    isEndTimeEnabled,
    setIsEndTimeEnabled,
    handleTitleChange,
    handleStartDateChange,
    startDateOnChange,
    handleStartDatePress,
    handleStartTimeChange,
    startTimeOnChange,
    handleStartTimePress,
    handleEndDateChange,
    endDateOnChange,
    handleEndDatePress,
    handleEndTimeChange,
    endTimeOnChange,
    handleEndTimePress,
    resetScheduleForm,
  };
}
