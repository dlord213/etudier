import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

export default function PremiumGCashPaymentSheet() {
  const { isDarkMode, palette } = useThemeStore();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

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
        <ThemedText
          text="Payment"
          style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
        />
        <View>
          <ThemedText
            text="A* AH**R D."
            style={{ fontFamily: "WorkSans_700Bold" }}
          />
          <ThemedText
            text="09261703807"
            style={{ fontFamily: "WorkSans_700Bold" }}
          />
        </View>
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
          onPress={async () => {
            await SheetManager.hide("premium-gcash-payment-sheet");
            SheetManager.show("premium-screenshot-upload-sheet");
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_700Bold",
              color: Colors.Text_Dark.Default,
              textAlign: "center",
            }}
          >
            Next
          </Text>
        </Pressable>
        <ThemedText text="The details above is for GCash only." color="Secondary" />
      </View>
    </ActionSheet>
  );
}
