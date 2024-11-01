import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect, useNavigation } from "expo-router";

import { startOfToday } from "date-fns";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useNoteStore from "@/hooks/useNoteStore";

export default function Page() {
  const { isDarkMode, isOLEDMode, palette } = useThemeStore();
  const { height: screenHeight } = useWindowDimensions();
  const { addNote, setTitle, setDescription, form, resetForm } = useNoteStore();

  const styleState = styles(isDarkMode, isOLEDMode);
  const navigation = useNavigation();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const [charCount, setCharCount] = useState(form.description.length);

  useFocusEffect(
    useCallback(() => {
      const handleBeforeRemove = (e) => {
        e.preventDefault();

        if (!form.title) {
          Alert.alert(
            "Unsaved changes",
            "To save a note, you must first enter a title.",
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "Discard",
                onPress: () => {
                  navigation.dispatch(e.data.action);
                },
                style: "destructive",
              },
            ]
          );
          return;
        }

        addNote();
        navigation.dispatch(e.data.action);
      };

      const unsubscribe = navigation.addListener(
        "beforeRemove",
        handleBeforeRemove
      );

      return () => unsubscribe();
    }, [form.title, navigation, addNote, resetForm])
  );

  useEffect(() => {
    setCharCount(form.description.length);
  }, [form.description]);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AntDesign
          name="close"
          size={24}
          color={iconColor}
          onPress={() => router.back()}
        />
      </View>
      <TextInput
        style={{
          fontFamily: "WorkSans_900Black",
          fontSize: 24,
          color: isDarkMode
            ? Colors.Text_Dark.Default
            : Colors.Text_Light.Default,
        }}
        placeholderTextColor={
          isDarkMode ? Colors.Text_Dark.Secondary : Colors.Text_Light.Secondary
        }
        cursorColor={Colors[palette][600]}
        selectionColor={Colors[palette][600]}
        selectionHandleColor={Colors[palette][600]}
        value={form.title}
        onChangeText={setTitle}
        placeholder="Note title"
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText text={startOfToday().toDateString()} color="Secondary" />
        <ThemedText text={charCount.toString()} color="Secondary" />
      </View>
      <TextInput
        style={{
          fontFamily: "WorkSans_400Regular",
          color: isDarkMode
            ? Colors.Text_Dark.Default
            : Colors.Text_Light.Default,
          minHeight: screenHeight / 2,
          textAlignVertical: "top",
        }}
        multiline
        placeholderTextColor={
          isDarkMode ? Colors.Text_Dark.Secondary : Colors.Text_Light.Secondary
        }
        cursorColor={Colors[palette][600]}
        selectionColor={Colors[palette][600]}
        selectionHandleColor={Colors[palette][600]}
        value={form.description}
        onChangeText={setDescription}
        placeholder="Jot down your thoughts, ideas, or reminders here..."
      />
    </SafeAreaView>
  );
}

const styles = (isDarkMode: boolean, isOLEDMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? isOLEDMode
          ? "#000000"
          : Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      padding: 16,
      gap: 8,
    },
  });
