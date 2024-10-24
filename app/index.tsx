import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "pinar";
import {
  WorkSans_400Regular,
  WorkSans_700Bold,
  WorkSans_600SemiBold,
  WorkSans_300Light,
  useFonts,
  WorkSans_900Black,
} from "@expo-google-fonts/work-sans";
import { useEffect, useRef, useState } from "react";
import { router, SplashScreen } from "expo-router";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import LandingPageStrings from "@/constants/LandingPageStrings";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_900Black,
  });
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [dotIndex, setDotIndex] = useState(0);

  const signUpRef = useRef<BottomSheetMethods>(null);
  const loginRef = useRef<BottomSheetMethods>(null);
  const carouselRef = useRef(null);

  const { palette } = useThemeStore();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginVertical: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor:
              dotIndex == 0 ? Colors[palette][600] : Colors.Text_Light.Tertiary,
            borderRadius: 999,
          }}
        ></View>
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor:
              dotIndex == 1 ? Colors[palette][600] : Colors.Text_Light.Tertiary,

            borderRadius: 999,
          }}
        ></View>
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor:
              dotIndex == 2 ? Colors[palette][600] : Colors.Text_Light.Tertiary,

            borderRadius: 999,
          }}
        ></View>
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor:
              dotIndex == 3 ? Colors[palette][600] : Colors.Text_Light.Tertiary,

            borderRadius: 999,
          }}
        ></View>
      </View>
      <Carousel
        ref={carouselRef}
        showsDots={false}
        showsControls={false}
        containerStyle={{ height: screenHeight / 2 }}
        onIndexChanged={({ index, total }) => {
          setDotIndex(index);
        }}
        loop={false}
      >
        {LandingPageStrings.map((obj) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
            key={obj.title}
          >
            {/* SEP */}
            <View>
              <ThemedText
                text={obj.title}
                style={{
                  fontSize: 20,
                  fontFamily: "WorkSans_700Bold",
                  textAlign: "center",
                }}
              />
              <ThemedText
                text={obj.description}
                color="Tertiary"
                style={{
                  fontSize: 14,
                  fontFamily: "WorkSans_400Regular",
                  textAlign: "center",
                }}
              />
            </View>
            {/* SEP */}
          </View>
        ))}
      </Carousel>
      <View
        style={{
          flexDirection: "row",
          justifyContent: dotIndex == 3 ? "flex-end" : "space-between",
          alignItems: dotIndex == 3 ? "flex-end" : "center",
          padding: 16,
          width: screenWidth,
        }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={() => {
              signUpRef.current?.open();
            }}
            style={{
              borderWidth: 1,
              borderColor: Colors[palette][600],
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: Colors[palette][600],
              }}
            >
              Sign-up
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              loginRef.current?.open();
            }}
            style={{
              borderWidth: dotIndex == 3 ? 0 : 1,
              borderColor: Colors[palette][600],
              backgroundColor: dotIndex == 3 ? Colors[palette][600] : "#f4f4f4",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: dotIndex == 3 ? "#FAFAFA" : Colors[palette][600],
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 16,
            display: dotIndex == 3 ? "none" : "flex",
          }}
          onPress={() => {
            if (dotIndex == 3) {
              setDotIndex((prevIndex) => prevIndex - 1);
              carouselRef.current.scrollToPrev();
            } else {
              carouselRef.current.scrollToNext();
              setDotIndex((prevIndex) => prevIndex + 1);
            }
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
            }}
          >
            Next
          </Text>
        </Pressable>
      </View>
      <BottomSheet
        ref={loginRef}
        height={screenHeight / 2.3}
        disableDragHandlePanning
        disableBodyPanning
        disableKeyboardHandling
      >
        <View style={{ padding: 16 }}>
          <View>
            <Text
              style={{
                fontFamily: "WorkSans_900Black",
                color: Colors.Text_Light.Default,
                fontSize: 36,
              }}
            >
              Login
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: Colors.Text_Light.Tertiary,
              }}
            >
              Pick up where you left off.
            </Text>
          </View>
          <View style={{ gap: 8, marginVertical: 16 }}>
            <TextInput
              style={{
                backgroundColor: Colors.Backgrounds_Light.Brand,
                padding: 8,
                borderRadius: 8,
                fontFamily: "WorkSans_400Regular",
                paddingHorizontal: 16,
              }}
              placeholder="Email Address"
            />
            <TextInput
              style={{
                backgroundColor: Colors.Backgrounds_Light.Brand,
                padding: 8,
                borderRadius: 8,
                fontFamily: "WorkSans_400Regular",
                paddingHorizontal: 16,
              }}
              placeholder="Password"
            />
          </View>
          <Pressable
            style={{
              backgroundColor: Colors[palette][600],
              padding: 16,
              borderRadius: 16,
            }}
            onPress={() => router.replace("/(dashboard)")}
          >
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: "#FAFAFA",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </BottomSheet>
      <BottomSheet
        ref={signUpRef}
        height={screenHeight / 2}
        disableDragHandlePanning
        disableBodyPanning
        disableKeyboardHandling
      >
        <View style={{ padding: 16 }}>
          <View>
            <Text
              style={{
                fontFamily: "WorkSans_900Black",
                color: Colors.Text_Light.Default,
                fontSize: 36,
              }}
            >
              Register
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: Colors.Text_Light.Tertiary,
              }}
            >
              Your personalized study journey starts here!
            </Text>
          </View>
          <View style={{ gap: 8, marginVertical: 16 }}>
            <TextInput
              style={{
                backgroundColor: Colors.Backgrounds_Light.Brand,
                padding: 8,
                borderRadius: 8,
                fontFamily: "WorkSans_400Regular",
                paddingHorizontal: 16,
              }}
              placeholder="Name"
            />
            <TextInput
              style={{
                backgroundColor: Colors.Backgrounds_Light.Brand,
                padding: 8,
                borderRadius: 8,
                fontFamily: "WorkSans_400Regular",
                paddingHorizontal: 16,
              }}
              placeholder="Email Address"
            />
            <TextInput
              style={{
                backgroundColor: Colors.Backgrounds_Light.Brand,
                padding: 8,
                borderRadius: 8,
                fontFamily: "WorkSans_400Regular",
                paddingHorizontal: 16,
              }}
              placeholder="Password"
            />
          </View>
          <Pressable
            style={{
              backgroundColor: Colors[palette][600],
              padding: 16,
              borderRadius: 16,
            }}
            onPress={() => router.replace("/(dashboard)")}
          >
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: "#FAFAFA",
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
