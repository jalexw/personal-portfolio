"use client";

import { useCallback } from "react";
import { create } from "zustand";

interface IContactFormIsOpenStoreState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useContactFormIsOpenStore = create<IContactFormIsOpenStoreState>(
  (set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),
  }),
);

export default useContactFormIsOpenStore;

export function useOpenContactForm(): () => void {
  const { setOpen } = useContactFormIsOpenStore();
  return useCallback(() => {
    setOpen(true);
  }, [setOpen]);
}
