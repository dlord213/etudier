import { Pressable, PressableProps, ViewStyle } from "react-native";
import { forwardRef } from "react";

interface ThemedPressableOpacityProps extends PressableProps {
  children: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  style?: ViewStyle;
}

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
