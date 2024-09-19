interface TabBarButtonProps {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  icon: (props: any) => JSX.Element;
}

export default TabBarButtonProps;
