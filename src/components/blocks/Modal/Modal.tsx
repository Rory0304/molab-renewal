"use client";

import React from "react";

interface ModalProps {
  open?: boolean;
  id?: string;
  formId?: string;
  modalStyles?: string;
  modalBoxStyles?: string;
  ModalHeader?: React.ReactElement;
  ModalBody?: React.ReactElement;
  ModalAction?: React.ReactElement;
  closeBtn?: boolean;
  onClose?: () => void;
}

const Modal = React.forwardRef(
  (
    {
      id,
      formId,
      open,
      ModalHeader,
      ModalBody,
      ModalAction,
      modalStyles,
      modalBoxStyles,
      closeBtn = false,
      onClose,
    }: ModalProps,
    ref: React.Ref<HTMLDialogElement>
  ) => {
    return (
      <dialog
        ref={ref}
        id={id}
        className={`modal ${modalStyles ?? ""}`}
        open={open}
      >
        <form
          id={formId}
          method="dialog"
          className={`modal-box ${modalBoxStyles ?? ""}`}
        >
          {ModalHeader ? ModalHeader : null}
          {ModalBody ? ModalBody : null}
          {ModalAction ? (
            <div className="modal-action">{ModalAction}</div>
          ) : null}
          {closeBtn ? (
            <button
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
          ) : null}
        </form>
      </dialog>
    );
  }
);

Modal.displayName = "Modal";
export default Modal;
