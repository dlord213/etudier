import { Pressable, Text, TextInput, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import { toast } from "sonner-native";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function EditProfileSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { client_instance, session, updateSession } = useAuthStore();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const dataMutation = useMutation({
    mutationFn: async () => {
      try {
        const userData: Record<string, string> = {};
        if (username) userData.username = username;
        if (name) userData.name = name;

        if (Object.keys(userData).length === 0) {
          throw new Error("No fields to update.");
        }

        const updateRecord = await client_instance
          .collection("users")
          .update(session.record.id, userData);

        return updateRecord;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      toast.dismiss();
      updateSession();
      toast.success("Changes saved!", { dismissible: false, duration: 3000 });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Profile changes not saved!", {
        dismissible: false,
        duration: 3000,
      });
    },

    onMutate: () => {
      toast.dismiss();
      toast.loading("Saving...", { dismissible: false });
    },
  });

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
      onClose={() => {
        setName("");
        setUsername("");
      }}
    >
      <View style={{ padding: 16 }}>
        <ThemedText
          text="Edit profile"
          style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
        />
        <View style={{ gap: 8, marginVertical: 16 }}>
          <TextInput
            style={{
              backgroundColor: isDarkMode
                ? Colors.Backgrounds_Light.Brand
                : Colors[palette][200],
              padding: 8,
              borderRadius: 8,
              fontFamily: "WorkSans_400Regular",
              paddingHorizontal: 16,
            }}
            placeholder="Name"
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={{
              backgroundColor: isDarkMode
                ? Colors.Backgrounds_Light.Brand
                : Colors[palette][200],
              padding: 8,
              borderRadius: 8,
              fontFamily: "WorkSans_400Regular",
              paddingHorizontal: 16,
            }}
            placeholder="Username"
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 16,
          }}
          onPress={() => {
            SheetManager.hide("settings-edit-profile-sheet");
            dataMutation.mutate();
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Save changes
          </Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}
