import {
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_900Black,
  useFonts,
} from "@expo-google-fonts/work-sans";
import { useEffect } from "react";
import { Redirect, SplashScreen } from "expo-router";

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

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Redirect href="initial_boot" />;
}
