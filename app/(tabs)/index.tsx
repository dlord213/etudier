import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import Colors from "@/constants/Colors";
import { useContext, useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ThemeContext from "@/contexts/ThemeContext";
import ThemedText from "@/components/ThemedText";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, useRouter } from "expo-router";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles(theme);
  const [name, setName] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const getName = async () => {
      const storedName = await SecureStore.getItemAsync("name");
      setName(storedName);
      setIndex(1);
    };

    if (!name) {
      getName();
    }
  }, []);

  const pages = [
    <>
      <ActivityIndicator
        color={
          theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default
        }
        size={64}
      />
    </>,
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <ThemedText
            text={"Welcome, " + name}
            style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 24 }}
          />
          <ThemedText
            text={"Today, you have ? tasks"}
            color="tertiary"
            style={{ fontFamily: "WorkSans_400Regular", fontSize: 14 }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Ionicons
            name="stats-chart"
            size={20}
            color={
              theme == "dark"
                ? Colors.Text_Dark.Default
                : Colors.Text_Light.Default
            }
          />
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            onPress={() => {
              router.push("/settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color={
                theme == "dark"
                  ? Colors.Text_Dark.Default
                  : Colors.Text_Light.Default
              }
            />
          </Pressable>
          <FontAwesome5
            name="bell"
            size={20}
            color={
              theme == "dark"
                ? Colors.Text_Dark.Default
                : Colors.Text_Light.Default
            }
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="Tasks overview"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
        <Pressable>
          <FontAwesome6
            name="add"
            size={20}
            color={
              theme == "dark"
                ? Colors.Text_Dark.Default
                : Colors.Text_Light.Default
            }
          />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors[palette][600],
          padding: 16,
          borderRadius: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="No tasks."
          style={{
            fontFamily: "WorkSans_700Bold",
            fontSize: 24,
            flex: 1,
          }}
        />
        <FontAwesome5
          name="clipboard"
          size={48}
          color={
            theme == "dark"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default
          }
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
          text="Schedule overview"
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
        <Pressable>
          <Entypo
            name="list"
            size={24}
            color={
              theme == "dark"
                ? Colors.Text_Dark.Default
                : Colors.Text_Light.Default
            }
          />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors[palette][600],
          padding: 16,
          borderRadius: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          text="No schedules."
          style={{
            fontFamily: "WorkSans_700Bold",
            fontSize: 24,
            flex: 1,
          }}
        />
        <FontAwesome5
          name="clock"
          size={36}
          color={
            theme == "dark"
              ? Colors.Text_Dark.Default
              : Colors.Text_Light.Default
          }
        />
      </View>
    </>,
  ];

  return (
    <SafeAreaView
      style={[
        styleState.safeAreaView,
        { justifyContent: index == 0 ? "center" : "flex-start" },
      ]}
    >
      {pages[index]}
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
