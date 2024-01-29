'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import { Modal } from 'src/components/blocks';

interface ProposeLoadingModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

const ProposeLoadingModal: React.FC<ProposeLoadingModalProps> = ({
  modalRef,
}) => {
  const pathname = usePathname();

  //
  //
  //
  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  // If pahtname changes, then close loaing modal
  React.useEffect(() => {
    handleModalClose();
  }, [pathname]);

  //
  //
  //
  const modalBody = (
    <div className="p-6 w-full flex justify-center items-center flex-col">
      <span className="loading loading-dots text-center loading-md text-primary mb-4"></span>
      <h1 className="font-bold text-center">
        리빙랩 프로젝트를 생성 중입니다.
      </h1>
    </div>
  );
  //
  //
  //
  return (
    <Modal
      ref={modalRef}
      ModalBody={modalBody}
      modalBoxStyles="p-0"
      onClose={e => {
        e.preventDefault();
        handleModalClose();
      }}
    />
  );
};

export default ProposeLoadingModal;
