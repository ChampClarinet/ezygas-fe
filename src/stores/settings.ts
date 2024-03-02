import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingsStore {
  zoomLevel: number;
  changeZoomLevel: (zoomLevel: number) => void;

  latestReview: string | null;
  setLastReview: (review: string) => void;
}

const store = persist<SettingsStore>(
  (set) => ({
    zoomLevel: 100,
    changeZoomLevel: (zoomLevel) => set({ zoomLevel }),
    latestReview: null,
    setLastReview: (review) => set({ latestReview: review }),
  }),
  {
    name: "ez-settings",
  }
);

export const useSettingsStore = create(store);
