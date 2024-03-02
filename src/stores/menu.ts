import { create } from "zustand";

export type MenuState = "HIDE" | "MENU" | "SUBMENU";

export interface MenuStore {
  state: MenuState;
  prevState: null | MenuState;
  updateState: (state: MenuState) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  state: "HIDE",
  prevState: null,
  updateState: (newState) =>
    set((state) => {
      const prevState = state.state;
      return {
        state: newState,
        prevState,
      };
    }),
}));
