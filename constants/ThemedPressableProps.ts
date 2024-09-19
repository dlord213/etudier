import { PressableProps } from "react-native";

interface ThemedPressableProps extends PressableProps {
  children: React.ReactNode;
  backgroundColor: string;
  style?: ViewStyle;
}

export default ThemedPressableProps;
