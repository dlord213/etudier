import { useContext } from "react";
import { StyleSheet, TextInput } from "react-native";

import ThemedTextInputProps from "@/constants/ThemedTextInputProps";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";

export default function ThemedModalTextInput({
  onChangeText,
  value,
  style,
  placeholder = "Placeholder",
  keyboardType = "default",
  multiline = true,
}: ThemedTextInputProps) {
  const { theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  return (
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      inputMode="text"
      multiline={multiline}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={
        theme == "dark" ? Colors.Text_Dark.Tertiary : Colors.Text_Light.Tertiary
      }
      style={[styleState.textInputTitleStyle, style]}
    />
  );
}
const styles = (context: any) =>
  StyleSheet.create({
    textInputTitleStyle: {
      fontFamily: "WorkSans_700Bold",
      fontSize: 16,
      color:
        context == "dark"
          ? Colors.Text_Dark.Tertiary
          : Colors.Text_Light.Tertiary,
    },
  });
