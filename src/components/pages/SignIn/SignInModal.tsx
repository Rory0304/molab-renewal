'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Modal } from 'src/components/blocks';
import { useModals } from 'src/context/ModalProvider';

import { SignInWithEmailView } from './SignInWithEmailView';
import { SignInWithGoogleView } from './SignInWithGoogleView';

interface SignInModalProps {
  isOpen: boolean;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen }) => {
  const { onModalClose } = useModals();

  const methods = useForm<{
    email: string;
    password: string;
  }>({ mode: 'all' });

  const handleModalClose = () => {
    methods.reset();
    onModalClose('loginRequire');
  };

  const modalHeader = (
    <div className="p-4 border-b border-gray-200">
      <h1 className="font-bold text-center">로그인 또는 회원가입</h1>
    </div>
  );

  const modalBody = (
    <FormProvider {...methods}>
      <div className="px-4 py-6">
        <SignInWithEmailView onCloseModal={handleModalClose} />
        <div className="divider" />
        <SignInWithGoogleView />
      </div>
    </FormProvider>
  );

  //
  //
  //
  return (
    <Modal
      closeBtn
      open={isOpen}
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

export default SignInModal;
