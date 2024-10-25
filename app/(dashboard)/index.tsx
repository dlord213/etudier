import Colors from "@/constants/Colors";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef } from "react";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function Page() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const taskModalRef = useRef<BottomSheetMethods>(null);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "WorkSans_900Black",
            fontSize: 32,
            color: Colors.Text_Light.Default,
          }}
        >
          Tasks
        </Text>
        <Pressable onPress={() => router.push("/user")}>
          <FontAwesome
            name="user-circle-o"
            size={24}
            color={Colors.Text_Light.Default}
          />
        </Pressable>
      </View>
      <Pressable
        style={{
          backgroundColor: Colors.Wewak[600],
          padding: 16,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: Colors.Text_Dark.Default,
            }}
          >
            Number of tasks completed
          </Text>
          <Text
            style={{
              fontFamily: "WorkSans_700Bold",
              color: Colors.Text_Dark.Default,
              fontSize: 28,
            }}
          >
            1000
          </Text>
        </View>
        <MaterialCommunityIcons
          name="clipboard-check-multiple-outline"
          size={48}
          color={Colors.Text_Dark.Default}
        />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "WorkSans_700Bold",
            fontSize: 24,
            color: Colors.Text_Light.Default,
          }}
        >
          Today
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "WorkSans_700Bold",
            fontSize: 24,
            color: Colors.Text_Light.Default,
          }}
        >
          Tomorrow
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "WorkSans_700Bold",
            fontSize: 24,
            color: Colors.Text_Light.Default,
          }}
        >
          Upcoming
        </Text>
      </View>
      <Pressable
        onPress={() => {
          taskModalRef.current?.open();
        }}
        style={{
          padding: 16,
          backgroundColor: Colors.Backgrounds_Light.Brand,
          borderRadius: 16,
          position: "absolute",
          bottom: 12,
          left: 12,
          width: screenWidth - 24,
        }}
      >
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            color: Colors.Text_Light.Tertiary,
          }}
        >
          I want to...
        </Text>
      </Pressable>
      <BottomSheet
        ref={taskModalRef}
        height={screenHeight / 4}
        disableKeyboardHandling
      >
        <View style={{ paddingVertical: 8, paddingHorizontal: 16, gap: 12 }}>
          <TextInput
            placeholder="Title"
            style={{ fontFamily: "WorkSans_700Bold", fontSize: 32 }}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.Backgrounds_Light.Brand,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="calendar"
              size={28}
              color={Colors.Text_Light.Default}
            />
            <AntDesign name="plussquare" size={32} color={Colors.Wewak[600]} />
          </View>
        </View>
      </BottomSheet>
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
