import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import type { ComponentType } from "react";
import clsx from "clsx";

const DESKTOP_WINDOW_STYLES: Record<string, string> = {
	safari: "md:w-4xl md:top-40 md:left-2/12",
	terminal: "md:w-xl md:top-32 md:left-1/12",
	contact: "md:w-2xl md:top-60 md:left-5/12",
	photos: "md:w-3xl md:top-96 md:left-1/2 md:-translate-y-1/2",
	resume: "md:w-fit md:h-fit md:top-16 md:left-7/12",
	finder: "md:w-3xl md:left-40 md:top-20",
	txtfile: "md:w-md md:top-36 md:right-32",
	imgfile: "md:w-xl md:top-40 md:left-2/12",
};

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface ResizeHandleDef {
	dir: ResizeDirection;
	/** Tailwind positioning classes */
	posClass: string;
	/** CSS cursor value */
	cursor: string;
}

const RESIZE_HANDLE_DEFS: ResizeHandleDef[] = [
	// Edges
	{ dir: "n", posClass: "top-0 left-4 right-4 h-2 -translate-y-1/2 cursor-ns-resize", cursor: "ns-resize" },
	{ dir: "s", posClass: "bottom-0 left-4 right-4 h-2 translate-y-1/2 cursor-ns-resize", cursor: "ns-resize" },
	{ dir: "w", posClass: "left-0 top-4 bottom-4 w-2 -translate-x-1/2 cursor-ew-resize", cursor: "ew-resize" },
	{ dir: "e", posClass: "right-0 top-4 bottom-4 w-2 translate-x-1/2 cursor-ew-resize", cursor: "ew-resize" },
	// Corners (larger hit area)
	{ dir: "nw", posClass: "top-0 left-0 size-5 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize", cursor: "nwse-resize" },
	{ dir: "ne", posClass: "top-0 right-0 size-5 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize", cursor: "nesw-resize" },
	{ dir: "sw", posClass: "bottom-0 left-0 size-5 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize", cursor: "nesw-resize" },
	{ dir: "se", posClass: "bottom-0 right-0 size-5 translate-x-1/2 translate-y-1/2 cursor-nwse-resize", cursor: "nwse-resize" },
];

