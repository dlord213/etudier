import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { forwardRef, useContext } from "react";
import ThemeContext from "@/contexts/ThemeContext";
import Colors from "@/constants/Colors";

interface ThemedBottomSheetModalProps {
  ref: React.RefObject<BottomSheetMethods>;
  onOpen?: Function | undefined;
  onClose?: Function | undefined;
  children: React.ReactNode;
  height?: string | number;
}

const ThemedBottomSheetModal = forwardRef<
  BottomSheetMethods,
  ThemedBottomSheetModalProps
>(({ height = "50%", onOpen, onClose, children }, ref) => {
  const { palette, theme } = useContext(ThemeContext);

  return (
    <BottomSheet
      style={{
        padding: 16,
        backgroundColor:
          theme != "dark"
            ? Colors[palette][600]
            : Colors.Backgrounds_Dark.Hover,
      }}
      ref={ref}
      height={height}
      onOpen={onOpen}
      onClose={onClose}
      disableKeyboardHandling
      closeDuration={250}
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
