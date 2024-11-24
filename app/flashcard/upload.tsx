import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import { toast } from "sonner-native";

import Colors from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import useThemeStore from "@/hooks/useThemeStore";
import useQuizStore from "@/hooks/useQuizStore";

import AntDesign from "@expo/vector-icons/AntDesign";
import useAuthStore from "@/hooks/useAuthStore";

export default function Page() {
  const { isDarkMode, isOLEDMode, palette } = useThemeStore();

  const [choices, setChoices] = useState(["", "", "", ""]);
  const [answerIndex, setAnswerIndex] = useState(0);

  const [isAddingQuestions, setIsAddingQuestions] = useState(true);

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const { session, client_instance } = useAuthStore();

  const {
    title,
    description,
    questions,
    question,
    resource,
    resources,
    appendChoices,
    appendQuestion,
    appendResource,
    setTitle,
    setDescription,
    setQuestion,
    setAnswer,
    setResourceLink,
    setResourceTitle,
    resetQuestion,
    resetQuestions,
    resetResource,
    resetResources,
  } = useQuizStore();

  const styleState = styles(isDarkMode, isOLEDMode);

  const uploadData = async (data: any) => {
    try {
      const flashcardRecord = await client_instance
        .collection("flashcard")
        .create(data);

      return flashcardRecord;
    } catch (error) {
      throw error;
    }
  };

  if (!isAddingQuestions) {
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
            onPress={() => {
              router.back();
              resetQuestion();
              resetQuestions();
              resetResource();
              resetResources();
            }}
          />
          <ThemedText
            text="Resources"
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
            backgroundColor: Colors[palette][600],
            paddingHorizontal: 16,
            paddingBottom: 16,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            gap: 16,
          }}
        >
          <ThemedText
            text="Here, you can input links & titles for users to access that will be useful for the quiz to visit or share. Whether it's a helpful tutorial, reference material, or anything in between."
            style={{
              color: Colors.Text_Dark.Default,
            }}
          />
          <View style={{ gap: 8 }}>
            <ThemedText
              text={"Resource " + (resources.length + 1)}
              style={{
                color: Colors.Text_Dark.Default,
                fontFamily: "WorkSans_700Bold",
                fontSize: 24,
              }}
            />
            <TextInput
              style={{
                backgroundColor: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                color: isDarkMode
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default,
                padding: 8,
                borderRadius: 8,
                fontFamily: "WorkSans_400Regular",
                paddingHorizontal: 16,
              }}
              placeholder="Resource Title"
              cursorColor={Colors[palette][600]}
              selectionColor={Colors[palette][600]}
              selectionHandleColor={Colors[palette][600]}
              placeholderTextColor={
                isDarkMode
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default
              }
              value={resource.title}
              onChangeText={(val) => setResourceTitle(val)}
            />
            <TextInput
              style={{
                backgroundColor: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                color: isDarkMode
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default,
                padding: 8,
                borderRadius: 8,
                fontFamily: "WorkSans_400Regular",
                paddingHorizontal: 16,
              }}
              placeholder="Resource Link"
              cursorColor={Colors[palette][600]}
              selectionColor={Colors[palette][600]}
              selectionHandleColor={Colors[palette][600]}
              placeholderTextColor={
                isDarkMode
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default
              }
              value={resource.link}
              onChangeText={(val) => setResourceLink(val)}
            />
          </View>

          <View />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 2,
            gap: 8,
            flexDirection: "row",
          }}
        >
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors[palette][300]
                  : Colors[palette][200],
                paddingVertical: 8,
                paddingHorizontal: 24,
                borderRadius: 16,
              },
            ]}
            onPress={() => {
              if (!resource.title && !resource.link) {
                toast("Please fill in the resources field!", {
                  duration: 3000,
                });
                return;
              }

              appendResource();
            }}
          >
            <ThemedText
              text="Add resource"
              color="Default"
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors[palette][600],
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
                paddingHorizontal: 24,
                borderRadius: 16,
                display: questions.length > 1 ? "flex" : "none",
              },
            ]}
            onPress={async () => {
              const data = {
                user_id: session.record.id,
                quiz: {
                  quiz: {
                    title: title,
                    description: description,
                    questions: questions,
                  },
                },
                quiz_resources: {
                  resources: resources,
                },
              };

              toast.promise(uploadData(data), {
                loading: "Uploading quiz...",
                success: () => "Quiz uploaded!",
                error: "Failed uploading quiz.",
              });

              router.back();
            }}
          >
            <ThemedText
              text="Upload quiz"
              color="Default"
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors[palette][600],
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
          onPress={() => {
            router.back();
            resetQuestion();
            resetQuestions();
            resetResource();
            resetResources();
          }}
        />
        <ThemedText
          text="Create quiz"
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
          padding: 16,
          backgroundColor: Colors[palette][600],
          gap: 16,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <TextInput
          style={{
            backgroundColor: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
            color: isDarkMode
              ? Colors.Text_Light.Default
              : Colors.Text_Dark.Default,
            padding: 8,
            borderRadius: 8,
            fontFamily: "WorkSans_400Regular",
            paddingHorizontal: 16,
            display: title && questions.length >= 1 ? "none" : "flex",
          }}
          placeholder="Title"
          cursorColor={Colors[palette][600]}
          selectionColor={Colors[palette][600]}
          selectionHandleColor={Colors[palette][600]}
          placeholderTextColor={
            isDarkMode ? Colors.Text_Light.Default : Colors.Text_Dark.Default
          }
          value={title}
          onChangeText={(val) => setTitle(val)}
        />
        <TextInput
          multiline
          style={{
            backgroundColor: isDarkMode
              ? Colors.Backgrounds_Light.Brand
              : Colors.Backgrounds_Dark.Brand,
            color: isDarkMode
              ? Colors.Text_Light.Default
              : Colors.Text_Dark.Default,
            padding: 8,
            borderRadius: 8,
            fontFamily: "WorkSans_400Regular",
            paddingHorizontal: 16,
            minHeight: 128,
            textAlignVertical: "top",
            display: title && questions.length >= 1 ? "none" : "flex",
          }}
          placeholder="Description"
          cursorColor={Colors[palette][600]}
          selectionColor={Colors[palette][600]}
          selectionHandleColor={Colors[palette][600]}
          placeholderTextColor={
            isDarkMode ? Colors.Text_Light.Default : Colors.Text_Dark.Default
          }
          value={description}
          onChangeText={(val) => setDescription(val)}
        />

        <View style={{ gap: 8 }}>
          <ThemedText
            text={"Question " + (questions.length + 1)}
            style={{
              fontFamily: "WorkSans_700Bold",
              color: Colors.Text_Dark.Default,
            }}
          />
          <TextInput
            style={{
              backgroundColor: isDarkMode
                ? Colors.Backgrounds_Light.Brand
                : Colors.Backgrounds_Dark.Brand,
              color: isDarkMode
                ? Colors.Text_Light.Default
                : Colors.Text_Dark.Default,
              padding: 8,
              borderRadius: 8,
              fontFamily: "WorkSans_400Regular",
              paddingHorizontal: 16,
            }}
            placeholder="Type your question here..."
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
            placeholderTextColor={
              isDarkMode ? Colors.Text_Light.Default : Colors.Text_Dark.Default
            }
            value={question.question}
            onChangeText={(val) => setQuestion(val)}
          />
        </View>

        <View style={{ gap: 8 }}>
          <ThemedText
            text="Choices"
            style={{
              fontFamily: "WorkSans_700Bold",
              color: Colors.Text_Dark.Default,
            }}
          />
          {choices.map((choice, index) => (
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
              key={index}
            >
              <TextInput
                style={{
                  backgroundColor: isDarkMode
                    ? Colors.Backgrounds_Light.Brand
                    : Colors.Backgrounds_Dark.Brand,
                  color: isDarkMode
                    ? Colors.Text_Light.Default
                    : Colors.Text_Dark.Default,
                  padding: 8,
                  borderRadius: 8,
                  fontFamily: "WorkSans_400Regular",
                  paddingHorizontal: 16,
                  flex: 1,
                }}
                placeholder={`Choice ${index + 1}`}
                cursorColor={Colors[palette][600]}
                selectionColor={Colors[palette][600]}
                placeholderTextColor={
                  isDarkMode
                    ? Colors.Text_Light.Default
                    : Colors.Text_Dark.Default
                }
                value={choice}
                onChangeText={(value) => handleChoiceChange(index, value)}
              />
              <Pressable
                style={{
                  width: 24,
                  height: 24,
                  padding: 8,
                  backgroundColor: Colors.Text_Dark.Default,
                  borderRadius: 16,
                }}
                onPress={() => setAnswerIndex(index)}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor:
                      answerIndex == index
                        ? Colors[palette][700]
                        : Colors[palette][200],
                    borderRadius: 16,
                  }}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 2,
          gap: 8,
          flexDirection: "row",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? Colors[palette][300]
                : Colors[palette][200],
              paddingVertical: 8,
              paddingHorizontal: 24,
              borderRadius: 16,
            },
          ]}
          onPress={() => {
            if (!title && !description) {
              toast(
                "Please fill the title & descriptions field before adding questions!",
                { duration: 3000 }
              );
              return;
            }

            if (choices.some((choice) => choice === "")) {
              toast(
                "Please fill all the choices field before adding questions!",
                { duration: 3000 }
              );
              return;
            }

            if (question.question) {
              appendChoices(choices);
              setAnswer(answerIndex);
              appendQuestion();
              setChoices(["", "", "", ""]);
              setAnswerIndex(0);
            } else {
              toast("Please fill the questions field!", { duration: 3000 });
            }
          }}
        >
          <ThemedText
            text="Add Question"
            color="Default"
            style={{
              fontFamily: "WorkSans_700Bold",
              color: Colors[palette][600],
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
              paddingHorizontal: 24,
              borderRadius: 16,
              display: questions.length > 1 ? "flex" : "none",
            },
          ]}
          onPress={() => {
            setIsAddingQuestions(false);
          }}
        >
          <ThemedText
            text="Finish"
            color="Default"
            style={{
              fontFamily: "WorkSans_700Bold",
              color: Colors[palette][600],
            }}
          />
        </Pressable>
      </View>
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
