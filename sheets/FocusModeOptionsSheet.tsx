import { Pressable, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import { toast } from "sonner-native";

export default function FocusModeOptionsSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { form, resetForm, toggleIsAuthing, handleLogin } = useAuthStore();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
      onClose={() => {
        resetForm();
      }}
    >
      <View style={{ padding: 16, gap: 12 }}>
        <View>
          <ThemedText
            text="Options"
            style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          />
          <ThemedText text="Customize your focus mode!" color="Tertiary" />
        </View>
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 16,
          }}
          onPress={() => {
            SheetManager.hide("focus-mode-options-sheet");
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Set focus mode time
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 16,
          }}
          onPress={() => {
            SheetManager.hide("focus-mode-options-sheet");
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Set break mode time
          </Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}
