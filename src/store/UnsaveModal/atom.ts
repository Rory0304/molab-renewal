"use client";
import { atom } from "recoil";

export const UnsaveModalState = atom({
  key: "UnsaveModalState",
  default: {
    isOpen: false,
  },
});
