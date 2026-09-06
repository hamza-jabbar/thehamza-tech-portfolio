"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
	subtitle: {
		min: 200,
		max: 400,
		default: 200,
	},
	title: {
		min: 400,
		max: 800,
		default: 400,
	},
} as const;

type TextType = keyof typeof FONT_WEIGHTS;

const renderText = (text: string, className: string, baseWeight: number = 400) => {
	return [...text].map((char, i) => (
		<span key={i} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
			{char === " " ? "\u00A0" : char}
		</span>
	));
};

const setupTextHover = (container: HTMLElement | null, type: TextType) => {
	if (!container) return () => { };

	const letters = Array.from(container.querySelectorAll("span")) as HTMLElement[];
	const { min, max, default: base } = FONT_WEIGHTS[type];

	// Pre-compile one quickTo setter per letter — no new tweens on every mousemove
	const setters = letters.map((el) => {
		const proxy = { wght: base };
		const setter = gsap.quickTo(proxy, "wght", {
			duration: 0.4,
			ease: "power3.out",
			onUpdate() {
				el.style.fontVariationSettings = `'wght' ${proxy.wght}`;
			},
		});
		return setter;
	});

	const handleMouseMove = (e: MouseEvent) => {
		const { left } = container.getBoundingClientRect();
		const mouseX = e.clientX - left;

		letters.forEach((letter, i) => {
			const { left: l, width: w } = letter.getBoundingClientRect();
			const distance = Math.abs(mouseX - (l - left + w / 2));
			const intensity = Math.exp(-(distance ** 2) / 2000);
			setters[i](min + (max - min) * intensity);
		});
	};

	const handleMouseLeave = () => setters.forEach((set) => set(base));

	container.addEventListener("mousemove", handleMouseMove);
	container.addEventListener("mouseleave", handleMouseLeave);

	return () => {
		container.removeEventListener("mousemove", handleMouseMove);
		container.removeEventListener("mouseleave", handleMouseLeave);
	};
};


const Welcome = () => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);

	useGSAP(() => {
		const titleCleanUp = setupTextHover(titleRef.current, "title");
		const subtitleCleanUp = setupTextHover(subtitleRef.current, "subtitle");

		return () => {
			titleCleanUp();
			subtitleCleanUp();
		};
	});

	return (
		<section
			id="welcome"
			className="hidden md:flex text-gray-200 flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
		>
			<p ref={subtitleRef}>
				{renderText(
					"Hi, I am Hamza Welcome to my",
					"text-3xl font-georama",
					200
				)}
			</p>
			<h1 ref={titleRef} className="mt-7">
				{renderText(
					"portfolio",
					"text-9xl italic font-georama"
				)}
			</h1>
		</section>
	);
};

export default Welcome;
