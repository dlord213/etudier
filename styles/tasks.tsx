import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const styles = (context: any) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:
        context != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      gap: 16,
    },
    headingTextStyle: {
      fontFamily: "WorkSans_700Bold",
      textAlign: "center",
      fontSize: 36,
    },
    cardBodyTextStyle: {
      color: Colors.Text_Dark.Default,
      fontFamily: "WorkSans_400Regular",
      fontSize: 12,
    },
    cardHeadingTextStyle: {
      color: Colors.Text_Dark.Default,
      fontFamily: "WorkSans_700Bold",
      fontSize: 24,
    },
    cardStyle: {
      flexDirection: "row",
      padding: 16,
      borderRadius: 16,
      justifyContent: "space-between",
      alignItems: "center",
    },
    textInputStyle: {
      fontFamily: "WorkSans_400Regular",
      fontSize: 14,
      color:
        context == "dark"
          ? Colors.Text_Dark.Tertiary
          : Colors.Text_Light.Tertiary,
    },
    borderStyle: {
      borderWidth: 0.5,
      borderRadius: 16,
      marginVertical: 8,
    },
  });

export default styles;
