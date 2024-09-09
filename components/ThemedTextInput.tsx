import { TextInput, TextInputProps, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

interface ThemedTextInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  style?: any;
}

export default function ThemedTextInput({
  onChangeText,
  value,
  style,
  placeholder = "Placeholder",
  keyboardType = "default",
}: ThemedTextInputProps) {
  const themeMode = useColorScheme();

  return (
    <TextInput
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={
        themeMode != "light"
          ? Colors.Text_Dark.Tertiary
          : Colors.Text_Light.Tertiary
      }
      style={[
        {
          backgroundColor:
            themeMode != "light"
              ? Colors.Backgrounds_Dark.Hover
              : Colors.Text_Light.Default,
          borderRadius: 16,
          padding: 16,
          fontFamily: "WorkSans_400Regular",
          color:
            themeMode != "light"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default,
        },
        style,
      ]}
      cursorColor={
        themeMode != "light"
          ? Colors.Text_Dark.Default
          : Colors.Text_Light.Default
      }
    />
  );
}
