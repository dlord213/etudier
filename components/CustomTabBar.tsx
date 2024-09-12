import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function CustomTabBar({ state, descriptors, navigation }) {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles(theme);

  const icons = {
    index: (props: any) => <MaterialIcons name="home" size={24} {...props} />,
    notes: (props: any) => (
      <MaterialIcons name="assignment-add" size={24} {...props} />
    ),
  };

  return (
    <View style={styleState.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {icons[route.name]({
              color: isFocused ? Colors[palette][600] : Colors[palette][300],
            })}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = (context: any) =>
  StyleSheet.create({
    tabBar: {
      flexDirection: "row",
      position: "absolute",
      bottom: 25,
      padding: 16,
      borderRadius: 16,
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 50,
      backgroundColor:
        context != "dark"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      borderWidth: 0,
    },
  });

export default CustomTabBar;
