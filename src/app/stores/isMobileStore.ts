import { create } from 'zustand';

export const isMobileStore: any = create((set: any) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
