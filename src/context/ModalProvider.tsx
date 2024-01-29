'use client';

import React from 'react';

import dynamic from 'next/dynamic';

const DynamicLoginRequiredModal = dynamic(
  () => import(`src/components/pages/Global/LoginRequireModal`)
);

const DynamicProposeLoadingModal = dynamic(
  () => import(`src/components/pages/Global/ProposeLoadingModal`)
);

type modalType = 'loginRequire' | 'proposeLoading';

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
  const loginRequiredModalRef = React.useRef<HTMLDialogElement>(null);
  const proposeLoadingModalRef = React.useRef<HTMLDialogElement>(null);

  const onModalOpen = (modalType: modalType) => {
    switch (modalType) {
      case 'loginRequire':
        return loginRequiredModalRef.current?.showModal();
      case 'proposeLoading':
        return proposeLoadingModalRef.current?.showModal();
      default:
        return;
    }
  };

  const onModalClose = (modalType: modalType) => {
    switch (modalType) {
      case 'loginRequire':
        return loginRequiredModalRef.current?.close();
      case 'proposeLoading':
        return proposeLoadingModalRef.current?.close();
      default:
        return;
    }
  };

  return (
    <ModalsContext.Provider
      value={{ onModalOpen: onModalOpen, onModalClose: onModalClose }}
    >
      {children}
      <DynamicLoginRequiredModal modalRef={loginRequiredModalRef} />
      <DynamicProposeLoadingModal modalRef={proposeLoadingModalRef} />
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
