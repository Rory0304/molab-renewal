"use client";

import React from "react";
import { UnsaveModalState } from "src/store/UnsaveModal/atom";
import { useRecoilState } from "recoil";

const useUnsaveModal = () => {
  const [modalState, setModalState] = useRecoilState(UnsaveModalState);

  const handleModalClose = React.useCallback(
    () =>
      setModalState((current) => ({
        ...current,
        isOpen: false,
      })),
    [setModalState]
  );

  const handleModalOpen = React.useCallback(
    (link?: string) =>
      setModalState({
        isOpen: true,
        link: link || "/myproject",
      }),
    [setModalState]
  );

  return { modalState, handleModalClose, handleModalOpen };
};

export default useUnsaveModal;
