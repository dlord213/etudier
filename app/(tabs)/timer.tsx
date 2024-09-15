import { useContext, useState, useEffect, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalRef.current as NodeJS.Timeout);

            if (!isBreak) {
              setIsBreak(true);
              setTimer(5 * 60);
              startTimer();
            } else {
              setIsBreak(false);
              setTimer(25 * 60);
            }

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
    </SafeAreaView>
  );
}

const styles = (context: any) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:
        context != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      gap: 16,
    },
    headingTextStyle: {
      fontFamily: "WorkSans_700Bold",
      textAlign: "center",
      fontSize: 36,
    },
  });
