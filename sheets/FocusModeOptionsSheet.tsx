import { Pressable, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { TimerPickerModal } from "react-native-timer-picker";
import { useState } from "react";
import { toast } from "sonner-native";

import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

export default function FocusModeOptionsSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { session } = useAuthStore();

  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState<
    string | null
  >(null);
  const [modalTitle, setModalTitle] = useState<string>("")

  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];

    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
      onClose={() => {
      }}
    >
      <View style={{ padding: 16, gap: 12 }}>
        <View>
          <ThemedText
            text="Options"
            style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          />
          <ThemedText text="Customize your focus mode!" color="Tertiary" />
        </View>
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 16,
          }}
          onPress={() => {
            SheetManager.hide("focus-mode-options-sheet");
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Set focus mode time
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 16,
          }}
          onPress={async () => {
            setShowPicker(true)
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Set break mode time
          </Text>
        </Pressable>
        <TimerPickerModal
          visible={showPicker}
          setIsVisible={setShowPicker}
          onConfirm={(pickedDuration) => {
            console.log(pickedDuration)
            setAlarmString(formatTime(pickedDuration));
            setShowPicker(false);
          }}
          disableInfiniteScroll
          modalTitle={modalTitle}
          onCancel={() => setShowPicker(false)}
          closeOnOverlayPress
          styles={{
            theme: isDarkMode ? "dark" : "light",
          }}
          modalProps={{
            overlayOpacity: 0.4,
          }}
          hideHours
        />
      </View>
    </ActionSheet>
  );
}
