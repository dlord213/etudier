import { Pressable, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

export default function PremiumPaymentSheet() {
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
      <View style={{ padding: 16, gap: 8 }}>
        <ThemedText
          text="Payment"
          style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
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
          onPress={async () => {
            await SheetManager.hide("premium-payment-sheet");
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
            InstaPay/GCash
          </Text>
        </Pressable>
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
            await SheetManager.hide("premium-payment-sheet");
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
            PayPal
          </Text>
        </Pressable>
        <ThemedText
          text="After the payment, please wait for our server to process it. It might not reflect immediately on your end."
          color="Secondary"
        />
      </View>
    </ActionSheet>
  );
}
