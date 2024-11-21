import { Pressable, Text, View, FlatList } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { useState } from "react";
import { toast } from "sonner-native";
import * as DocumentPicker from "expo-document-picker";
import { useMutation } from "@tanstack/react-query";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useAuthStore from "@/hooks/useAuthStore";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PremiumScreenshotUploadSheet() {
  const { isDarkMode, palette } = useThemeStore();

  const [pickedFiles, setPickedFiles] = useState<any[] | null | undefined>([]);

  const { client_instance, session } = useAuthStore();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const pickFiles = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
      });

      if (response) {
        const files: DocumentPicker.DocumentPickerAsset[] = [];
        response.assets.forEach((file) => {
          if (file.size > file.size / (1024 * 1024)) {
            files.push(file);
          } else {
            toast(
              `File named: ${file.name} is greater than 10 MB, must be smaller than 10MB.`,
              {
                position: "top-center",
                duration: 3000,
              }
            );
          }
        });

        setPickedFiles(files);
      }
    } catch (error) {
      toast(`Error: ${error}`, { duration: 3000 });
    }
  };

  const uploadFiles = async () => {
    try {
      if (pickedFiles?.length >= 1) {
        await SheetManager.hide("premium-screenshot-upload-sheet");

        const formData = new FormData();

        pickedFiles.forEach((file) => {
          formData.append("screenshot", {
            uri: file.uri,
            name: file.name,
            type: file.mimeType || "application/octet-stream",
          });
        });

        formData.append("user_id", session.record.id);

        const createdRecord = await client_instance
          .collection("payment")
          .create(formData);

        return createdRecord;
      } else {
        toast("No files selected.", {
          duration: 1500,
          position: "top-center",
        });
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  const uploadQueryMutation = useMutation({
    mutationFn: uploadFiles,
    onSuccess: () => {
      setPickedFiles([]);
      toast.dismiss();
      toast.success("Payment uploaded, please wait for the process.", {
        duration: 1500,
        dismissible: false,
      });
    },
    onMutate: () => {
      toast.loading("Retrieving payment...", {
        dismissible: false,
      });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Retrieving payment failed.", {
        duration: 1500,
        dismissible: false,
      });
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
    >
      <View style={{ padding: 16, gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText
            text="Upload file"
            style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          />
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Ionicons
              name="add"
              size={24}
              color={iconColor}
              onPress={pickFiles}
            />
          </View>
        </View>
        <FlatList
          data={pickedFiles}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              key={item.name}
            >
              <AntDesign
                name="close"
                size={24}
                color={iconColor}
                onPress={() =>
                  setPickedFiles((prevFiles) =>
                    prevFiles.filter((_, i) => i !== index)
                  )
                }
              />
              <ThemedText text={item.name} color="Tertiary" />
            </View>
          )}
          ListEmptyComponent={null}
          contentContainerStyle={{ gap: 8 }}
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? Colors[palette][500]
                : Colors[palette][600],
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            },
          ]}
          onPress={() => {
            if (!pickedFiles || pickedFiles.length === 0) {
              toast("Please select at least one file.", {
                duration: 1500,
                position: "top-center",
              });
              return;
            }

            uploadQueryMutation.mutate();
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_700Bold",
              color: Colors.Text_Dark.Default,
              textAlign: "center",
            }}
          >
            Upload
          </Text>
        </Pressable>
        <ThemedText
          text="Please provide your screenshot here, we'll process it after. We only need the reference number, please do cover any sensitive information."
          color="Secondary"
        />
      </View>
    </ActionSheet>
  );
}
