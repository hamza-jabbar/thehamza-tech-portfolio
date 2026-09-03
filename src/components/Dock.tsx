import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import clsx from "clsx";

import { dockApps, locations } from "#constants";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

const Dock = () => {
	const dockRef = useRef<HTMLDivElement>(null);
	const { openWindow, closeWindow, windows } = useWindowStore();
	const { setActiveLocation } = useLocationStore();

	// Animate desktop dock using GSAP
	useGSAP(() => {
		const dock = dockRef.current;
		if (!dock) return;

		const icons = dock.querySelectorAll(".dock-icon");

		// Animate icons
		const animateIcons = (mouseX: number) => {
			const { left } = dock.getBoundingClientRect();

			icons.forEach((icon) => {
				const { left: iconLeft, width } = icon.getBoundingClientRect();
				const center = iconLeft - left + width / 2;
				const distance = Math.abs(mouseX - center);

				const intensity = Math.exp(-(distance ** 2.5) / 20000);

				// Animate icons on hover
				gsap.to(icon, {
					scale: 1 + 0.25 * intensity,
					y: -15 * intensity,
					duration: 0.2,
					ease: "power1.out",
				});
			});
		};

		const handleMouseMove = (e: MouseEvent) => {
			const { left } = dock.getBoundingClientRect();
			animateIcons(e.clientX - left);
		};

		const resetIcons = () =>
			icons.forEach((icon) =>
				gsap.to(icon, {
					scale: 1,
					y: 0,
					duration: 0.3,
					ease: "power1.out",
				})
			);
		dock.addEventListener("mousemove", handleMouseMove);
		dock.addEventListener("mouseleave", resetIcons);

		// Cleanup function
		return () => {
			dock.removeEventListener("mousemove", handleMouseMove);
			dock.removeEventListener("mouseleave", resetIcons);
		};
	}, []);

	// Function to open/toggle app
	const toggleApp = (app: { id: string; canOpen: boolean }) => {
		if (!app.canOpen) return;

		const window = windows[app.id];
		if (!window) {
			console.error(`Window not found for app: ${app.id}`);
			return;
		}

		if (window.isOpen) {
			closeWindow(app.id);
		} else {
			if (app.id === "finder") {
				setActiveLocation(locations.work);
			}
			openWindow(app.id);
		}
	};

	const mobileDockApps = [
		{
			id: "contact",
			name: "Phone",
			icon: "/images/icons/contacts.svg",
			onClick: () => openWindow("contact"),
		},
		{
			id: "safari",
			name: "Safari",
			icon: "/images/icons/safari.svg",
			onClick: () => openWindow("safari"),
		},
		{
			id: "photos",
			name: "Photos",
			icon: "/images/icons/photos.svg",
			onClick: () => openWindow("photos"),
		},
		{
			id: "finder",
			name: "Files",
			icon: "/images/icons/files.svg",
			onClick: () => {
				setActiveLocation(locations.work);
				openWindow("finder");
			},
		},
	];

	return (
		<>
			{/* ========================================================================= */}
			{/* Mobile iPhone Glassmorphic Dock                                           */}
			{/* ========================================================================= */}
			<section className="md:hidden fixed bottom-4 inset-x-0 mx-auto w-[92%] max-w-sm z-40 select-none">
				<div className="bg-white/25 backdrop-blur-2xl rounded-xl px-2 py-3 flex justify-around items-center border border-white/20 shadow-2xl">
					{mobileDockApps.map((app) => (
						<button
							key={app.id}
							type="button"
							onClick={app.onClick}
							className="size-14 rounded-xl bg-white/20 backdrop-blur-md shadow-md border border-white/20 flex items-center justify-center cursor-pointer active:scale-90 transition-transform duration-150 focus:outline-none"
							aria-label={app.name}
						>
							<img
								src={app.icon}
								alt={app.name}
								className="size-full object-contain drop-shadow-sm rounded-lg"
							/>
						</button>
					))}
				</div>
			</section>

			{/* ========================================================================= */}
			{/* Desktop macOS Magnification Dock                                          */}
			{/* ========================================================================= */}
			<section id="dock" className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 z-50 select-none">
				<div ref={dockRef} className="bg-white/20 backdrop-blur-md justify-between rounded-2xl p-2 flex items-end gap-1">
					{dockApps.map(({ id, name, icon, canOpen }) => (
						<div key={id} className="relative flex justify-center">
							<button
								type="button"
								className="dock-icon size-15 3xl:size-20 cursor-pointer"
								aria-label={name}
								data-tooltip-id="dock-tooltip"
								data-tooltip-content={name}
								data-tooltip-delay-show={150}
								disabled={!canOpen}
								onClick={() => toggleApp({ id, canOpen })}
							>
								<img
									src={icon.startsWith("/") ? icon : `/images/${icon}`}
									alt={name}
									loading="lazy"
									className={clsx("size-full object-contain drop-shadow-sm", !canOpen && "opacity-60")}
								/>
							</button>
						</div>
					))}
					<Tooltip id="dock-tooltip" place="top" className="py-1! px-3! w-fit! text-center! text-xs! rounded-md! bg-blue-200! text-blue-900! shadow-2xl!" />
				</div>
			</section>
		</>
	);
};

export default Dock;
