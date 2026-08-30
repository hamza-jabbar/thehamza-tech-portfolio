import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import type { ComponentType } from "react";
import clsx from "clsx";

const DESKTOP_WINDOW_STYLES: Record<string, string> = {
	safari: "md:w-4xl md:top-40 md:left-2/12",
	terminal: "md:w-xl md:top-32 md:left-1/12",
	contact: "md:max-w-2xl md:top-60 md:left-5/12",
	photos: "md:max-w-3xl md:top-96 md:left-1/2 md:-translate-y-1/2",
	resume: "md:w-fit md:h-fit md:top-16 md:left-7/12",
	finder: "md:w-3xl md:left-40 md:top-20",
	txtfile: "md:w-md md:top-36 md:right-32",
	imgfile: "md:w-xl md:top-40 md:left-2/12",
};

// Every new component is an input
const WindowWrapper = <P extends object>(Component: ComponentType<P>, windowKey: string) => {
	const Wrapped = (props: P) => {
		const { focusWindow, closeWindow, windows } = useWindowStore();
		const { isOpen, zIndex } = windows[windowKey] ?? { isOpen: false, zIndex: 1000 };

		// Manage animations
		const ref = useRef<HTMLElement>(null);

		// Open and close windows animation
		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return;

			el.style.display = "flex";

			const isMobile = window.innerWidth < 768;
			if (isMobile) {
				// iOS App Launch Animation: expands smoothly
				gsap.fromTo(
					el,
					{ scale: 0.92, opacity: 0, y: 30 },
					{ scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
				);
			} else {
				// macOS Window Open Animation
				gsap.fromTo(
					el,
					{ scale: 0.8, opacity: 0, y: 40 },
					{ scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
				);
			}
		}, [isOpen]);

		// Make windows draggable ONLY on desktop
		useGSAP(() => {
			const el = ref.current;
			if (!el || window.innerWidth < 768) return;

			const [instance] = Draggable.create(el, {
				onPress: () => focusWindow(windowKey),
			});

			return () => instance.kill();
		}, []);

		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;
			el.style.display = isOpen ? "flex" : "none";
		}, [isOpen]);

		return (
			<section
				id={windowKey}
				ref={ref}
				style={{ zIndex }}
				className={clsx(
					"fixed inset-0 w-full h-full z-50 bg-white flex flex-col overflow-hidden",
					"md:fixed-none md:absolute md:inset-auto md:h-auto md:w-auto md:rounded-xl md:shadow-2xl md:drop-shadow-2xl md:block",
					DESKTOP_WINDOW_STYLES[windowKey]
				)}
			>
				{/* App Content */}
				<div className="flex-1 flex flex-col overflow-hidden min-h-0">
					<Component {...props} />
				</div>

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
