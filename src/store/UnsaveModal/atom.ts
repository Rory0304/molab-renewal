'use client';

import { atom } from 'recoil';

export const UnsaveModalState = atom({
  key: 'UnsaveModalState',
  default: {
    link: '/myproject',
    isOpen: false,
  },
});
