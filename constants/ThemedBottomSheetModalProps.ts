import { BottomSheetMethods } from "@devvie/bottom-sheet";

interface ThemedBottomSheetModalProps {
  ref: React.RefObject<BottomSheetMethods>;
  onOpen?: Function | undefined;
  onClose?: Function | undefined;
  children: React.ReactNode;
  height?: string | number;
}

export default ThemedBottomSheetModalProps;
