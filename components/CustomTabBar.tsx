import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function CustomTabBar({ state, descriptors, navigation, isTabBarVisible }) {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles([theme, isTabBarVisible]);

  const icons = {
    index: (props: any) => <MaterialIcons name="home" size={24} {...props} />,
    notes: (props: any) => (
      <MaterialIcons name="assignment-add" size={24} {...props} />
    ),
    timer: (props: any) => <MaterialIcons name="timer" size={24} {...props} />,
  };

  const iconColor =
    theme != "dark" ? Colors[palette][200] : Colors[palette][300];
  const activeIconColor =
    theme != "dark" ? Colors[palette][500] : Colors[palette][600];

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
            key={route.name}
          >
            {icons[route.name]({
              color: isFocused ? activeIconColor : iconColor,
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
      display: context[1] ? "flex" : "none",
      flexDirection: "row",
      position: "absolute",
      bottom: 25,
      padding: 16,
      borderRadius: 24,
      justifyContent: "space-around",
      alignItems: "center",
      marginHorizontal: 40,
      backgroundColor:
        context[0] != "dark"
          ? Colors.Backgrounds_Dark.Brand
          : Colors.Backgrounds_Light.Brand,
      borderWidth: 0,
    },
  });

export default CustomTabBar;
