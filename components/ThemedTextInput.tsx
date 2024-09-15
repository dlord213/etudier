import { TextInput, TextInputProps } from "react-native";
import Colors from "@/constants/Colors";
import { useContext } from "react";
import ThemeContext from "@/contexts/ThemeContext";

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
  const { theme } = useContext(ThemeContext);

  return (
    <TextInput
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
          backgroundColor:
            theme != "light"
              ? Colors.Backgrounds_Dark.Hover
              : Colors.Text_Light.Default,
          borderRadius: 16,
          padding: 16,
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
