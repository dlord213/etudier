import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";

import ThemeContext from "@/contexts/ThemeContext";
import ThemedText from "@/components/ThemedText";
import ThemedPressableOpacity from "@/components/ThemedPressableOpacity";
import Colors from "@/constants/Colors";

export default function Page() {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles([theme, palette]);
  const [name, setName] = useState<string | null>(null);

  const router = useRouter();

  const headingIconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  useEffect(() => {
    const getName = async () => {
      const storedName = await SecureStore.getItemAsync("name");
      if (storedName) {
        setName(storedName);
      } else {
        router.replace("/");
      }
    };

    if (!name) {
      getName();
    }
  }, [name]);

  if (!name) {
    return (
      <ActivityIndicator
        color={
          theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default
        }
        size={64}
      />
    );
  }

  return (
    <SafeAreaView
      style={[
        styleState.safeAreaView,
        { justifyContent: !name ? "center" : "flex-start" },
      ]}
    >
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
            style={styleState.headingBoldTextStyle}
          />
          <ThemedText
            text={"Today, you have ? tasks"}
            color="tertiary"
            style={styleState.headingTertiaryTextStyle}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <ThemedPressableOpacity
            onPress={() => {
              router.push("/activity_log");
            }}
          >
            <Ionicons name="stats-chart" size={20} color={headingIconColor} />
          </ThemedPressableOpacity>
          <ThemedPressableOpacity
            onPress={() => {
              router.push("/settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color={headingIconColor}
            />
          </ThemedPressableOpacity>
          <FontAwesome5 name="bell" size={20} color={headingIconColor} />
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
        <ThemedPressableOpacity
          onPress={() => {
            router.push("/tasks");
          }}
        >
          <FontAwesome6 name="add" size={20} color={headingIconColor} />
        </ThemedPressableOpacity>
      </View>
      <ThemedPressableOpacity
        onPress={() => {
          router.push("/tasks");
        }}
      >
        <View
          style={[
            styleState.cardStyle,
            { backgroundColor: Colors[palette][600] },
          ]}
        >
          <ThemedText
            text="No tasks."
            style={styleState.cardHeadingTextStyle}
          />
          <FontAwesome5
            name="clipboard"
            size={48}
            color={Colors.Text_Dark.Default}
          />
        </View>
      </ThemedPressableOpacity>
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
      <ThemedPressableOpacity>
        <View
          style={[
            styleState.cardStyle,
            { backgroundColor: Colors[palette][600] },
          ]}
        >
          <ThemedText
            text="No schedules."
            style={styleState.cardHeadingTextStyle}
          />
          <FontAwesome5
            name="clock"
            size={36}
            color={Colors.Text_Dark.Default}
          />
        </View>
      </ThemedPressableOpacity>
    </SafeAreaView>
  );
}

const styles = (context: any) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:
        context[0] != "light"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      padding: 16,
      gap: 16,
    },
    headingBoldTextStyle: {
      fontFamily: "WorkSans_600SemiBold",
      fontSize: 24,
    },
    headingTertiaryTextStyle: {
      fontFamily: "WorkSans_400Regular",
      fontSize: 14,
    },
    cardHeadingTextStyle: {
      color: Colors.Text_Dark.Default,
      fontFamily: "WorkSans_700Bold",
      fontSize: 24,
    },
    cardStyle: {
      flexDirection: "row",
      padding: 16,
      borderRadius: 16,
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
