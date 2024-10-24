import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import { Text, TextStyle } from "react-native";

interface ThemedTextProps {
  text: string;
  style?: TextStyle;
  color?: string;
  inverted?: boolean;
}

export default function ThemedText({
  text,
  style,
  color = "Default",
  inverted = false,
}: ThemedTextProps) {
  const { isDarkMode } = useThemeStore();

  const textColor = !inverted
    ? isDarkMode
      ? Colors.Text_Dark[color]
      : Colors.Text_Light[color]
    : isDarkMode
    ? Colors.Text_Light[color]
    : Colors.Text_Dark[color];

  return (
    <Text
      style={[
        {
          fontFamily: "WorkSans_400Regular",
          color: textColor,
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
}
