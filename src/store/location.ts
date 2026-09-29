// Which folder is open

import { locations } from "#constants";
import type { FinderItem } from "#lib/finderUtils";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work as unknown as FinderItem;

export interface LocationStoreState {
  activeLocation: FinderItem | null;
  setActiveLocation: (location: FinderItem | null | undefined) => void;
  resetActiveLocation: () => void;
}

const useLocationStore = create<LocationStoreState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    // Set location
    setActiveLocation: (location: FinderItem | null | undefined) =>
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
