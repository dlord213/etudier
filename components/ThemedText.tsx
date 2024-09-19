import { Text } from "react-native";
import { useContext } from "react";

import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import ThemedTextProps from "@/constants/ThemedTextProps";

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
