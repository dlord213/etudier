import { Pressable, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

export default function PremiumUpgradeSheet() {
  const { isDarkMode, palette } = useThemeStore();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: isDarkMode
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
        padding: 16,
      }}
    >
      <View style={{ padding: 16 }}>
        <View style={{ gap: 16 }}>
          <View>
            <ThemedText
              text="Premium"
              style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
            />
            <ThemedText
              text="Upgrade your account for premium features!"
              color="Tertiary"
            />
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: isDarkMode
                ? Colors.Text_Dark.Default
                : Colors.Text_Light.Default,
              borderRadius: 16,
            }}
          />
          <ThemedText text="• Customizable time intervals on focus mode" />
          <ThemedText text="• Access premium flashcard/quiz" />
          <ThemedText text="• More colors on themes" />
          <ThemedText text="• Cloud sync" />
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? Colors[palette][500]
                    : Colors[palette][600],
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 8,
                  flex: 1,
                },
              ]}
              onPress={async () => {
                await SheetManager.hide("premium-upgrade-sheet");
                SheetManager.show("premium-payment-sheet");
              }}
            >
              <Text
                style={{
                  fontFamily: "WorkSans_700Bold",
                  color: Colors.Text_Dark.Default,
                  textAlign: "center",
                }}
              >
                ₱59.00/month
              </Text>
            </Pressable>
          </View>
          <ThemedText
            text="By purchasing this subscription, you agree that there's no refunds."
            color="Secondary"
          />
        </View>
      </View>
    </ActionSheet>
  );
}
