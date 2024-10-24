import { create } from "zustand";

interface ModalSheetStoreInterface {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
}

const useModalSheetStore = create<ModalSheetStoreInterface>()((set, get) => ({
  isModalOpen: false,
  setIsModalOpen: () => set({ isModalOpen: !get().isModalOpen }),
}));

export default useModalSheetStore;
