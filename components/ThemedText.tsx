import { Text, TextProps, TextStyle } from "react-native";
import Colors from "@/constants/Colors";
import { useContext } from "react";
import ThemeContext from "@/contexts/ThemeContext";

interface ThemedTextProps extends TextProps {
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
  const { theme } = useContext(ThemeContext);

  let textColor;

  if (color == "primary") {
    textColor =
      theme != "light" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;
  } else if (color == "secondary") {
    textColor =
      theme != "light"
        ? Colors.Text_Dark.Secondary
        : Colors.Text_Light.Secondary;
  } else if (color == "tertiary") {
    textColor =
      theme != "light" ? Colors.Text_Dark.Tertiary : Colors.Text_Light.Tertiary;
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
