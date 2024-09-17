import React, { useContext, useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

import ThemeContext from "@/contexts/ThemeContext";
import Colors from "@/constants/Colors";

interface TabBarButtonProps {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  icon: (props: any) => JSX.Element;
}

export default function TabBarButton({
  isFocused,
  onPress,
  onLongPress,
  icon,
}: TabBarButtonProps) {
  const { palette, theme } = useContext(ThemeContext);

  const iconColor =
    theme != "dark" ? Colors[palette][500] : Colors[palette][100];
  const activeIconColor =
    theme != "dark" ? Colors[palette][200] : Colors[palette][500];

  const scale = useSharedValue(1);
  const translateY = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(isFocused ? 1.2 : 1, {
      duration: 500,
    });
    translateY.value = withTiming(isFocused ? -2 : 1, {
      duration: 200,
      easing: Easing.inOut(Easing.circle),
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Animated.View style={animatedStyle}>
        {icon({
          color: isFocused ? activeIconColor : iconColor,
        })}
      </Animated.View>
    </Pressable>
  );
}
