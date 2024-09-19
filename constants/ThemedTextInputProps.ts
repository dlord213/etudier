import { TextInputProps } from "react-native";

interface ThemedTextInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  style?: any;
}

export default ThemedTextInputProps;
