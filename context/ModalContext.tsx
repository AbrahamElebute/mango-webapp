import React, { createContext, useContext, useState, ReactNode } from "react";
import Modal from "@/components/ui/modal/Modal";

interface ModalState {
  opened: boolean;
  content: ReactNode | null;
}

interface ModalContextProps {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    opened: false,
    content: null,
  });

  const openModal = (content: ReactNode) => {
    setModalState({ opened: true, content });
  };

  const closeModal = () => {
    setModalState({ opened: false, content: null });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal opened={modalState.opened} onClose={closeModal}>
        {modalState.content}
      </Modal>
    </ModalContext.Provider>
  );
};
