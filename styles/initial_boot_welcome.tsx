import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = (context: any) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:
        context != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      justifyContent: "flex-end",
      gap: 16,
    },
  });

export default styles;
