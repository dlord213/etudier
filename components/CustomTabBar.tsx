import { useContext } from "react";
import { View, StyleSheet } from "react-native";

import TabBarButton from "./TabBarButton";
import Colors from "@/constants/Colors";
import ThemeContext from "@/contexts/ThemeContext";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function CustomTabBar({ state, descriptors, navigation, isTabBarVisible }) {
  const { palette, theme } = useContext(ThemeContext);

  const styleState = styles([palette, theme, isTabBarVisible]);

  const icons = {
    index: (props: any) => <MaterialIcons name="home" size={24} {...props} />,
    notes: (props: any) => (
      <MaterialIcons name="assignment-add" size={24} {...props} />
    ),
    timer: (props: any) => <MaterialIcons name="timer" size={24} {...props} />,
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
          <TabBarButton
            key={route.name}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            icon={icons[route.name]}
          />
        );
      })}
    </View>
  );
}

const styles = (context: any) =>
  StyleSheet.create({
    tabBar: {
      display: context[2] ? "flex" : "none",
      flexDirection: "row",
      position: "absolute",
      bottom: 25,
      padding: 16,
      borderRadius: 24,
      justifyContent: "space-around",
      alignItems: "center",
      marginHorizontal: 40,
      backgroundColor:
        context[1] != "dark"
          ? Colors[context[0]][600]
          : Colors.Backgrounds_Dark.Hover,
      borderWidth: 0,
    },
  });

export default CustomTabBar;
