import { create } from 'zustand';

export const indicatorHoverState: any = create((set: any) => ({
  isHovered: false,
  setIsHovered: (isHovered: boolean) => set({ isHovered }),
}));
