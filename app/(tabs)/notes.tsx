import { useContext, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { BottomSheetMethods } from "@devvie/bottom-sheet";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

import ThemedPressable from "@/components/ThemedPressable";
import ThemedText from "@/components/ThemedText";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";
import ThemeContext from "@/contexts/ThemeContext";
import TabBarVisibilityContext from "@/contexts/TabBarVisibilityContext";
import Colors from "@/constants/Colors";
import styles from "@/styles/tabs_notes";
import ThemedModalTextInput from "@/components/ThemedModalTextInput";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);
  const { setIsTabBarVisible } = useContext(TabBarVisibilityContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPriority, setIsPriority] = useState(false);

  const styleState = styles(theme);

  const sheetRef = useRef<BottomSheetMethods>(null);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText text="Notes" style={styleState.headingTextStyle} />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <ThemedPressable
          children={
            <>
              <ThemedText
                text="All"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </>
          }
          backgroundColor={Colors[palette][200]}
        />
        <ThemedPressable
          children={
            <>
              <ThemedText
                text="Priority"
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
      <Pressable
        onPress={() => {
          sheetRef.current?.open();
        }}
        style={({ pressed }) => [
          {
            bottom: 100,
            position: "absolute",
            right: 40,
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 8,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <FontAwesome6 name="add" size={16} color={Colors.Text_Dark.Default} />
      </Pressable>
      <ThemedBottomSheetModal
        onClose={() => {
          setTimeout(() => {
            setIsTabBarVisible(true);
            setIsPriority(false);
            setDescription("");
            setTitle("");
          }, 200);
        }}
        onOpen={() => {
          setIsTabBarVisible(false);
        }}
        ref={sheetRef}
      >
        <View style={{ marginBottom: 8 }}>
          <ThemedModalTextInput
            onChangeText={setTitle}
            value={title}
            placeholder="Title"
          />
          <ThemedModalTextInput
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
            style={{ fontFamily: "WorkSans_400Regular", fontSize: 14 }}
          />
        </View>
        <View
          style={[
            styleState.borderStyle,
            { borderColor: Colors[palette][600] },
          ]}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            display: !title ? "none" : "flex",
          }}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Checkbox
              value={isPriority}
              onValueChange={setIsPriority}
              color={Colors[palette][600]}
              style={{ borderRadius: 4 }}
            />
            <ThemedText
              text="Priority"
              style={{ fontFamily: "WorkSans_400Regular" }}
              color="secondary"
            />
          </View>
          <Pressable
            onPress={() => {
              sheetRef.current?.open();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: Colors[palette][600],
                padding: 8,
                borderRadius: 8,
                opacity: pressed ? 0.8 : 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <Ionicons name="send" size={16} color={Colors.Text_Dark.Default} />
          </Pressable>
        </View>
      </ThemedBottomSheetModal>
    </SafeAreaView>
  );
}
