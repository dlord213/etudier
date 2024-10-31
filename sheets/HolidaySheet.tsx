import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import React from "react";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import ThemedText from "@/components/ThemedText";

export default function HolidaySheet() {
  const { isDarkMode, palette } = useThemeStore();
  const apiKey = process.env.EXPO_PUBLIC_ETUDIER_API_NINJAS_KEY;

  const [country, setCountry] = useState<string>("");

  const fetchCountryHolidaysData = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/holidays?country=${country}&year=2024`,
        {
          headers: { "X-Api-Key": apiKey },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ["holiday"],
    queryFn: fetchCountryHolidaysData,
    enabled: false,
  });

  const handleSubmit = () => {
    if (!country) {
      console.log(apiKey);
      return;
    }
    console.log(apiKey);
    console.log(country);
    refetch();
  };

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
          text="Holidays"
          style={{ fontFamily: "WorkSans_900Black", fontSize: 36 }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            autoFocus={true}
            onSubmitEditing={handleSubmit}
            enterKeyHint="search"
            style={{
              backgroundColor: Colors.Backgrounds_Light.Brand,
              padding: 8,
              borderRadius: 8,
              fontFamily: "WorkSans_400Regular",
              paddingHorizontal: 16,
              flex: 1,
            }}
            placeholder="Search for a country"
            cursorColor={Colors[palette][600]}
            selectionColor={Colors[palette][600]}
            selectionHandleColor={Colors[palette][600]}
            value={country}
            onChangeText={(val) => setCountry(val)}
          />
        </View>
      </View>
      {data ? (
        <>
          <ScrollView>
            {data
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((holiday, index) => (
                <View
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderColor: Colors.Text_Dark.Secondary,
                  }}
                  key={index}
                >
                  <ThemedText
                    text={holiday.name}
                    style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
                  />
                  <ThemedText
                    text={new Date(holiday.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    color="Secondary"
                  />
                  <ThemedText text={holiday.day} color="Secondary" />
                </View>
              ))}
          </ScrollView>
        </>
      ) : null}
      {isError ? (
        <ThemedText
          text="Can't retrieve data, please try again."
          style={{ paddingHorizontal: 8 }}
        />
      ) : null}
    </ActionSheet>
  );
}
