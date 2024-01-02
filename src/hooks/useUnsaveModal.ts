'use client';

import React from 'react';

import { useRecoilState } from 'recoil';
import { UnsaveModalState } from 'src/store/UnsaveModal/atom';

const useUnsaveModal = () => {
  const [modalState, setModalState] = useRecoilState(UnsaveModalState);

  const handleModalClose = React.useCallback(
    () =>
      setModalState(current => ({
        ...current,
        isOpen: false,
      })),
    []
  );

  const handleModalOpen = React.useCallback(
    (link?: string) =>
      setModalState({
        isOpen: true,
        link: link || '/myproject',
      }),
    []
  );

  return { modalState, handleModalClose, handleModalOpen };
};

export default useUnsaveModal;
