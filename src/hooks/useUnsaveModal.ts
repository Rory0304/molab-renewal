"use client";

import React from "react";
import { UnsaveModalState } from "src/store/UnsaveModal/atom";
import { useRecoilState } from "recoil";

const useUnsaveModal = () => {
  const [modalState, setModalState] = useRecoilState(UnsaveModalState);

  const handleModalClose = React.useCallback(
    () =>
      setModalState({
        isOpen: false,
      }),
    [setModalState]
  );

  const handleModalOpen = React.useCallback(
    () =>
      setModalState({
        isOpen: true,
      }),
    [setModalState]
  );

  return { modalState, handleModalClose, handleModalOpen };
};

export default useUnsaveModal;
