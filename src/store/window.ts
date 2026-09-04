// Which window is open

import { INITIAL_Z_INDEX, WINDOW_CONFIG, WindowConfigItem } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface WindowStoreState {
    windows: Record<string, WindowConfigItem>;
    nextZIndex: number;
    activeWindowKey: string | null;
    openWindow: (windowsKey: string, data?: any) => void;
    closeWindow: (windowsKey: string) => void;
    focusWindow: (windowsKey: string) => void;
    closeAllWindows: () => void;
}

const useWindowStore = create<WindowStoreState>()(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        activeWindowKey: null,

        // Function to manage windows
        openWindow: (windowsKey: string, data: any = null) =>
            set((state) => {
                const win = state.windows[windowsKey];
                if (!win) return;
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                state.activeWindowKey = windowsKey;
                state.nextZIndex++;
            }),

        closeWindow: (windowsKey: string) =>
            set((state) => {
                const win = state.windows[windowsKey];
                if (!win) return;
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
                
                if (state.activeWindowKey === windowsKey) {
                    // Find highest remaining open window
                    let highestZ = -1;
                    let highestKey: string | null = null;
                    Object.entries(state.windows).forEach(([key, w]) => {
                        if (w.isOpen && w.zIndex > highestZ) {
                            highestZ = w.zIndex;
                            highestKey = key;
                        }
                    });
                    state.activeWindowKey = highestKey;
                }
            }),

        // Bring a window on top of other windows
        focusWindow: (windowsKey: string) =>
            set((state) => {
                const win = state.windows[windowsKey];
                if (!win) return;
                win.zIndex = state.nextZIndex++;
                state.activeWindowKey = windowsKey;
            }),

        closeAllWindows: () =>
            set((state) => {
                Object.keys(state.windows).forEach((key) => {
                    state.windows[key].isOpen = false;
                    state.windows[key].zIndex = INITIAL_Z_INDEX;
                    state.windows[key].data = null;
                });
                state.activeWindowKey = null;
            }),
    }))
);

export default useWindowStore;
