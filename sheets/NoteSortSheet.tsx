import { Switch, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";
import useNoteStore from "@/hooks/useNoteStore";

export default function NoteSortSheet() {
  const { isDarkMode, palette } = useThemeStore();

  const {
    isSortingNotesAscending,
    isSortingNotesDescending,
    toggleIsSortingNotesAscending,
    toggleIsSortingNotesDescending,
  } = useNoteStore();

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
        <View>
          <View style={{ marginBottom: 16 }}>
            <ThemedText
              text="Can't find it?"
              style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
            />
            <ThemedText text="Sort your notes!" color="Tertiary" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText text="Sort to ascending by date" />
            <Switch
              value={isSortingNotesAscending}
              onValueChange={toggleIsSortingNotesAscending}
              thumbColor={Colors[palette][600]}
              trackColor={{
                false: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                true: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
              }}
              disabled={isSortingNotesAscending ? true : false}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText text="Sort to descending by date" />
            <Switch
              value={isSortingNotesDescending}
              onValueChange={toggleIsSortingNotesDescending}
              thumbColor={Colors[palette][600]}
              trackColor={{
                false: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
                true: isDarkMode
                  ? Colors.Backgrounds_Light.Brand
                  : Colors.Backgrounds_Dark.Brand,
              }}
              disabled={isSortingNotesDescending ? true : false}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}
