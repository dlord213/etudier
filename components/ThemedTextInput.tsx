import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import {
  StyleProp,
  TextInput,
  TextInputAndroidProps,
  TextStyle,
} from "react-native";

interface ThemedTextInputProps extends TextInputAndroidProps {
  placeholderText: string;
  onChangeText?: (text: string) => void;
  value?: string | undefined;
  style: StyleProp<TextStyle>;
}

export default function ThemedTextInput({
  placeholderText,
  onChangeText,
  value,
  style,
}: ThemedTextInputProps) {
  const { palette, isDarkMode } = useThemeStore();

  return (
    <TextInput
      placeholder={placeholderText}
      onChangeText={onChangeText}
      value={value}
      style={[
        {
          color: isDarkMode
            ? Colors.Text_Dark.Default
            : Colors.Text_Light.Default,
        },
        style,
      ]}
      placeholderTextColor={Colors[palette][300]}
      cursorColor={Colors[palette][600]}
      selectionColor={Colors[palette][600]}
      selectionHandleColor={Colors[palette][600]}
    />
  );
}
