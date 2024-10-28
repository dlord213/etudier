import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

interface ThemedTextInputProps extends TextInputProps {
  placeholderText: string;
  onChangeText?: (text: string) => void;
  value?: string | undefined;
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  inverted?: boolean;
}

export default function ThemedTextInput({
  placeholderText,
  onChangeText,
  value,
  style,
  editable = true,
  inverted = false,
}: ThemedTextInputProps) {
  const { palette, isDarkMode } = useThemeStore();

  const textColor = !inverted
    ? isDarkMode
      ? Colors.Text_Dark.Default
      : Colors.Text_Light.Default
    : isDarkMode
    ? Colors.Text_Light.Default
    : Colors.Text_Dark.Default;

  return (
    <TextInput
      editable={editable}
      placeholder={placeholderText}
      onChangeText={onChangeText}
      value={value}
      style={[
        style,
        {
          backgroundColor: isDarkMode
            ? Colors.Backgrounds_Dark.Brand
            : Colors.Backgrounds_Light.Brand,
          color: textColor,
        },
      ]}
      placeholderTextColor={Colors[palette][300]}
      cursorColor={Colors[palette][600]}
      selectionColor={Colors[palette][600]}
      selectionHandleColor={Colors[palette][600]}
    />
  );
}
