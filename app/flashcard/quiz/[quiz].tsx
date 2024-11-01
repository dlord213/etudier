import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

import Colors from "@/constants/Colors";
import useQuizStore from "@/hooks/useQuizStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function Page() {
  const { isDarkMode, isOLEDMode, palette } = useThemeStore();
  const { title, questions } = useQuizStore();
  const { width: screenWidth } = useWindowDimensions();
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentFlashcard = questions[currentIndex];

  const styleState = styles(isDarkMode, isOLEDMode);
  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const preventBack = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        if (!isComplete) {
          toast("Quit the quiz?", {
            duration: 2000,
            action: {
              label: "Yes",
              onClick: () => {
                navigation.dispatch(e.data.action);
                toast.dismiss();
              },
            },
            cancel: {
              label: "No",
              onClick: () => {},
            },
          });
        } else {
          navigation.dispatch(e.data.action);
        }
      });

      return () => preventBack();
    }, [navigation])
  );

  if (isComplete) {
    return (
      <SafeAreaView style={styleState.safeAreaView}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors[palette][600],
            paddingHorizontal: 16,
          }}
        >
          <AntDesign
            name="close"
            size={24}
            color={Colors.Text_Dark.Default}
            style={{ marginVertical: 16 }}
            onPress={() => router.back()}
          />
          <ThemedText
            text={title}
            style={{
              fontFamily: "WorkSans_900Black",
              fontSize: 20,
              color: Colors.Text_Dark.Default,
            }}
          />
          <View />
        </View>
        <View
          style={{
            flex: 1,
            padding: 16,
            backgroundColor: Colors[palette][600],
            justifyContent: "flex-end",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <ThemedText
            text="Score"
            style={{
              fontSize: 32,
              fontFamily: "WorkSans_700Bold",
              color: Colors.Text_Dark.Default,
            }}
          />
          <ThemedText
            text={
              "Out of " + questions.length + " items, you scored " + score + "."
            }
            style={{ color: Colors.Text_Dark.Default }}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                padding: 12,
                borderRadius: 8,
                opacity: pressed ? 0.9 : 1,
                width: screenWidth / 2,
              },
            ]}
            onPress={() => {
              setCurrentIndex(0);
              setIsComplete(false);
              setScore(0);
            }}
          >
            <ThemedText
              text="Restart"
              style={{
                color: isDarkMode
                  ? Colors.Text_Dark.Secondary
                  : Colors.Text_Dark.Default,
                textAlign: "center",
              }}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors[palette][600],
          paddingHorizontal: 16,
        }}
      >
        <AntDesign
          name="close"
          size={24}
          color={Colors.Text_Dark.Default}
          style={{ marginVertical: 16 }}
          onPress={() => router.back()}
        />
        <ThemedText
          text={title}
          style={{
            fontFamily: "WorkSans_900Black",
            fontSize: 20,
            color: Colors.Text_Dark.Default,
          }}
        />
        <View />
      </View>
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: Colors[palette][600],
          justifyContent: "flex-end",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <ThemedText
          text="Question"
          style={{
            fontSize: 32,
            fontFamily: "WorkSans_700Bold",
            color: Colors.Text_Dark.Default,
          }}
        />
        <ThemedText
          text={currentFlashcard.question}
          style={{ fontSize: 18, color: Colors.Text_Dark.Default }}
        />
      </View>
      {currentFlashcard.choices ? (
        <View
          style={{
            flex: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          {currentFlashcard.choices.map((choice: any) => (
            <Pressable
              key={choice}
              style={({ pressed }) => [
                {
                  backgroundColor: isDarkMode
                    ? Colors.Backgrounds_Light.Brand
                    : Colors.Backgrounds_Dark.Brand,
                  padding: 12,
                  borderRadius: 8,
                  opacity: pressed ? 0.9 : 1,
                  width: screenWidth / 2,
                },
              ]}
              onPress={() => {
                toast(
                  choice === currentFlashcard.answer
                    ? "Your answer is correct!"
                    : "Your answer is incorrect",
                  {
                    onDismiss: () => {
                      if (choice === currentFlashcard.answer) {
                        setScore((val: number) => val + 1);
                      }
                      toast.dismiss();
                      handleNext();
                    },
                  }
                );
              }}
            >
              <ThemedText
                text={choice}
                style={{
                  color: isDarkMode
                    ? Colors.Text_Dark.Secondary
                    : Colors.Text_Dark.Default,
                }}
              />
            </Pressable>
          ))}
        </View>
      ) : null}
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
    },
  });
