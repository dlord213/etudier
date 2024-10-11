import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function useSettings() {
  const [noteSettings, setNoteSettings] = useState({
    autoSaveOnClose: false,
  });

  const [isNoteSettingsFetched, setIsNoteSettingsFetched] = useState(false);

  const getNoteSettings = async () => {
    let result = await AsyncStorage.getItem("@noteSettings");
    if (result) {
      setNoteSettings(JSON.parse(result));
    } else {
      setNoteSettings({
        autoSaveOnClose: false,
      });
    }
    setIsNoteSettingsFetched(true);
  };

  const saveNoteSettings = async () => {
    await AsyncStorage.setItem("@noteSettings", JSON.stringify(noteSettings));
  };

  useEffect(() => {
    if (!isNoteSettingsFetched) {
      getNoteSettings();
    }
  }, []);

  return {
    noteSettings,
    isNoteSettingsFetched,
    setNoteSettings,
    saveNoteSettings,
  };
}
