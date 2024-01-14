'use client';

import React from 'react';

import { Modal } from 'src/components/blocks';

import { FindPasswordView, SignInView, SignUpView } from './AuthModal';

export type AUTH_VIEW_TYPE = 'sign-in' | 'sign-up' | 'find-password';

interface LoginRequiredModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
  modalRef,
}) => {
  const [view, setView] = React.useState<AUTH_VIEW_TYPE>('sign-in');

  //
  //
  //
  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setView('sign-in');
    }
  };

  //
  //
  //
  const modalHeader = (
    <div className="border-b border-gray-200 p-4">
      <h1 className="font-bold text-center">
        {view === 'find-password' ? '비밀번호 찾기' : '로그인 또는 회원가입'}
      </h1>
    </div>
  );

  const renderAuthView = (view: AUTH_VIEW_TYPE) => {
    switch (view) {
      // 회원가입
      case 'sign-up':
        return (
          <SignUpView
            key="sign-up"
            handlecAuthViewChange={view => setView(view)}
            handleModalClose={handleModalClose}
          />
        );

      // 비밀번호 찾기
      case 'find-password':
        return <FindPasswordView key="find-password" />;

      // 로그인
      case 'sign-in':
      default:
        return (
          <SignInView
            key="sign-in"
            handlecAuthViewChange={view => setView(view)}
            handleModalClose={handleModalClose}
          />
        );
    }
  };

  const modalBody = (
    <div className="px-4 py-6">
      {view !== 'find-password' ? (
        <p className="font-bold mb-3 text-lg">MOLAB에 오신 것을 환영합니다!</p>
      ) : null}

      {renderAuthView(view)}
    </div>
  );

  //
  //
  //
  return (
    <Modal
      closeBtn
      ref={modalRef}
      ModalHeader={modalHeader}
      ModalBody={modalBody}
      modalBoxStyles="p-0"
      onClose={e => {
        e.preventDefault();
        handleModalClose();
      }}
    />
  );
};

export default LoginRequiredModal;
