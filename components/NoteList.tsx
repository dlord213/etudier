import { View } from "react-native";
import { useContext } from "react";

import ThemedPressableOpacity from "./ThemedPressableOpacity";
import ThemedText from "./ThemedText";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import NoteProps from "@/constants/NoteProps";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useNoteManager from "@/hooks/useNoteManager";

interface NoteListProps {
  notes: NoteProps[];
  text: any;
  handleDeleteNote: (index: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  text,
  handleDeleteNote,
}) => {
  const { theme } = useContext(ThemeContext);
  const iconColor =
    theme == "dark" ? Colors.Text_Dark.Default : Colors.Text_Light.Default;

  const { storedNotes } = useNoteManager();

  if (storedNotes) {
    return notes.length > 0 ? (
      notes.map((note) => {
        return (
          <ThemedPressableOpacity
            key={note.id}
            onPress={() => {}}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{ flex: 1 }}>
                <ThemedText
                  text={note.title}
                  style={{
                    fontFamily: "WorkSans_700Bold",
                    fontSize: 16,
                    flexWrap: "wrap",
                    flexShrink: 1,
                  }}
                />
                {note.date ? (
                  <ThemedText
                    text={note.date}
                    style={{
                      fontFamily: "WorkSans_400Regular",
                      color:
                        theme == "dark"
                          ? Colors.Text_Dark.Tertiary
                          : Colors.Text_Light.Tertiary,
                      flexWrap: "wrap",
                      flexShrink: 1,
                    }}
                  />
                ) : null}
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <ThemedPressableOpacity onPress={() => handleDeleteNote(index)}>
                <MaterialIcons name="delete" size={24} color={iconColor} />
              </ThemedPressableOpacity>
            </View>
          </ThemedPressableOpacity>
        );
      })
    ) : (
      <ThemedText text={text} style={{ fontFamily: "WorkSans_400Regular" }} />
    );
  }
};

export default NoteList;
