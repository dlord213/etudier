import { Pressable, Text, ViewStyle } from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "./ThemedText";

interface NoteItemComponentProps {
  title: string;
  description?: string;
  date: Date;
  style?: ViewStyle;
}

export default function NoteItemComponent({
  title,
  description,
  date,
  style,
}: NoteItemComponentProps) {
  const { palette } = useThemeStore();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/notes/[id]",
          params: { id: date.toString() },
        })
      }
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? Colors[palette][300]
            : Colors[palette][200],
          padding: 12,
          borderRadius: 8,
        },
        style,
      ]}
    >
      <ThemedText
        text={new Date(date).toLocaleDateString("en-US")}
        color="Secondary"
      />
      <Text
        style={{
          fontFamily: "WorkSans_700Bold",
          color: Colors[palette][600],
          fontSize: 20,
        }}
      >
        {title}
      </Text>
      {description ? <ThemedText text={description} color="Secondary" /> : null}
    </Pressable>
  );
}
