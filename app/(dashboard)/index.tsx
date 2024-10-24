import Colors from "@/constants/Colors";
import {
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef } from "react";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useModalSheetStore from "@/hooks/useModalSheetStore";

export default function Page() {
  const { palette, isDarkMode } = useThemeStore();
  const { setIsModalOpen } = useModalSheetStore();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const invertedIconColor = isDarkMode
    ? Colors.Text_Light.Default
    : Colors.Text_Dark.Default;

  const taskModalRef = useRef<BottomSheetMethods>(null);
  const styleState = styles(isDarkMode);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 32 }}
          text="Tasks"
        />
        <Pressable onPress={() => router.push("/user")}>
          <FontAwesome name="user-circle-o" size={24} color={iconColor} />
        </Pressable>
      </View>
      <Pressable
        style={{
          backgroundColor: Colors[palette][600],
          padding: 16,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <ThemedText
            text="Number of tasks completed"
            inverted={isDarkMode ? false : true}
          />
          <ThemedText
            text="XXXX"
            style={{ fontFamily: "WorkSans_700Bold", fontSize: 28 }}
            inverted={isDarkMode ? false : true}
          />
        </View>
        <MaterialCommunityIcons
          name="clipboard-check-multiple-outline"
          size={48}
          color={Colors.Text_Dark.Default}
        />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="Today"
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="Tomorrow"
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="Upcoming"
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
        />
      </View>
      <Pressable
        onPress={() => {
          taskModalRef.current?.open();
          setIsModalOpen();
        }}
        style={{
          padding: 16,
          backgroundColor: isDarkMode ? Colors.Text_Dark.Secondary : "#F4F4F4",
          borderRadius: 16,
          position: "absolute",
          bottom: 12,
          left: 8,
          width: screenWidth - 24,
        }}
      >
        <ThemedText text="I want to..." color="Tertiary" />
      </Pressable>
      <BottomSheet
        ref={taskModalRef}
        height={screenHeight / 4}
        disableKeyboardHandling
        onClose={setIsModalOpen}
      >
        <View style={{ paddingVertical: 8, paddingHorizontal: 16, gap: 12 }}>
          <TextInput
            placeholder="Title"
            style={{ fontFamily: "WorkSans_700Bold", fontSize: 32 }}
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.Backgrounds_Light.Brand,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AntDesign name="calendar" size={28} color={iconColor} />
            <AntDesign
              name="plussquare"
              size={32}
              color={Colors[palette][600]}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      padding: 16,
      gap: 8,
    },
  });
