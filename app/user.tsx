import Colors from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import { router } from "expo-router";

export default function Page() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
          <AntDesign
            name="arrowleft"
            size={28}
            color={Colors.Text_Light.Default}
          />
          <Text
            style={{
              fontFamily: "WorkSans_700Bold",
              fontSize: 36,
              color: Colors.Text_Light.Default,
            }}
          >
            Profile
          </Text>
        </View>
        <Pressable onPress={() => router.push("/settings")}>
          <FontAwesome
            name="gear"
            size={28}
            color={Colors.Text_Light.Default}
          />
        </Pressable>
      </View>
      <View style={{ gap: 16, marginBottom: 8 }}>
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <View
            style={{
              width: 64,
              height: 64,
              backgroundColor: Colors.Backgrounds_Light.Brand,
              borderRadius: 999,
            }}
          ></View>
          <View>
            <Text
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors.Wewak[600],
                fontSize: 24,
              }}
            >
              Name
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: Colors.Text_Light.Tertiary,
              }}
            >
              (email)
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            color: Colors.Wewak[500],
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam. (BIO)
        </Text>
      </View>
      <View style={{ gap: 16 }}>
        <Text
          style={{
            fontFamily: "WorkSans_700Bold",
            color: Colors.Text_Light.Tertiary,
          }}
        >
          General
        </Text>
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <Ionicons
            name="bar-chart-outline"
            size={24}
            color={Colors.Text_Light.Default}
          />
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: Colors.Text_Light.Default,
            }}
          >
            Activity Log
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
});
