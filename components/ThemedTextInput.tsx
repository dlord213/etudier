import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

interface ThemedTextInputProps extends TextInputProps {
  placeholderText: string;
  onChangeText?: (text: string) => void;
  value?: string | undefined;
  style?: StyleProp<TextStyle>;
  editable?: boolean;
}

export default function ThemedTextInput({
  placeholderText,
  onChangeText,
  value,
  style,
  editable = true,
}: ThemedTextInputProps) {
  const { palette, isDarkMode } = useThemeStore();

  return (
    <TextInput
      editable={editable}
      placeholder={placeholderText}
      onChangeText={onChangeText}
      value={value}
      style={[
        style,
        {
          color: isDarkMode
            ? Colors.Text_Dark.Default
            : Colors.Text_Light.Default,
        },
      ]}
      placeholderTextColor={Colors[palette][300]}
      cursorColor={Colors[palette][600]}
      selectionColor={Colors[palette][600]}
      selectionHandleColor={Colors[palette][600]}
    />
  );
}
