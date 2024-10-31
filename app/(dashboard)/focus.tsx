import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { SheetManager } from "react-native-actions-sheet";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import useFocusModeStore, { FocusModeStates } from "@/hooks/useFocusModeStore";

export default function Page() {
  const { isDarkMode, isOLEDMode, palette } = useThemeStore();
  const {
    currentState,
    timerDuration,
    isPlaying,
    isOnBreakMode,
    toggleIsPlaying,
    toggleIsOnBreakMode,
    toggleIsOnFocusMode,
    toggleIsSheetIconVisible,
    isSheetIconVisible,
  } = useFocusModeStore();

  const styleState = styles(isDarkMode, isOLEDMode);

  const textColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 32 }}
          text={
            currentState == FocusModeStates.Study ? "Focus Mode" : "Break Mode"
          }
        />
        {isSheetIconVisible ? (
          <FontAwesome
            name="hourglass-1"
            size={24}
            color={iconColor}
            onPress={() => {
              SheetManager.show("focus-mode-study-completed-sheet");
            }}
          />
        ) : null}
      </View>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <View
          style={{
            flex: 1,
            height: 4,
            borderRadius: 8,
            backgroundColor: Colors[palette][600],
          }}
        />
        <View
          style={{
            flex: 1,
            height: 4,
            borderRadius: 8,
            backgroundColor: Colors.Text_Dark.Secondary,
          }}
        />
      </View>
      {isOnBreakMode ? <ThemedText text="Take a break!" /> : null}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <CountdownCircleTimer
          strokeWidth={8}
          trailStrokeWidth={0}
          isPlaying={isPlaying}
          duration={timerDuration}
          key={currentState}
          colors={[
            Colors[palette][500],
            Colors[palette][400],
            Colors[palette][300],
            Colors[palette][100],
          ]}
          colorsTime={[60, 20, 10, 5]}
          onComplete={() => {
            toggleIsSheetIconVisible(true);
            if (currentState == FocusModeStates.Study) {
              SheetManager.show("focus-mode-study-completed-sheet");
            } else {
              SheetManager.show("focus-mode-break-completed-sheet");
            }
          }}
        >
          {({ remainingTime }) => (
            <Text
              style={{
                fontFamily: "WorkSans_900Black",
                fontSize: 32,
                color: textColor,
              }}
            >
              {Math.floor((remainingTime % 3600) / 60)}:
              {(remainingTime % 60).toString().padStart(2, "0")}
            </Text>
          )}
        </CountdownCircleTimer>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? Colors[palette][500]
                : Colors[palette][600],
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            },
          ]}
          onPress={() => {
            toggleIsPlaying();
            if (currentState == FocusModeStates.Study) {
              toggleIsOnFocusMode();
            } else {
              toggleIsOnBreakMode();
            }
          }}
        >
          <FontAwesome5
            name={isPlaying ? "pause" : "play"}
            size={24}
            color={Colors.Text_Dark.Default}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = (isDarkMode: boolean, isOLEDMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? isOLEDMode
          ? "#000000"
          : Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      paddingHorizontal: 16,
      gap: 8,
    },
  });
