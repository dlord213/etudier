import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner-native";
import LottieView from "lottie-react-native";
import RNFetchBlob from "react-native-blob-util";

import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

import LoadingAnimation from "@/assets/animations/login.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

export default function Page() {
  const { id } = useLocalSearchParams();
  const { isDarkMode, isOLEDMode, palette } = useThemeStore();
  const { client_instance } = useAuthStore();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [collectionData, setCollectionData] = useState<any>();

  const styleState = styles(isDarkMode, isOLEDMode);

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const fetchData = async () => {
    try {
      const data = await client_instance.collection("resource").getOne(id, {
        expand: "user_id",
      });

      setCollectionData(data);

      return data;
    } catch (error) {
      toast.error(`Error fetching data: ${error}`);
      throw error;
    }
  };

  const downloadFile = async (fileName: string) => {
    try {
      const url = client_instance.files.getUrl(collectionData, fileName);

      await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
        },
      })
        .fetch("GET", url)
        .then(async (res) => {
          if (res && res.info().status === 200) {
            console.log(res);
            console.log(res.path());
          }
        });
    } catch (error) {
      toast.error("Cannot open file.");
      console.log(error);
      throw error;
    }
  };

  const { isFetched, data, error } = useQuery({
    queryKey: [id],
    queryFn: fetchData,
    enabled: true,
    refetchIntervalInBackground: false,
  });

  if (!isFetched) {
    return (
      <SafeAreaView
        style={[
          styleState.safeAreaView,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <LottieView
          autoPlay
          source={LoadingAnimation}
          style={{ width: screenWidth, height: screenHeight }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <AntDesign
          name="close"
          size={28}
          color={iconColor}
          onPress={() => router.back()}
          style={{ marginVertical: 16 }}
        />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ThemedText
          text={data.title}
          style={{ fontSize: 24, fontFamily: "WorkSans_700Bold" }}
        />
        <ThemedText text={data.description} color="Tertiary" />
      </View>
      <View
        style={{
          backgroundColor: isDarkMode
            ? Colors.Text_Dark.Secondary
            : Colors.Text_Light.Secondary,
          padding: 16,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          gap: 8,
        }}
      >
        <ThemedText
          text="Attached files"
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 16 }}
        />
        {data.resource_files.map((file: any) => (
          <Pressable
            key={file}
            style={({ pressed }) => [
              {
                backgroundColor: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                padding: 12,
                borderRadius: 8,
                opacity: pressed ? 0.9 : 1,
                flexDirection: "row",
                gap: 8,
              },
            ]}
            onPress={() => {
              downloadFile(file);
            }}
          >
            <ThemedText
              text={file}
              style={{
                color: isDarkMode
                  ? Colors.Text_Dark.Secondary
                  : Colors.Text_Dark.Default,
              }}
            />
          </Pressable>
        ))}
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
