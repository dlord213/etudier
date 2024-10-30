import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import { Pressable, Text } from "react-native";
import ThemedText from "./ThemedText";
import { router } from "expo-router";

interface NoteItemComponentProps {
  title: string;
  date: Date;
}

export default function NoteItemComponent({
  title,
  date,
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
      ]}
    >
      <ThemedText
        text={new Date(date).toLocaleDateString()}
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
    </Pressable>
  );
}
