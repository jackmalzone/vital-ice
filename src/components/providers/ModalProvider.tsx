'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import MindbodyModal from '@/components/ui/MindbodyModal/MindbodyModal';

interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log('ModalProvider: openModal called');
    setIsModalOpen(true);
  };
  const closeModal = () => {
    console.log('ModalProvider: closeModal called');
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <MindbodyModal isOpen={isModalOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
}; 