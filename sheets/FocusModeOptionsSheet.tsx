import { Pressable, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { TimerPickerModal } from "react-native-timer-picker";
import { useState } from "react";
import { toast } from "sonner-native";

import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useFocusModeStore from "@/hooks/useFocusModeStore";

export default function FocusModeOptionsSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { session } = useAuthStore();
  const {
    setBreakModeDuration,
    setFocusModeDuration,
    toggleIsPlaying,
    isPlaying,
  } = useFocusModeStore();

  const [showBreakModePicker, setShowBreakModePicker] = useState(false);
  const [showFocusModePicker, setShowFocusModePicker] = useState(false);

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
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
          onPress={async () => {
            setShowFocusModePicker(true);
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
            setShowBreakModePicker(true);
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
        {/* BREAK MODE */}
        <TimerPickerModal
          visible={showBreakModePicker}
          setIsVisible={setShowBreakModePicker}
          onConfirm={(duration) => {
            setBreakModeDuration(duration);
            setShowBreakModePicker(false);
          }}
          disableInfiniteScroll
          modalTitle={"Set break time"}
          onCancel={() => setShowBreakModePicker(false)}
          closeOnOverlayPress
          styles={{
            theme: isDarkMode ? "dark" : "light",
          }}
          modalProps={{
            overlayOpacity: 0.4,
          }}
          hideHours
          hideSeconds
        />
        {/* BREAK MODE */}

        {/* FOCUS MODE */}
        <TimerPickerModal
          visible={showFocusModePicker}
          setIsVisible={setShowFocusModePicker}
          onConfirm={(duration) => {
            setFocusModeDuration(duration);
            setShowFocusModePicker(false);
          }}
          disableInfiniteScroll
          modalTitle={"Set focus time"}
          onCancel={() => setShowFocusModePicker(false)}
          closeOnOverlayPress
          styles={{
            theme: isDarkMode ? "dark" : "light",
          }}
          modalProps={{
            overlayOpacity: 0.4,
          }}
          hideHours
          hideSeconds
        />
        {/* FOCUS MODE */}
      </View>
    </ActionSheet>
  );
}
