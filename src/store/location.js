// Which folder is open

import { locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Get from Sanity [TODO]
const DEFAULT_LOCATION = locations.work

const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    // Set location
    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined) return;
        state.activeLocation = location
      }),

    // Reset location
    resetActiveLocation: () => set((state) => {
      state.activeLocation = DEFAULT_LOCATION
    })
  })))

export default useLocationStore