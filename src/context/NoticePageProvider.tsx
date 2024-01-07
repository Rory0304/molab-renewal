'use client';

import React from 'react';

import dynamic from 'next/dynamic';

const DynamicLoginRequiredModal = dynamic(
  () => import(`src/components/pages/Global/LoginRequireModal`)
);

//
//
//
export const NoticePageContext = React.createContext({
  onLoginRequireModalOpen: () => {},
});

interface NoticeProviderProps {
  children: React.ReactNode;
}

const NoticePageProvider: React.FC<NoticeProviderProps> = ({ children }) => {
  const loginRequiredModalRef = React.useRef<HTMLDialogElement>(null);

  const onLoginRequireModalOpen = () => {
    loginRequiredModalRef.current?.showModal();
  };

  return (
    <NoticePageContext.Provider
      value={{ onLoginRequireModalOpen: onLoginRequireModalOpen }}
    >
      {children} <DynamicLoginRequiredModal modalRef={loginRequiredModalRef} />
    </NoticePageContext.Provider>
  );
};

//
//
//
export const useNoticePageContext = () => {
  return React.useContext(NoticePageContext);
};

export default NoticePageProvider;
