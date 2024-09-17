import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ThemedPressable from "@/components/ThemedPressable";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText
        text="Tasks"
        style={[styleState.headingTextStyle, { textAlign: "center" }]}
      />
      <View
        style={[
          styleState.cardStyle,
          { backgroundColor: Colors[palette][600] },
        ]}
      >
        <View>
          <ThemedText
            text="Number of tasks completed"
            style={styleState.cardBodyTextStyle}
          />
          <ThemedText text="0" style={styleState.cardHeadingTextStyle} />
        </View>

        <FontAwesome5
          name="clipboard-check"
          size={48}
          color={Colors.Text_Dark.Default}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <ThemedPressable
          style={{ paddingHorizontal: 24 }}
          children={
            <>
              <AntDesign name="star" size={16} color={Colors[palette][600]} />
            </>
          }
          backgroundColor={Colors[palette][200]}
        />
        <ThemedPressable
          children={
            <>
              <ThemedText
                text="Tasks"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </>
          }
          backgroundColor={Colors[palette][200]}
        />
      </View>
    </SafeAreaView>
  );
}

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
  });
