import { useContext, useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetMethods } from "@devvie/bottom-sheet";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import ThemedPressableOpacity from "@/components/ThemedPressableOpacity";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";
import styles from "@/styles/activity_log";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  const sheetRef = useRef<BottomSheetMethods>(null);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText text="Activity Log" style={styleState.headingTextStyle} />
        <ThemedPressableOpacity
          onPress={() => {
            sheetRef.current?.open();
          }}
        >
          <Ionicons
            name="filter"
            size={24}
            color={
              theme == "dark"
                ? Colors.Text_Dark.Default
                : Colors.Text_Light.Default
            }
          />
        </ThemedPressableOpacity>
      </View>
      <ThemedBottomSheetModal height="20%" ref={sheetRef}>
        <View style={{ gap: 8 }}>
          <ThemedPressableOpacity style={{ flexDirection: "row", gap: 8 }}>
            <AntDesign
              name="arrowdown"
              size={24}
              color={Colors[palette][600]}
            />
            <ThemedText
              text="Descending"
              style={{ fontFamily: "WorkSans_400Regular" }}
            />
          </ThemedPressableOpacity>
          <ThemedPressableOpacity style={{ flexDirection: "row", gap: 8 }}>
            <AntDesign name="arrowup" size={24} color={Colors[palette][600]} />
            <ThemedText
              text="Ascending"
              style={{ fontFamily: "WorkSans_400Regular" }}
            />
          </ThemedPressableOpacity>
        </View>
      </ThemedBottomSheetModal>
    </SafeAreaView>
  );
}
