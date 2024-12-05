import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

import ThemedText from "@/components/ThemedText";
import Colors, { NON_PREMIUM_COLORS, PREMIUM_COLORS } from "@/constants/Colors";
import useNoteStore from "@/hooks/useNoteStore";
import useThemeStore from "@/hooks/useThemeStore";

import AntDesign from "@expo/vector-icons/AntDesign";
import useAuthStore from "@/hooks/useAuthStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SheetManager } from "react-native-actions-sheet";

export default function Page() {
  const {
    palette,
    isDarkMode,
    isOLEDMode,
    hasColorOnNavBar,
    setPalette,
    toggleDarkMode,
    toggleOLEDMode,
    toggleColorOnNavBar,
    saveThemeSettings,
  } = useThemeStore();
  const { isGridView, toggleGridView, saveNoteSettings } = useNoteStore();
  const { session } = useAuthStore();

  const styleState = styles(isDarkMode, isOLEDMode);

  const navigation = useNavigation();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  useFocusEffect(
    useCallback(() => {
      const saveSettingsBeforeRemoval = navigation.addListener(
        "beforeRemove",
        () => {
          saveThemeSettings();
          saveNoteSettings();
        }
      );

      return saveSettingsBeforeRemoval;
    }, [navigation])
  );

  const combinedColors = [
    ...NON_PREMIUM_COLORS.map((color) => ({ color, isPremium: false })),
    ...PREMIUM_COLORS.map((color) => ({ color, isPremium: true })),
  ];

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
        <AntDesign
          name="arrowleft"
          size={28}
          color={iconColor}
          onPress={() => router.back()}
        />
        <ThemedText
          text="Settings"
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 32 }}
        />
      </View>
      <ThemedText
        text="Customization"
        style={{
          fontFamily: "WorkSans_700Bold",
        }}
        color="Tertiary"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText text="Dark Mode" />
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={Colors[palette][600]}
          trackColor={{
            false: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
            true: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexShrink: 1 }}>
          <ThemedText text="OLED Mode" />
          <ThemedText
            text="Can only be enabled if dark mode is turned on."
            color="Secondary"
          />
        </View>
        <Switch
          value={isOLEDMode}
          onValueChange={toggleOLEDMode}
          thumbColor={Colors[palette][600]}
          trackColor={{
            false: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
            true: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
          }}
          disabled={!isDarkMode ? true : false}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexShrink: 1 }}>
          <ThemedText text="Color on navigation bar" />
          <ThemedText
            text="This toggles the color that's shown in the dashboard. (Disabled in OLED Mode)"
            color="Secondary"
          />
        </View>
        <Switch
          value={hasColorOnNavBar}
          onValueChange={toggleColorOnNavBar}
          thumbColor={Colors[palette][600]}
          trackColor={{
            false: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
            true: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
          }}
          disabled={isDarkMode ? (isOLEDMode ? true : false) : false}
        />
      </View>
      <ThemedText
        text="Colors"
        style={{
          fontFamily: "WorkSans_700Bold",
        }}
        color="Tertiary"
      />
      <FlatList
        data={combinedColors}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
        style={{ maxHeight: 56 }}
        renderItem={({
          item,
        }: {
          item: { color: string; isPremium: boolean };
        }) => (
          <Pressable
            style={{
              width: 48,
              height: 48,
              backgroundColor: Colors[item.color][600],
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
              opacity: item.isPremium && !session.record.is_premium ? 0.3 : 1,
            }}
            onPress={() => {
              if (item.isPremium) {
                if (session.record.is_premium) {
                  setPalette(item.color);
                } else {
                  SheetManager.show("premium-upgrade-sheet");
                }
              } else {
                setPalette(item.color);
              }
            }}
          >
            {item.isPremium && !session.record.is_premium && (
              <FontAwesome
                name="lock"
                size={24}
                color={
                  isDarkMode ? Colors[item.color][400] : Colors[item.color][800]
                }
              />
            )}
          </Pressable>
        )}
        keyExtractor={(item) => item.color}
      />
      <ThemedText
        text="Notes"
        style={{
          fontFamily: "WorkSans_700Bold",
        }}
        color="Tertiary"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText text="Grid View" />
        <Switch
          value={isGridView}
          onValueChange={toggleGridView}
          thumbColor={Colors[palette][600]}
          trackColor={{
            false: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
            true: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
          }}
        />
      </View>
      <ThemedText
        text="Data"
        style={{
          fontFamily: "WorkSans_700Bold",
        }}
        color="Tertiary"
      />
      <Pressable
        style={{
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
        }}
        onPress={() => {
          toast(
            "This will erase your notes, tasks, preferences. Are you sure?",
            {
              action: {
                label: "Yes",
                onClick: () => {
                  AsyncStorage.clear();
                  toast.dismiss();
                  Updates.reloadAsync();
                },
              },
              cancel: {
                label: "No",
                onClick: () => {
                  toast.dismiss();
                },
              },
            }
          );
        }}
      >
        <AntDesign name="delete" color={iconColor} size={24} />
        <View>
          <ThemedText text="Clear all data" />
          <ThemedText
            text="This erases all your data locally & online."
            color="Secondary"
          />
        </View>
      </Pressable>
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
      paddingHorizontal: 16,
      gap: 12,
    },
  });
