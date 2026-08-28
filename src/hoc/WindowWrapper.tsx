import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import type { ComponentType } from "react";
import clsx from "clsx";

const WINDOW_STYLES: Record<string, string> = {
	safari: "w-4xl top-40 left-2/12",
	terminal: "w-xl top-32 left-1/12",
	contact: "max-w-2xl top-60 left-5/12",
	photos: "max-w-3xl top-96 left-1/2 -translate-y-1/2",
	resume: "w-fit h-fit top-16 left-7/12",
	finder: "w-3xl left-40 top-20",
	txtfile: "w-md top-36 right-32",
	imgfile: "w-xl top-40 left-2/12",
};

// Every new component is an input
const WindowWrapper = <P extends object>(Component: ComponentType<P>, windowKey: string) => {
	const Wrapped = (props: P) => {
		const { focusWindow, windows } = useWindowStore();
		const { isOpen, zIndex } = windows[windowKey] ?? { isOpen: false, zIndex: 1000 };

		// Manage animations
		const ref = useRef<HTMLElement>(null);

		// Open and close windows
		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return; // If window is closed, do nothing

			el.style.display = "block";

			// Animating window open
			gsap.fromTo(
				el,
				{ scale: 0.8, opacity: 0, y: 40 },
				{ scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
			);
		}, [isOpen]); // Re-run when isOpen changes

		// Make windows draggable
		useGSAP(() => {
			const el = ref.current;
			if (!el) return;

			const [instance] = Draggable.create(el, { onPress: () => focusWindow(windowKey) });

			// Kill the instance of the functionality - makes app more efficient
			return () => instance.kill();
		}, []);

		useLayoutEffect(() => {
			const el = ref.current; // Access to current window

			if (!el) return; // If element does not exist, do nothing
			el.style.display = isOpen ? "block" : "none"; // Show or hide window
		}, [isOpen]);

		return (
			<section
				id={windowKey}
				ref={ref}
				style={{ zIndex }}
				className={clsx(
					"absolute bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden",
					WINDOW_STYLES[windowKey]
				)}
			>
				<Component {...props} />
			</section>
		);
	};

	Wrapped.displayName = `WindowsWrapper (${(Component as { displayName?: string }).displayName || Component.name || "Component"})`;

	return Wrapped;
};

export default WindowWrapper;
