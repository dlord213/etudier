import { Pressable, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useFocusModeStore, { FocusModeStates } from "@/hooks/useFocusModeStore";

export default function StudyFocusModeCompletedSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const {
    toggleIsOnBreakMode,
    toggleIsSheetIconVisible,
    setFocusModeState,
    adjustTimerDuration,
  } = useFocusModeStore();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
    >
      <View style={{ padding: 16 }}>
        <View>
          <View style={{ marginBottom: 16 }}>
            <ThemedText
              text="Focus mode is up!"
              style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
            />
            <ThemedText text="Time for a break!" color="Tertiary" />
          </View>
          <View style={{ gap: 16 }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? Colors[palette][500]
                    : Colors[palette][400],
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 8,
                },
              ]}
              onPress={() => {
                toggleIsOnBreakMode();
                toggleIsSheetIconVisible(false);
                setFocusModeState(FocusModeStates.Break);
                adjustTimerDuration();
                SheetManager.hide("focus-mode-study-completed-sheet");
              }}
            >
              <Text
                style={{
                  fontFamily: "WorkSans_700Bold",
                  color: Colors.Text_Dark.Default,
                  textAlign: "center",
                }}
              >
                Start break mode
              </Text>
            </Pressable>
            <ThemedText
              text="Don't wanna start it yet? If you wanna start it, simply tap the hourglass icon for this to pop-up."
              color="Tertiary"
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}
