import React from "react";
import { Modal } from "src/components/blocks";
import Link from "next/link";

interface LoginRequiredModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
  modalRef,
}) => {
  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  //
  //
  //
  const modalHeader = (
    <div>
      <strong className="text-xl font-bold">로그인이 필요한 기능입니다.</strong>
    </div>
  );

  const modalBody = (
    <div className="py-2">
      <p className="text-lg whitespace-pre-wrap">로그인 하시겠습니까?</p>
    </div>
  );

  const modalAction = (
    <div>
      <button className="btn mr-3 btn-netural btn-outline">
        <span>취소</span>
      </button>
      <Link href="/login" className="btn btn-primary">
        확인
      </Link>
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
      ModalAction={modalAction}
      onClose={handleModalClose}
    />
  );
};

export default LoginRequiredModal;
