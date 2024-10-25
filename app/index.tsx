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
          alignItems: "centerA",
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor:
              dotIndex == 0 ? Colors.Wewak[600] : Colors.Text_Light.Tertiary,
            borderRadius: 999,
          }}
        ></View>
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor:
              dotIndex == 1 ? Colors.Wewak[600] : Colors.Text_Light.Tertiary,

            borderRadius: 999,
          }}
        ></View>
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor:
              dotIndex == 2 ? Colors.Wewak[600] : Colors.Text_Light.Tertiary,

            borderRadius: 999,
          }}
        ></View>
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor:
              dotIndex == 3 ? Colors.Wewak[600] : Colors.Text_Light.Tertiary,

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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          {/* SEP */}
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "WorkSans_700Bold",
                color: Colors.Text_Light.Default,
                textAlign: "center",
              }}
            >
              Ace Your Studies, One Task at a Time!
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "WorkSans_400Regular",
                color: Colors.Text_Light.Tertiary,
                textAlign: "center",
              }}
            >
              Manage your assignments, projects, and deadlines effortlessly.
              Stay ahead with our easy-to-use task management system designed to
              help you keep track of every responsibility.
            </Text>
          </View>
          {/* SEP */}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          {/* SEP */}
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "WorkSans_700Bold",
                color: Colors.Text_Light.Default,
                textAlign: "center",
              }}
            >
              Your Personalized Study Companion!
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "WorkSans_400Regular",
                color: Colors.Text_Light.Tertiary,
                textAlign: "center",
              }}
            >
              Tailor your study sessions, schedules, and tasks to match your
              unique learning style. Our app adapts to you, so you can achieve
              more in less time, with features built for your academic success.
            </Text>
          </View>
          {/* SEP */}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          {/* SEP */}
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "WorkSans_700Bold",
                color: Colors.Text_Light.Default,
                textAlign: "center",
              }}
            >
              Master Your Time, Achieve Your Goals!
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "WorkSans_400Regular",
                color: Colors.Text_Light.Tertiary,
                textAlign: "center",
              }}
            >
              Boost your productivity with built-in time management tools like
              the Pomodoro timer and smart scheduling. Hit your academic
              milestones faster and more effectively.
            </Text>
          </View>
          {/* SEP */}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          {/* SEP */}
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "WorkSans_700Bold",
                color: Colors.Text_Light.Default,
                textAlign: "center",
              }}
            >
              Organize. Focus. Succeed.
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "WorkSans_400Regular",
                color: Colors.Text_Light.Tertiary,
                textAlign: "center",
              }}
            >
              Stay on top of your academic life with an app that helps you
              organize tasks, focus on your studies, and achieve your academic
              goals through simple, yet powerful tools.
            </Text>
          </View>
          {/* SEP */}
        </View>
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
              borderColor: Colors.Wewak[600],
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: Colors.Wewak[600],
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
              borderColor: Colors.Wewak[600],
              backgroundColor: dotIndex == 3 ? Colors.Wewak[600] : "#fafafa",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: dotIndex == 3 ? "#FAFAFA" : Colors.Wewak[600],
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={{
            backgroundColor: Colors.Wewak[600],
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
              backgroundColor: Colors.Wewak[600],
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
              backgroundColor: Colors.Wewak[600],
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
