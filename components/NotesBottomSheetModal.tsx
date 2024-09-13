import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { ViewStyle } from "react-native";
import { forwardRef } from "react";

interface NotesBottomSheetModalProps {
  ref: React.RefObject<BottomSheetMethods>;
  style?: Omit<
    ViewStyle,
    "height" | "minHeight" | "maxHeight" | "transform:[{translateY}]"
  >;
  onOpen?: Function | undefined;
  onClose?: Function | undefined;
  children: React.ReactNode;
}

const NotesBottomSheetModal = forwardRef<
  BottomSheetMethods,
  NotesBottomSheetModalProps
>(({ style, onOpen, onClose, children }, ref) => {
  return (
    <BottomSheet
      style={style}
      ref={ref}
      height="50%"
      onOpen={onOpen}
      onClose={onClose}
      disableKeyboardHandling
      closeDuration={250}
    >
      {children}
    </BottomSheet>
  );
});

export default NotesBottomSheetModal;
