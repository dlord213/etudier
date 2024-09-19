import { Pressable } from "react-native";
import { forwardRef } from "react";
import ThemedPressableOpacityProps from "@/constants/ThemedPressableOpacityProps";

const ThemedPressableOpacity = forwardRef<any, ThemedPressableOpacityProps>(
  (props, ref) => {
    const { children, style, backgroundColor, color, onPress, ...rest } = props;

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: backgroundColor,
            color: color,
            opacity: pressed ? 0.7 : 1,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Pressable>
    );
  }
);

export default ThemedPressableOpacity;