// Every new component is an input
const WindowWrapper = <P extends object>(Component: ComponentType<P>, windowKey: string) => {
	const Wrapped = (props: P) => {
		const { focusWindow, closeWindow, windows } = useWindowStore();
		const { isOpen, zIndex } = windows[windowKey] ?? { isOpen: false, zIndex: 1000 };

		const ref = useRef<HTMLElement>(null);
		// Refs for each resize handle div (indexed same as RESIZE_HANDLE_DEFS)
		const handleRefs = useRef<(HTMLDivElement | null)[]>([]);

		// ─── Open / close animation ──────────────────────────────────────────────
		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return;

			el.style.display = "flex";

			const isMobile = window.innerWidth < 768;
			if (isMobile) {
				gsap.fromTo(el, { scale: 0.92, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
			} else {
				gsap.fromTo(el, { scale: 0.8, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" });
			}
		}, [isOpen]);

		// ─── GSAP Draggable (desktop only) ───────────────────────────────────────
		useGSAP(() => {
			const el = ref.current;
			if (!el || window.innerWidth < 768) return;

			const [instance] = Draggable.create(el, {
				// Draggable won't start if the mousedown originates from these
				cancel: ".resize-handle-zone, input, textarea, select, button, a",
				onPress: () => focusWindow(windowKey),
			});

			return () => instance.kill();
		}, []);

		// ─── Show / hide ─────────────────────────────────────────────────────────
		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;
			el.style.display = isOpen ? "flex" : "none";
		}, [isOpen]);

		// ─── Resize handles (native capture so we fire BEFORE GSAP Draggable) ────
		useEffect(() => {
			if (window.innerWidth < 768) return;

			const el = ref.current;
			if (!el) return;

			const cleanups: (() => void)[] = [];

			RESIZE_HANDLE_DEFS.forEach(({ dir, cursor }, i) => {
				const handle = handleRefs.current[i];
				if (!handle) return;

				const onMouseDown = (e: MouseEvent) => {
					// Stop GSAP Draggable from also receiving this event
					e.stopImmediatePropagation();
					e.preventDefault();

					if (window.innerWidth < 768) return;

					focusWindow(windowKey);

					const rect = el.getBoundingClientRect();
					const startWidth = rect.width;
					const startHeight = rect.height;
					const startMouseX = e.clientX;
					const startMouseY = e.clientY;

					const startX = (gsap.getProperty(el, "x") as number) || 0;
					const startY = (gsap.getProperty(el, "y") as number) || 0;

					const minW = 340;
					const minH = 220;
					const maxW = window.innerWidth - 32;
					const maxH = window.innerHeight - 48;

					document.body.style.userSelect = "none";
					document.body.style.cursor = cursor;

					const onMove = (me: MouseEvent) => {
						const dx = me.clientX - startMouseX;
						const dy = me.clientY - startMouseY;

						let newW = startWidth;
						let newH = startHeight;
						let newX = startX;
						let newY = startY;

						if (dir.includes("e")) {
							newW = Math.min(Math.max(startWidth + dx, minW), maxW);
						} else if (dir.includes("w")) {
							newW = Math.min(Math.max(startWidth - dx, minW), maxW);
							newX = startX + (startWidth - newW);
						}

						if (dir.includes("s")) {
							newH = Math.min(Math.max(startHeight + dy, minH), maxH);
						} else if (dir.includes("n")) {
							newH = Math.min(Math.max(startHeight - dy, minH), maxH);
							newY = startY + (startHeight - newH);
						}

						// Set inline styles directly – fastest, no GSAP transform conflicts
						el.style.width = `${newW}px`;
						el.style.height = `${newH}px`;
						gsap.set(el, { x: newX, y: newY });
					};

					const onUp = () => {
						document.body.style.userSelect = "";
						document.body.style.cursor = "";
						window.removeEventListener("mousemove", onMove);
						window.removeEventListener("mouseup", onUp);

						// Sync Draggable's internal state so dragging still works after resize
						Draggable.get(el)?.update();
					};

					window.addEventListener("mousemove", onMove);
					window.addEventListener("mouseup", onUp);
				};

				// { capture: true } ensures we fire before GSAP's bubble-phase listener
				handle.addEventListener("mousedown", onMouseDown, { capture: true });
				cleanups.push(() => handle.removeEventListener("mousedown", onMouseDown, { capture: true }));
			});

			return () => cleanups.forEach((fn) => fn());
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [windowKey]);

		return (
			<section
				id={windowKey}
				ref={ref}
				style={{ zIndex }}
				className={clsx(
					"fixed inset-0 w-full h-full z-50 bg-white flex flex-col overflow-hidden",
					"md:fixed-none md:absolute md:inset-auto md:h-auto md:w-auto md:rounded-xl md:shadow-2xl md:drop-shadow-2xl md:flex md:flex-col",
					DESKTOP_WINDOW_STYLES[windowKey]
				)}
			>
				{/* App Content */}
				<div className="flex-1 flex flex-col overflow-hidden min-h-0 w-full">
					<Component {...props} />
				</div>

				{/* Desktop 8-Directional Resize Handles (rendered as native refs) */}
				{RESIZE_HANDLE_DEFS.map(({ dir, posClass }, i) => (
					<div
						key={dir}
						ref={(el) => { handleRefs.current[i] = el; }}
						className={clsx("resize-handle-zone hidden md:block absolute z-9999", posClass)}
						aria-hidden="true"
					/>
				))}

				{/* iOS Bottom Home Indicator Bar (Mobile Only) */}
				<div className="md:hidden w-full py-2 bg-gray-50 border-t border-gray-100 flex justify-center items-center shrink-0">
					<button
						type="button"
						onClick={() => closeWindow(windowKey)}
						className="w-32 h-1 bg-black/40 hover:bg-black/60 rounded-full cursor-pointer active:scale-95 transition-all"
						aria-label="Home"
						title="Swipe or Tap to go Home"
					/>
				</div>
			</section>
		);
	};

	Wrapped.displayName = `WindowsWrapper (${(Component as { displayName?: string }).displayName || Component.name || "Component"})`;

	return Wrapped;
};


export default WindowWrapper;

