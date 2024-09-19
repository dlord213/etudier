import { TextProps } from "react-native";

interface ThemedTextProps extends TextProps {
  style: TextStyle;
  text: string;
  id?: any;
  color?: string;
}

export default ThemedTextProps;
