import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SheetManager } from "react-native-actions-sheet";

import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuthStore from "@/hooks/useAuthStore";
import { router } from "expo-router";
import { toast } from "sonner-native";

export default function Page() {
  const { palette, isDarkMode, isOLEDMode } = useThemeStore();
  const { client_instance, session } = useAuthStore();

  const styleState = styles(isDarkMode, isOLEDMode);

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const [currentPage, setCurrentPage] = useState<number>(0);

  const getResources = async () => {
    try {
      const resourceList = await client_instance
        .collection("resource")
        .getList(1, 20);

      return resourceList;
    } catch (error) {
      throw error;
    }
  };

  const {
    isFetched,
    data,
    refetch: refetchResources,
  } = useQuery({
    queryFn: getResources,
    queryKey: ["resources", currentPage],
    enabled: true,
    refetchIntervalInBackground: false,
  });

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{ fontFamily: "WorkSans_900Black", fontSize: 32 }}
          text="Resource Hub"
        />
        <FontAwesome
          name="refresh"
          size={24}
          color={iconColor}
          onPress={() => {
            refetchResources();
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
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
              },
            ]}
            onPress={() => SheetManager.show("hub-dictionary-sheet")}
          >
            <ThemedText
              text="Dictionary"
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
                paddingHorizontal: 16,
                borderRadius: 16,
              },
            ]}
            onPress={() => SheetManager.show("hub-holiday-sheet")}
          >
            <ThemedText
              text="Holidays"
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
                paddingHorizontal: 16,
                borderRadius: 16,
              },
            ]}
            onPress={() => SheetManager.show("hub-thesaurus-sheet")}
          >
            <ThemedText
              text="Thesaurus"
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
                paddingHorizontal: 16,
                borderRadius: 16,
              },
            ]}
            onPress={() => SheetManager.show("hub-flashcards-sheet")}
          >
            <ThemedText
              text="Flashcards"
              color="Default"
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors[palette][600],
              }}
            />
          </Pressable>
        </ScrollView>
      </View>
      {isFetched ? (
        data.items.map((item: any) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              {
                backgroundColor: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                padding: 12,
                borderRadius: 8,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/resource/[id]",
                params: { id: item.id },
              })
            }
          >
            <ThemedText
              text={item.title}
              style={{
                color: isDarkMode
                  ? Colors.Text_Light.Default
                  : Colors.Text_Dark.Default,
                fontFamily: "WorkSans_700Bold",
                fontSize: 20,
              }}
            />
            <ThemedText
              text={item.description}
              style={{
                color: isDarkMode
                  ? Colors.Text_Dark.Secondary
                  : Colors.Text_Light.Tertiary,
              }}
            />
          </Pressable>
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={48} color={Colors[palette][600]} />
        </View>
      )}
      <Pressable
        style={({ pressed }) => [
          {
            position: "absolute",
            backgroundColor: pressed
              ? Colors[palette][500]
              : Colors[palette][600],
            width: 48,
            height: 48,
            borderRadius: 8,
            bottom: 16,
            right: 16,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        onPress={() => {
          session.record.verified == true
            ? SheetManager.show("hub-resource-upload-file-sheet")
            : toast(
                "You're not a verified user, please verify your email address to upload resource."
              );
        }}
      >
        <Ionicons name="add" size={24} color={Colors.Text_Dark.Default} />
      </Pressable>
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
      paddingHorizontal: 16,
      gap: 8,
    },
  });
