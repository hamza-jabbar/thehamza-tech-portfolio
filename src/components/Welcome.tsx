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
    if (!container) return () => {};

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter: Element, weight: number, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'wght' ${weight}`,
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        // Get starting position of the characters
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        // When mouse moves over the letters, the font weight increases
        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect(); // Get position of the letter
            const distance = Math.abs(mouseX - (l - left + w / 2)); // The hover effect occurs when the mouse is on the letter
            const intensity = Math.exp(-(distance ** 2) / 20000); // When the mouse is on the letter, the font weight increases

            animateLetter(letter, min + (max - min) * intensity);
        });
    };

    const handleMouseLeave = () =>
        letters.forEach((letter) => animateLetter(letter, base, 0.3));

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
            className="text-gray-200 flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none max-sm:h-screen max-sm:w-full max-sm:px-10"
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

            <div className="sm:hidden m-7 bg-red-300/20 backdrop-blur-lg p-3 rounded-md absolute top-10">
                <p className="flex-1 text-[16px] text-center font-roboto text-gray-400">
                    This portfolio is designed for desktop/tablet screens only
                </p>
            </div>
        </section>
    );
};

export default Welcome;
