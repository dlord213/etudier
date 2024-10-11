import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import useSettings from "@/hooks/useSettings";

export default function Page() {
  const { theme, palette } = useContext(ThemeContext);
  const styleState = styles(theme);
  const navigation = useNavigation();

  const {
    noteSettings,
    isNoteSettingsFetched,
    setNoteSettings,
    saveNoteSettings,
  } = useSettings();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
      e.preventDefault();
      await saveNoteSettings();
      navigation.dispatch(e.data.action);
    });

    return unsubscribe;
  }, [navigation, noteSettings]);

  if (!isNoteSettingsFetched) {
    return (
      <SafeAreaView
        style={[
          styleState.safeAreaView,
          {
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator size={64} color={Colors[palette][600]} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <ThemedText text="Settings" style={styleState.headingTextStyle} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="Auto-save on close"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
        <Switch
          value={noteSettings.autoSaveOnClose}
          thumbColor={Colors[palette][500]}
          trackColor={{
            false: Colors[palette][300],
            true: Colors[palette][100],
          }}
          ios_backgroundColor={Colors[palette][50]}
          onValueChange={(value) =>
            setNoteSettings((prevSettings) => ({
              ...prevSettings,
              autoSaveOnClose: value,
            }))
          }
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
        context != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      gap: 16,
    },
    headingTextStyle: {
      fontFamily: "WorkSans_700Bold",
      fontSize: 30,
    },
  });
