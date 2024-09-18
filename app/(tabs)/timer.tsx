import { useContext } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import styles from "@/styles/tabs_timer";
import useTimer from "@/hooks/useTimer";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  const [timer, formatTime, startTimer, pauseTimer, isRunning, isBreak] =
    useTimer();

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View
          style={{
            width: "49%",
            height: 8,
            backgroundColor:
              isRunning && !isBreak
                ? Colors[palette][600]
                : Colors.Backgrounds_Dark.Hover,
            borderRadius: 16,
          }}
        />
        <View
          style={{
            width: "49%",
            height: 8,
            backgroundColor: isBreak
              ? Colors[palette][600]
              : Colors.Backgrounds_Dark.Hover,
            borderRadius: 16,
          }}
        />
      </View>
      <ThemedText
        text={
          isRunning
            ? isBreak
              ? "Enjoy your break!"
              : "Study well."
            : "Pomodoro Timer"
        }
        style={{ fontFamily: "WorkSans_400Regular" }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <ThemedText
          text={formatTime(timer)} // Display formatted time
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 36 }}
        />

        {!isRunning ? (
          <>
            {/* Play Button */}
            <Pressable
              onPress={startTimer}
              style={({ pressed }) => [
                {
                  backgroundColor: Colors.Backgrounds_Dark.Hover,
                  paddingHorizontal: 32,
                  paddingVertical: 12,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <FontAwesome5
                name="play"
                size={24}
                color={Colors[palette][400]}
              />
            </Pressable>
          </>
        ) : (
          <>
            {/* Pause Button */}
            <Pressable
              onPress={pauseTimer}
              style={({ pressed }) => [
                {
                  backgroundColor: Colors.Backgrounds_Dark.Hover,
                  paddingHorizontal: 32,
                  paddingVertical: 12,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <FontAwesome5
                name="pause"
                size={24}
                color={Colors[palette][400]}
              />
            </Pressable>
          </>
        )}
      </View>
      <StatusBar style={theme == "dark" ? "dark" : "inverted"} />
    </SafeAreaView>
  );
}
