'use client';

import React from 'react';

import dynamic from 'next/dynamic';

const DynamicSignInModal = dynamic(
  () => import(`src/components/pages/SignIn/SignInModal`)
);

type modalType = 'loginRequire';

//
//
//
export const ModalsContext = React.createContext({
  onModalOpen: (_: modalType) => {},
  onModalClose: (_: modalType) => {},
});

interface NoticeProviderProps {
  children: React.ReactNode;
}

const ModalsProvider: React.FC<NoticeProviderProps> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  const onModalOpen = (modalType: modalType) => {
    switch (modalType) {
      case 'loginRequire':
        setIsLoginModalOpen(true);

      default:
        return;
    }
  };

  const onModalClose = (modalType: modalType) => {
    switch (modalType) {
      case 'loginRequire':
        setIsLoginModalOpen(false);

      default:
        return;
    }
  };

  return (
    <ModalsContext.Provider
      value={{ onModalOpen: onModalOpen, onModalClose: onModalClose }}
    >
      {children}
      <DynamicSignInModal isOpen={isLoginModalOpen} />
    </ModalsContext.Provider>
  );
};

//
//
//
export const useModals = () => {
  return React.useContext(ModalsContext);
};

export default ModalsProvider;
