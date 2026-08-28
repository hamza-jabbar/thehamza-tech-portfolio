// Which window is open

import { INITIAL_Z_INDEX, WINDOW_CONFIG, WindowConfigItem } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface WindowStoreState {
    windows: Record<string, WindowConfigItem>;
    nextZIndex: number;
    openWindow: (windowsKey: string, data?: any) => void;
    closeWindow: (windowsKey: string) => void;
    focusWindow: (windowsKey: string) => void;
}

const useWindowStore = create<WindowStoreState>()(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        // Function to manage windows
        openWindow: (windowsKey: string, data: any = null) =>
            set((state) => {
                // Get access to windows
                const win = state.windows[windowsKey];
                if (!win) return;
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data; // Modify data
                state.nextZIndex++;
            }),

        closeWindow: (windowsKey: string) =>
            set((state) => {
                // Get access to windows
                const win = state.windows[windowsKey];
                if (!win) return; // If windowKey is invalid
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
            }),

        // Bring a window on top of other windows
        focusWindow: (windowsKey: string) =>
            set((state) => {
                // Get access to windows
                const win = state.windows[windowsKey];
                if (!win) return;
                win.zIndex = state.nextZIndex++;
            }),
    }))
);

export default useWindowStore;
