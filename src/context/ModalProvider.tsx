'use client';

import React from 'react';

import dynamic from 'next/dynamic';

const DynamicLoginRequiredModal = dynamic(
  () => import(`src/components/pages/Global/LoginRequireModal`)
);

type modalType = 'loginRequire';

//
//
//
export const ModalsContext = React.createContext({
  onModalOpen: (_: modalType) => {},
});

interface NoticeProviderProps {
  children: React.ReactNode;
}

const ModalsProvider: React.FC<NoticeProviderProps> = ({ children }) => {
  const loginRequiredModalRef = React.useRef<HTMLDialogElement>(null);

  const onModalOpen = (modalType: modalType) => {
    switch (modalType) {
      case 'loginRequire':
        return loginRequiredModalRef.current?.showModal();
      default:
        return;
    }
  };

  return (
    <ModalsContext.Provider value={{ onModalOpen: onModalOpen }}>
      {children} <DynamicLoginRequiredModal modalRef={loginRequiredModalRef} />
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
