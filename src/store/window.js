// Which window is open

import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    // Function to manage windows
    openWindow: (windowsKey, data = null) => set((state) => {
        // Get access to windows
        const win = state.windows[windowsKey];
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data                 // Modify data
        state.nextZIndex++;
    }),

    closeWindow: (windowsKey) => set((state) => {
        // Get access to windows
        const win = state.windows[windowsKey];
        if (!win) return;                           // If windowKey is invalid
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
    }),

    // Bring a window on top of other windows
    focusWindow: (windowsKey) => set((state) => {
        // Get access to windows
        const win = state.windows[windowsKey];
        win.zIndex = state.nextZIndex++;
    })
})),

);

export default useWindowStore