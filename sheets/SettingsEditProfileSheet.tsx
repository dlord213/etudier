import { Image, Pressable, Text, TextInput, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { toast } from "sonner-native";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

import Colors from "@/constants/Colors";
import useAuthStore from "@/hooks/useAuthStore";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function EditProfileSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { client_instance, session, updateSession } = useAuthStore();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imgFilePath, setImgFilePath] = useState<any[]>([]);

  const avatarSource =
    imgFilePath.uri ||
    client_instance.files.getUrl(session.record, session.record.avatar);

  const dataMutation = useMutation({
    mutationFn: async () => {
      try {
        const formData = new FormData();

        if (username) formData.append("username", username);
        if (name) formData.append("name", name);

        if (imgFilePath.length >= 1) {
          formData.append("avatar", {
            uri: imgFilePath.uri,
            name: imgFilePath.name,
            type: imgFilePath.mimeType || "image/jpeg",
          });
        }

        const updateRecord = await client_instance
          .collection("users")
          .update(session.record.id, formData);

        return updateRecord;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      toast.dismiss();
      updateSession();
      toast.success("Changes saved!", { dismissible: false, duration: 3000 });
      setName("");
      setUsername("");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Profile changes not saved!", {
        dismissible: false,
        duration: 3000,
      });
      setName("");
      setUsername("");
    },
    onMutate: () => {
      toast.dismiss();
      toast.loading("Saving...", { dismissible: false });
    },
  });

  const pickFile = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
      });

      if (response && response.assets && response.assets.length > 0) {
        const file = response.assets[0];
        if (file && file.size < 5242880) {
          setImgFilePath(file);
          console.log(file);
        } else {
          throw new Error("File URI is not available.");
        }
      } else {
        throw new Error("No file selected or invalid response.");
      }
    } catch (error) {
      console.error("Error picking file:", error);
      toast(`Error: ${error.message || error}`, { duration: 3000 });
    }
  };

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
      onClose={() => {}}
    >
      <View style={{ padding: 16 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          {!avatarSource ? (
            <FontAwesome
              name="user-circle"
              size={64}
              color={
                isDarkMode
                  ? Colors.Text_Dark.Default
                  : Colors.Text_Light.Default
              }
            />
          ) : (
            <Image
              style={{
                width: 64,
                height: 64,
                backgroundColor: isDarkMode
                  ? Colors.Backgrounds_Dark.Brand
                  : Colors.Backgrounds_Light.Brand,
                borderRadius: 999,
              }}
              src={avatarSource}
            />
          )}
          <Pressable
            onPress={() => {
              pickFile();
            }}
          >
            <ThemedText text="Upload picture" color="Tertiary" />
          </Pressable>
        </View>
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
