import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import LottieView from "lottie-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import useThemeStore from "@/hooks/useThemeStore";
import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import SparkAnimation from "@/assets/animations/spark.json";
import ThemedText from "@/components/ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SheetManager } from "react-native-actions-sheet";
import useQuizStore from "@/hooks/useQuizStore";

export default function Page() {
  const { id } = useLocalSearchParams();

  const { isDarkMode, isOLEDMode, palette } = useThemeStore();
  const { client_instance } = useAuthStore();
  const { setID, setDescription, setQuestions, setTitle } = useQuizStore();

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const styleState = styles(isDarkMode, isOLEDMode);

  const fetchFlashCardData = async () => {
    try {
      const flashCardData = await client_instance
        .collection("flashcard")
        .getOne(id, { expand: "user_id" });

      return flashCardData;
    } catch (error) {
      throw error;
    }
  };

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["flashcard", id],
    queryFn: fetchFlashCardData,
    enabled: true,
  });

  if (data) {
    return (
      <SafeAreaView style={styleState.safeAreaView}>
        <View
          style={{
            width: screenWidth / 1.2,
          }}
        >
          <AntDesign
            name="close"
            size={28}
            color={iconColor}
            onPress={() => router.back()}
            style={{ marginVertical: 16 }}
          />
          <View
            style={{
              backgroundColor: Colors[palette][600],
              padding: 16,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <ThemedText
              text={data.quiz.quiz.title}
              style={{
                fontFamily: "WorkSans_900Black",
                fontSize: 24,
                color: Colors.Text_Dark.Default,
              }}
            />
            <ThemedText
              text={data.quiz.quiz.description}
              style={{ color: Colors.Text_Dark.Default }}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <View
              style={{ height: 2, backgroundColor: Colors[palette][400] }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? Colors[palette][300]
                      : Colors[palette][200],
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 16,
                    flex: 1,
                  },
                ]}
                onPress={() =>
                  SheetManager.show("hub-flashcards-resources-sheet", {
                    payload: { resources: data.quiz_resources.resources },
                  })
                }
              >
                <ThemedText
                  text="Resources"
                  color="Default"
                  style={{
                    fontFamily: "WorkSans_700Bold",
                    color: Colors[palette][600],
                    textAlign: "center",
                  }}
                />
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? Colors[palette][300]
                      : Colors[palette][200],
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 16,
                    flex: 1,
                  },
                ]}
                onPress={() => {
                  router.push({
                    pathname: "/flashcard/quiz/[quiz]",
                    params: { quiz_id: data.id },
                  });

                  setID(data.id);
                  setTitle(data.quiz.quiz.title);
                  setDescription(data.quiz.quiz.description);
                  setQuestions(data.quiz.quiz.questions);
                }}
              >
                <ThemedText
                  text="Start"
                  color="Default"
                  style={{
                    fontFamily: "WorkSans_700Bold",
                    color: Colors[palette][600],
                    textAlign: "center",
                  }}
                />
              </Pressable>
            </View>
          </View>
          {data.expand ? (
            <ThemedText
              text={"This quiz is made by " + data.expand.user_id.name + "."}
              style={{
                backgroundColor: Colors[palette][600],
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 16,
                marginVertical: 8,
                color: Colors.Text_Dark.Default,
              }}
            />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styleState.safeAreaView,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <LottieView
        source={SparkAnimation}
        style={{ height: screenHeight, width: screenWidth }}
        autoPlay
      />
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
      justifyContent: "center",
      alignItems: "center",
    },
  });
