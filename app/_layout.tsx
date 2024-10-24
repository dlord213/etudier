import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(dashboard)" options={{ animation: "fade" }} />
      <Stack.Screen name="user" options={{ animation: "fade_from_bottom" }} />
    </Stack>
  );
}
