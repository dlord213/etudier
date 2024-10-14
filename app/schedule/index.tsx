import { useContext, useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import ThemedPressableOpacity from "@/components/ThemedPressableOpacity";
import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import ThemedPressable from "@/components/ThemedPressable";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";
import ThemedModalTextInput from "@/components/ThemedModalTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import useSchedule from "@/hooks/useSchedule";

export default function Page() {
  const { theme, palette } = useContext(ThemeContext);
  const { height: screenHeight } = useWindowDimensions();

  const sheetRef = useRef<BottomSheetMethods>(null);

  const headingIconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  const styleState = styles(theme);

  const {
    scheduleForm,
    isEndTimeEnabled,
    setIsEndTimeEnabled,
    handleTitleChange,
    handleStartDatePress,
    handleStartTimePress,
    handleEndDatePress,
    handleEndTimePress,
    resetScheduleForm,
  } = useSchedule();

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText text="Schedules" style={styleState.headingTextStyle} />
        <ThemedPressableOpacity
          onPress={() => {
            sheetRef.current?.open();
          }}
        >
          <FontAwesome6 name="add" size={20} color={headingIconColor} />
        </ThemedPressableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ gap: 16 }}>
        <ScrollView
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
        >
          <ThemedPressable
            children={
              <ThemedText
                text="Monday"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            }
            backgroundColor={Colors[palette][200]}
          />
          <ThemedPressable
            style={{ paddingHorizontal: 24 }}
            children={
              <ThemedText
                text="Tuesday"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            }
            backgroundColor={Colors[palette][200]}
          />
          <ThemedPressable
            children={
              <ThemedText
                text="Wednesday"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            }
            backgroundColor={Colors[palette][200]}
          />
          <ThemedPressable
            children={
              <ThemedText
                text="Thursday"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            }
            backgroundColor={Colors[palette][200]}
          />
          <ThemedPressable
            children={
              <ThemedText
                text="Friday"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            }
            backgroundColor={Colors[palette][200]}
          />
          <ThemedPressable
            children={
              <ThemedText
                text="Saturday"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            }
            backgroundColor={Colors[palette][200]}
          />
          <ThemedPressable
            children={
              <ThemedText
                text="Sunday"
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            }
            backgroundColor={Colors[palette][200]}
          />
        </ScrollView>
        <ThemedPressableOpacity
          style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
        >
          <Entypo name="calendar" size={28} color={headingIconColor} />
          <View>
            <ThemedText
              text="Title"
              style={{ fontFamily: "WorkSans_700Bold", fontSize: 20 }}
            />
            <ThemedText
              text="Time"
              style={{ fontFamily: "WorkSans_400Regular", fontSize: 16 }}
              color="tertiary"
            />
          </View>
        </ThemedPressableOpacity>
      </ScrollView>
      <ThemedBottomSheetModal
        onOpen={() => {
          resetScheduleForm();
        }}
        onClose={() => {}}
        ref={sheetRef}
      >
        <View style={{ marginBottom: 8 }}>
          <ThemedModalTextInput
            onChangeText={handleTitleChange}
            value={scheduleForm.title}
            placeholder="Title"
            multiline={false}
            style={{ fontSize: 24 }}
          />
        </View>
        <View style={{ gap: 8, marginBottom: 16 }}>
          {/* START DATE */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <ThemedPressable
              onPress={handleStartDatePress}
              backgroundColor={Colors[palette][200]}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <ThemedText
                text={scheduleForm.startDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </ThemedPressable>
            <ThemedPressable
              onPress={handleStartTimePress}
              backgroundColor={Colors[palette][200]}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <ThemedText
                text={scheduleForm.startTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </ThemedPressable>
          </View>
          {/* START DATE */}

          {/* END DATE */}
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              display: isEndTimeEnabled ? "flex" : "none",
            }}
          >
            <ThemedPressable
              onPress={handleEndDatePress}
              backgroundColor={Colors[palette][200]}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <ThemedText
                text={scheduleForm.endDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </ThemedPressable>
            <ThemedPressable
              onPress={handleEndTimePress}
              backgroundColor={Colors[palette][200]}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <ThemedText
                text={scheduleForm.endTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                style={{
                  fontFamily: "WorkSans_400Regular",
                  color: Colors[palette][600],
                }}
              />
            </ThemedPressable>
          </View>
          {/* END DATE */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedPressableOpacity
            onPress={() => {
              setIsEndTimeEnabled((prevState) => !prevState);
            }}
          >
            <FontAwesome
              name="clock-o"
              size={24}
              color={
                theme == "dark"
                  ? Colors.Text_Dark.Default
                  : Colors.Text_Light.Default
              }
            />
          </ThemedPressableOpacity>
          <Pressable
            onPress={() => {
              sheetRef.current?.close();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: Colors[palette][600],
                padding: 8,
                borderRadius: 8,
                opacity: pressed ? 0.8 : 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                display: !scheduleForm.title ? "none" : "flex",
              },
            ]}
          >
            <Ionicons name="send" size={16} color={Colors.Text_Dark.Default} />
          </Pressable>
        </View>
      </ThemedBottomSheetModal>
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
    headingTextStyle: {
      fontFamily: "WorkSans_700Bold",
      fontSize: 30,
    },
  });
