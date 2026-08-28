// Which folder is open

import { locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Get from Sanity [TODO]
const DEFAULT_LOCATION = locations.work;

export interface LocationStoreState {
  activeLocation: any;
  setActiveLocation: (location: any) => void;
  resetActiveLocation: () => void;
}

const useLocationStore = create<LocationStoreState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    // Set location
    setActiveLocation: (location: any) =>
      set((state) => {
        if (location === undefined) return;
        state.activeLocation = location;
      }),

    // Reset location
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
