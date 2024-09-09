import { Pressable, useColorScheme, PressableProps } from "react-native";
import { forwardRef } from "react";

interface ThemedPressableProps extends PressableProps {
  children: React.ReactNode;
  backgroundColor: string;
  style?: ViewStyle;
}

const ThemedPressable = forwardRef<any, ThemedPressableProps>((props, ref) => {
  const themeMode = useColorScheme();
  const { children, style, backgroundColor, onPress, ...rest } = props;

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      style={({ pressed }) => [
        {
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: backgroundColor,
          opacity: pressed ? 0.7 : 1,
          borderRadius: 16,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
});

export default ThemedPressable;
