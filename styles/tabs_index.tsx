import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = (context: any) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:
        context[0] != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      gap: 16,
    },
    headingBoldTextStyle: {
      fontFamily: "WorkSans_600SemiBold",
      fontSize: 24,
    },
    headingTertiaryTextStyle: {
      fontFamily: "WorkSans_400Regular",
      fontSize: 14,
    },
    cardHeadingTextStyle: {
      color: Colors.Text_Dark.Default,
      fontFamily: "WorkSans_700Bold",
      fontSize: 24,
    },
    cardBodyTextStyle: {
      color: Colors.Text_Dark.Default,
      fontFamily: "WorkSans_400Regular",
      fontSize: 12,
    },
    cardStyle: {
      flexDirection: "row",
      padding: 16,
      borderRadius: 16,
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

export default styles;
