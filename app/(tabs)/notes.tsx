import { useContext, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Checkbox from "expo-checkbox";
import { BottomSheetMethods } from "@devvie/bottom-sheet";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

import ThemeContext from "@/contexts/ThemeContext";
import TabBarVisibilityContext from "@/contexts/TabBarVisibilityContext";

import ThemedPressable from "@/components/ThemedPressable";
import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import NotesBottomSheetModal from "@/components/NotesBottomSheetModal";

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
      <ThemedText
        text="Notes"
        style={{
          fontFamily: "WorkSans_700Bold",
          textAlign: "center",
          fontSize: 36,
        }}
      />
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
      <NotesBottomSheetModal
        onClose={() => {
          setIsTabBarVisible(true);
          setTimeout(() => {
            setIsPriority(false);
            setDescription("");
            setTitle("");
          }, 500);
        }}
        onOpen={() => {
          setIsTabBarVisible(false);
        }}
        ref={sheetRef}
        style={{ padding: 16 }}
      >
        <View style={{ marginBottom: 8 }}>
          <TextInput
            placeholder="Title"
            inputMode="text"
            value={title}
            onChangeText={setTitle}
            multiline
            placeholderTextColor={
              theme == "dark"
                ? Colors.Text_Dark.Tertiary
                : Colors.Text_Light.Tertiary
            }
            style={{
              fontFamily: "WorkSans_700Bold",
              fontSize: 24,
              color:
                theme == "dark"
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default,
            }}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            inputMode="text"
            multiline
            placeholderTextColor={
              theme == "dark"
                ? Colors.Text_Dark.Tertiary
                : Colors.Text_Light.Tertiary
            }
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 14,
              color:
                theme == "dark"
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default,
            }}
          />
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: Colors[palette][600],
            borderRadius: 16,
            marginVertical: 8,
          }}
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
            <Ionicons
              name="send"
              size={16}
              color={
                theme == "dark"
                  ? Colors.Text_Dark.Default
                  : Colors.Text_Light.Default
              }
            />
          </Pressable>
        </View>
      </NotesBottomSheetModal>
    </SafeAreaView>
  );
}

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
  });
