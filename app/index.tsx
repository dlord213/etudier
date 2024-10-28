import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import {
  WorkSans_400Regular,
  WorkSans_700Bold,
  WorkSans_600SemiBold,
  WorkSans_300Light,
  useFonts,
  WorkSans_900Black,
} from "@expo-google-fonts/work-sans";

import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { Redirect, SplashScreen } from "expo-router";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import LottieView from "lottie-react-native";
import Carousel from "pinar";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import LandingPageStrings from "@/constants/LandingPageStrings";
import useAuthStore from "@/hooks/useAuthStore";

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

  const { palette, isDarkMode, isOLEDMode } = useThemeStore();
  const {
    form,
    loadStoredSession,
    handleLogin,
    handleRegister,
    setEmail,
    setName,
    setPassword,
    resetForm,
    isAuthing,
    isLoggedIn,
    toggleIsAuthing,
  } = useAuthStore();

  useEffect(() => {
    loadStoredSession();
  }, []);

  const styleState = styles(isDarkMode, isOLEDMode);
  const btnColor = isDarkMode
    ? Colors.Backgrounds_Dark.Brand
    : Colors.Backgrounds_Light.Brand;

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (isAuthing) {
    return (
      <SafeAreaView
        style={[styleState.safeAreaView, { justifyContent: "center" }]}
      >
        <LottieView
          source={require("../assets/animations/loading.json")}
          style={{ height: screenHeight / 2, width: screenHeight / 2 }}
          autoPlay
        />
      </SafeAreaView>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/(dashboard)" />;
  }

  return (
    <SafeAreaView style={styleState.safeAreaView}>
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
            }}
            key={obj.title}
          >
            {/* SEP */}
            <View>
              <LottieView
                autoPlay
                loop
                source={obj.animation}
                style={{
                  height: screenHeight / 2,
                  width: screenWidth,
                }}
              />
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
                  paddingHorizontal: 8,
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
              backgroundColor: Colors[palette][200],
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
              backgroundColor:
                dotIndex == 3 ? Colors[palette][600] : Colors[palette][200],
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
              carouselRef.current?.scrollToPrev();
            } else {
              carouselRef.current?.scrollToNext();
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
        style={{
          backgroundColor: isDarkMode
            ? Colors.Backgrounds_Dark.Brand
            : Colors.Backgrounds_Light,
        }}
        onClose={() => {
          setTimeout(() => {
            resetForm();
          }, 300);
        }}
      >
        <View style={{ padding: 16 }}>
          <View>
            <ThemedText
              text="Login"
              style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
            />
            <ThemedText text="Pick up where you left off." color="Tertiary" />
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
              cursorColor={Colors[palette][600]}
              selectionColor={Colors[palette][600]}
              selectionHandleColor={Colors[palette][600]}
              value={form.email}
              onChangeText={setEmail}
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
              cursorColor={Colors[palette][600]}
              selectionColor={Colors[palette][600]}
              selectionHandleColor={Colors[palette][600]}
              value={form.password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: Colors[palette][600],
              padding: 16,
              borderRadius: 16,
            }}
            onPress={() => {
              toggleIsAuthing();
              handleLogin();
            }}
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
        style={{
          backgroundColor: isDarkMode
            ? Colors.Backgrounds_Dark.Brand
            : Colors.Backgrounds_Light,
        }}
        onClose={() => {
          setTimeout(() => {
            resetForm();
          }, 300);
        }}
      >
        <View style={{ padding: 16 }}>
          <View>
            <ThemedText
              text="Register"
              style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
            />
            <ThemedText
              text="Your personalized study journey starts here!"
              color="Tertiary"
            />
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
              cursorColor={Colors[palette][600]}
              selectionColor={Colors[palette][600]}
              selectionHandleColor={Colors[palette][600]}
              value={form.name}
              onChangeText={setName}
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
              cursorColor={Colors[palette][600]}
              selectionColor={Colors[palette][600]}
              selectionHandleColor={Colors[palette][600]}
              value={form.email}
              onChangeText={setEmail}
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
              cursorColor={Colors[palette][600]}
              selectionColor={Colors[palette][600]}
              selectionHandleColor={Colors[palette][600]}
              value={form.password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: Colors[palette][600],
              padding: 16,
              borderRadius: 16,
            }}
            onPress={() => {
              toggleIsAuthing();
              handleRegister();
            }}
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

const styles = (isDarkMode: boolean, isOLEDMode: boolean) =>
  StyleSheet.create({
    safeAreaView: {
      backgroundColor: isDarkMode
        ? isOLEDMode
          ? "#000000"
          : Colors.Backgrounds_Dark.Brand
        : Colors.Backgrounds_Light.Brand,
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
