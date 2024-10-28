import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import { Pressable, Text, TextInput, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import ThemedText from "./ThemedText";

export default function RegisterSheet() {
  const {
    form,
    resetForm,
    handleRegister,
    setEmail,
    setName,
    setPassword,
    toggleIsAuthing,
  } = useAuthStore();
  const { isDarkMode, palette } = useThemeStore();

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
            text="Register"
            style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          />
          <ThemedText
            text="Your personalized study journey starts here!"
            color="Tertiary"
          />
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
            placeholder="Name"
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
            value={form.name}
            onChangeText={setName}
          />
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
            SheetManager.hide("register-sheet");
            toggleIsAuthing();
            handleRegister();
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}
