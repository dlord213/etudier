import { useContext, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetMethods } from "@devvie/bottom-sheet";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ThemedPressable from "@/components/ThemedPressable";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";

import styles from "@/styles/tasks";
import ThemedModalTextInput from "@/components/ThemedModalTextInput";

export default function Index() {
  const { palette, theme } = useContext(ThemeContext);
  const styleState = styles(theme);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const sheetRef = useRef<BottomSheetMethods>(null);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={{ flexDirection: "row" }}>
        <ThemedText
          text="Tasks"
          style={[styleState.headingTextStyle, { textAlign: "center" }]}
        />
      </View>
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
      <Pressable
        onPress={() => {
          sheetRef.current?.open();
        }}
        style={({ pressed }) => [
          {
            bottom: 25,
            position: "absolute",
            right: 25,
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
            setDescription("");
            setTitle("");
          }, 200);
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
