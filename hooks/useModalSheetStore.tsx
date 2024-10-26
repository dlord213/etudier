import { create } from "zustand";

interface ModalSheetStoreInterface {
  isModalOpen: boolean;
  toggleModalVisibility: () => void;
}

const useModalSheetStore = create<ModalSheetStoreInterface>()((set, get) => ({
  isModalOpen: false,
  toggleModalVisibility: () => {
    set({ isModalOpen: !get().isModalOpen });
  },
}));

export default useModalSheetStore;
