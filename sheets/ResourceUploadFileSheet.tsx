import React from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { toast } from "sonner-native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import useAuthStore from "@/hooks/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export default function ResourceUploadFileSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { height: screenHeight } = useWindowDimensions();

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const [pageIndex, setPageIndex] = useState(0);

  const [pickedFiles, setPickedFiles] = useState<any[] | null | undefined>([]);

  const { client_instance, session } = useAuthStore();

  const iconColor = isDarkMode
    ? Colors.Text_Dark.Default
    : Colors.Text_Light.Default;

  const pickFiles = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*",
          "application/pdf",
          "text/*",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/vnd.ms-powerpoint",
        ],
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (response) {
        const files: DocumentPicker.DocumentPickerAsset[] = [];
        response.assets.forEach((file) => {
          if (files.length >= 5) {
            toast("Other files not selected, maximum files reached.", {
              position: "top-center",
              duration: 3000,
            });
            return;
          } else {
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
        SheetManager.hide("hub-resource-upload-file-sheet");

        const formData = new FormData();

        pickedFiles.forEach((file) => {
          formData.append("resource_files", {
            uri: file.uri,
            name: file.name,
            type: file.mimeType || "application/octet-stream",
          });
        });

        formData.append("user_id", session.record.id);
        formData.append("title", title || "");
        formData.append("description", description || "");

        const createdRecord = await client_instance
          .collection("resource")
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
      toast.success("Files uploaded successfully!", {
        duration: 1500,
        dismissible: false,
      });
    },
    onMutate: () => {
      toast.loading("Uploading files", {
        dismissible: false,
      });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Files not uploaded, try again.", {
        duration: 1500,
        dismissible: false,
      });
    },
  });

  const pages = [
    <>
      <View style={{ padding: 16, gap: 16 }}>
        <View>
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
          <ThemedText text="Share your resource!" color="Tertiary" />
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
          ListEmptyComponent={
            <ThemedText text="No files picked." color="Tertiary" />
          }
          contentContainerStyle={{ gap: 8 }}
        />
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 16,
          }}
          onPress={() => {
            SheetManager.hide("login-sheet");
            if (!pickedFiles || pickedFiles.length === 0) {
              toast("Please select at least one file.", {
                duration: 1500,
                position: "top-center",
              });
              return;
            }

            setPageIndex(1);
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </>,
    <>
      <View style={{ padding: 16, gap: 16 }}>
        <View>
          <ThemedText
            text="Upload file"
            style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
          />
          <ThemedText
            text="Any information about the resource/s?"
            color="Tertiary"
          />
        </View>
        <TextInput
          style={{
            backgroundColor: Colors.Backgrounds_Light.Brand,
            paddingVertical: 8,
            borderRadius: 8,
            fontFamily: "WorkSans_400Regular",
            paddingHorizontal: 16,
          }}
          placeholder="Title"
          cursorColor={Colors[palette][600]}
          selectionColor={Colors[palette][600]}
          selectionHandleColor={Colors[palette][600]}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          multiline={true}
          style={{
            backgroundColor: Colors.Backgrounds_Light.Brand,
            paddingVertical: 8,
            borderRadius: 8,
            fontFamily: "WorkSans_400Regular",
            paddingHorizontal: 16,
            height: screenHeight / 3,
            textAlignVertical: "top",
          }}
          placeholder="Description"
          cursorColor={Colors[palette][600]}
          selectionColor={Colors[palette][600]}
          selectionHandleColor={Colors[palette][600]}
          value={description}
          onChangeText={setDescription}
        />
        <Pressable
          style={{
            backgroundColor: Colors[palette][600],
            padding: 16,
            borderRadius: 16,
          }}
          onPress={() => {
            SheetManager.hide("login-sheet");
            if (!pickedFiles || pickedFiles.length === 0) {
              toast("Please select at least one file.", {
                duration: 1500,
                position: "top-center",
              });
              return;
            }

            if (!title || title.trim() === "") {
              toast("Please provide a title for the resource.", {
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
              fontFamily: "WorkSans_400Regular",
              color: "#FAFAFA",
              textAlign: "center",
            }}
          >
            Upload
          </Text>
        </Pressable>
      </View>
    </>,
  ];

  useEffect(() => {
    console.log(pickedFiles);
  }, [pickedFiles]);

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
    >
      {pages[pageIndex]}
    </ActionSheet>
  );
}
