import {
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_900Black,
  useFonts,
} from "@expo-google-fonts/work-sans";
import { useEffect, useState } from "react";
import { Redirect, SplashScreen } from "expo-router";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_900Black,
  });
  const [isInitialBoot, setIsInitialBoot] = useState<boolean | null>(null);

  async function checkIfInitialBoot() {
    let result = await SecureStore.getItemAsync("name");
    if (result) {
      setIsInitialBoot(false);
    } else {
      await AsyncStorage.setItem("@tasks", "[]");
      setIsInitialBoot(true);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      if (loaded || error) {
        await SplashScreen.hideAsync();
        checkIfInitialBoot();
      }
    };

    initialize();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  if (isInitialBoot === null) {
    return null;
  }

  if (isInitialBoot) {
    return <Redirect href="/initial_boot" />;
  } else {
    return <Redirect href="/(tabs)" />;
  }
}
