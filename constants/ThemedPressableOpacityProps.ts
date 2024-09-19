import { PressableProps, ViewStyle } from "react-native";

interface ThemedPressableOpacityProps extends PressableProps {
  children: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  style?: ViewStyle;
}

export default ThemedPressableOpacityProps;
