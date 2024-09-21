import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { forwardRef, useContext } from "react";

import ThemeContext from "@/contexts/ThemeContext";
import Colors from "@/constants/Colors";
import ThemedBottomSheetModalProps from "@/constants/ThemedBottomSheetModalProps";

const ThemedBottomSheetModal = forwardRef<
  BottomSheetMethods,
  ThemedBottomSheetModalProps
>(({ height, onOpen, onClose, children }, ref) => {
  const { palette, theme } = useContext(ThemeContext);

  return (
    <BottomSheet
      style={{
        padding: 16,
        backgroundColor:
          theme != "dark"
            ? Colors.Backgrounds_Light.Default
            : Colors.Backgrounds_Dark.Hover,
        zIndex: 99,
      }}
      ref={ref}
      height={height}
      onOpen={onOpen}
      onClose={onClose}
      closeDuration={500}
      disableKeyboardHandling
      disableBodyPanning
      dragHandleStyle={{
        backgroundColor: Colors[palette][600],
        borderColor: Colors[palette][600],
      }}
    >
      {children}
    </BottomSheet>
  );
});

export default ThemedBottomSheetModal;
