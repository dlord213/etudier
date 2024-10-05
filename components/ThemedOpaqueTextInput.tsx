import { TextInput } from "react-native";
import { useContext } from "react";

import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import ThemedTextInputProps from "@/constants/ThemedTextInputProps";

export default function ThemedOpaqueTextInput({
  onChangeText,
  value,
  style,
  placeholder = "Placeholder",
  keyboardType = "default",
  multiline = false,
}: ThemedTextInputProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <TextInput
      multiline={multiline}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={
        theme != "light"
          ? Colors.Text_Dark.Tertiary
          : Colors.Text_Light.Tertiary
      }
      style={[
        {
          fontFamily: "WorkSans_400Regular",
          color:
            theme != "light"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default,
        },
        style,
      ]}
      cursorColor={
        theme != "light" ? Colors.Text_Dark.Default : Colors.Text_Light.Default
      }
    />
  );
}
