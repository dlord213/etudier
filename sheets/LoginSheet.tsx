import { Pressable, Text, TextInput, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import { toast } from "sonner-native";

export default function LoginSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const {
    form,
    resetForm,
    setPassword,
    setEmail,
    toggleIsAuthing,
    handleLogin,
  } = useAuthStore();

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
      <View style={{ padding: 16 }}>
        <View>
          <ThemedText
            text="Login"
            style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          />
          <ThemedText text="Pick up where you left off." color="Tertiary" />
        </View>
        <View style={{ gap: 8, marginVertical: 16 }}>
          <TextInput
            style={{
              backgroundColor: Colors.Backgrounds_Light.Brand,
              padding: 8,
              borderRadius: 8,
              fontFamily: "WorkSans_400Regular",
              paddingHorizontal: 16,
            }}
            placeholder="Email Address"
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
            value={form.email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{
              backgroundColor: Colors.Backgrounds_Light.Brand,
              padding: 8,
              borderRadius: 8,
              fontFamily: "WorkSans_400Regular",
              paddingHorizontal: 16,
            }}
            placeholder="Password"
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
            value={form.password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 16,
          }}
          onPress={() => {
            if (form.password.length < 8) {
              toast("Password must be atleast 8 characters.", {
                duration: 3000,
                style: { zIndex: 999 },
              });
              return;
            }
            SheetManager.hide("login-sheet");
            toggleIsAuthing();
            handleLogin();
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}
