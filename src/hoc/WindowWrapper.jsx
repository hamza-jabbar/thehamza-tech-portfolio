import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Every new component is an input
const WindowWrapper = (Component, windowKey) => {
	const Wrapped = (props) => {
		const { focusWindow, windows } = useWindowStore();
		const { isOpen, zIndex } = windows[windowKey];														// Returns data for the selected window

		// Manage animations
		const ref = useRef(null);

		// Open and close windows
		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return			// If window is closed, do nothing

			el.style.display = "block";

			// Animating window open
			gsap.fromTo(el, { scale: 0.8, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
		}, [isOpen]) 							// Re-run when isOpen changes

		// Make windows draggable
		useGSAP(() => {
			const el = ref.current;
			if (!el) return;

			const [instance] = Draggable.create(el, { onPress: () => focusWindow(windowKey) });

			// Kill the instance of the functionality - makes app more efficient
			return () => instance.kill();
		}, [])

		useLayoutEffect(() => {
			const el = ref.current;   		// Access to current window

			if (!el) return; 				// If element does not exist, do nothing
			el.style.display = isOpen ? "block" : "none";	// Show or hide window
		}, [isOpen]);

		return <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
			<Component {...props} />
		</section>
	};

	Wrapped.displayName = `WindowsWrapper (${Component.displayName} || ${Component.name || 'Component'})`;

	return Wrapped;
}

export default WindowWrapper;