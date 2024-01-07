'use client';

import React from 'react';
import ReactDOM from 'react-dom';

import { isBrowser } from 'src/utils/browser';

interface ModalProps {
  open?: boolean;
  id?: string;
  formId?: string;
  modalStyles?: string;
  modalBoxStyles?: string;
  ModalHeader?: React.ReactNode;
  ModalBody?: React.ReactNode;
  ModalAction?: React.ReactNode;
  closeBtn?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    if (!isBrowser || !mounted) return <></>;

    return ReactDOM.createPortal(
      <dialog
        ref={ref}
        id={id}
        className={`modal ${modalStyles ?? ''}`}
        open={open}
      >
        <div className={`modal-box ${modalBoxStyles ?? ''}`}>
          <header>
            {ModalHeader ? ModalHeader : null}
            {closeBtn ? (
              <form
                id={formId}
                method="dialog"
                className="absolute right-4 top-4"
              >
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={onClose}
                >
                  ✕
                </button>
              </form>
            ) : null}
          </header>
          {ModalBody ? ModalBody : null}
          {ModalAction ? (
            <div className="modal-action">{ModalAction}</div>
          ) : null}
        </div>
      </dialog>,
      document.body.querySelector('main') || document.body
    );
  }
);

Modal.displayName = 'Modal';
export default Modal;
