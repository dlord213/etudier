import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { palette, isDarkMode, setPalette, toggleDarkMode } = useThemeStore();
  const styleState = styles(isDarkMode);

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

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
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 36 }}
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
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            width: 48,
            height: 48,
            backgroundColor: Colors.Astral[600],
            borderRadius: 999,
          }}
          onPress={() => setPalette("Astral")}
        />
        <Pressable
          style={{
            width: 48,
            height: 48,
            backgroundColor: Colors.Emerald[600],
            borderRadius: 999,
          }}
          onPress={() => setPalette("Emerald")}
        />
        <Pressable
          style={{
            width: 48,
            height: 48,
            backgroundColor: Colors.Victoria[600],
            borderRadius: 999,
          }}
          onPress={() => setPalette("Victoria")}
        />
        <Pressable
          style={{
            width: 48,
            height: 48,
            backgroundColor: Colors.Wewak[600],
            borderRadius: 999,
          }}
          onPress={() => setPalette("Wewak")}
        />
        <Pressable
          style={{
            width: 48,
            height: 48,
            backgroundColor: Colors.Willow[600],
            borderRadius: 999,
          }}
          onPress={() => setPalette("Willow")}
        />
      </View>
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
      paddingHorizontal: 16,
      gap: 8,
    },
  });
