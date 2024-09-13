import { Text, TextStyle, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

interface ThemedTextProps {
  style: TextStyle;
  text: string;
  id?: any;
  color?: string;
}

export default function ThemedText({
  style,
  text,
  id,
  color = "primary",
}: ThemedTextProps) {
  const themeMode = useColorScheme();

  let textColor;

  if (color == "primary") {
    textColor =
      themeMode != "light"
        ? Colors.Text_Dark.Default
        : Colors.Text_Light.Default;
  } else if (color == "secondary") {
    textColor =
      themeMode != "light"
        ? Colors.Text_Dark.Secondary
        : Colors.Text_Light.Secondary;
  } else if (color == "tertiary") {
    textColor =
      themeMode != "light"
        ? Colors.Text_Dark.Tertiary
        : Colors.Text_Light.Tertiary;
  }

  return (
    <Text
      style={[
        {
          color: textColor,
        },
        style,
      ]}
      id={id}
    >
      {text}
    </Text>
  );
}
