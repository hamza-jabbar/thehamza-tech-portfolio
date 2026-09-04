"use client";

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Mail, Send } from "lucide-react";
import { useSanityData } from "#hooks/useSanityData";
import { profileImage, iconImage } from "#lib/imageUrl";
import { socials } from "#constants";
import { useMemo } from "react";

const Contact = () => {
  const { data, loading } = useSanityData();
  const about = data.aboutMe;

  // Resolve profile image: Sanity first, fallback to local
  const profileSrc = useMemo(() => {
    if (about?.image) return profileImage(about.image);
    return "/images/adrian.jpg";
  }, [about]);

  // Resolve social links: Sanity first, fallback to constants
  const links = useMemo(() => {
    if (!loading && about?.links && about.links.length > 0) {
      return about.links.map((link) => ({
        id: link._key,
        text: link.label,
        icon: link.icon ? iconImage(link.icon) : null,
        bg: link.bg ?? "#4b5563",
        link: link.url,
      }));
    }
    return socials;
  }, [about, loading]);

  const name = about?.title ?? "Hamza";
  const subtitle = about?.subtitle ?? "Software Developer • Full Stack & Mobile";
  const email = about?.email ?? "hello@thehamza.tech";

  return (
    <div className="flex flex-col h-full bg-white select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
        <WindowControls target="contact" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-700">Contact Card</h2>
        <div className="w-12 md:hidden" />
      </div>

      {/* Contact Content */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 max-w-lg mx-auto w-full">
        {/* iOS Contact Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <img
              src={profileSrc}
              alt={name}
              className="size-20 md:size-24 rounded-full object-cover shadow-md ring-4 ring-blue-50"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-xs md:text-sm text-gray-500 max-w-xs">{subtitle}</p>

          {/* Quick Email Action Button */}
          <a
            href={`mailto:${email}`}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#007AFF] text-white text-xs font-semibold shadow-sm hover:bg-blue-600 active:scale-95 transition-all"
          >
            <Mail size={14} />
            <span>{email}</span>
          </a>

          {/* Mobile number if available */}
          {about?.mobile && (
            <a
              href={`tel:${about.mobile}`}
              className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              {about.mobile}
            </a>
          )}
        </div>

        {/* Bio Text */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs md:text-sm text-gray-600 leading-relaxed">
          Got an idea? Need help with your next project, or just want to say hi? Connect with me across platforms:
        </div>

        {/* Socials Grid */}
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 px-1">
            Social Profiles
          </h4>
          <ul className="grid grid-cols-2 gap-3">
            {links.map(({ id, bg, link, icon, text }) => (
              <li
                key={id}
                style={{ backgroundColor: bg ?? "#4b5563" }}
                className="rounded-2xl p-4 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 origin-center transition-all duration-200 shadow-sm"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={text}
                  className="space-y-4 block"
                >
                  <div className="size-7 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center">
                    {icon ? (
                      <img src={icon} alt={text} className="size-4 object-contain" />
                    ) : (
                      <span className="text-white text-xs font-bold">{(text ?? "?")[0]}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <p className="font-semibold text-xs md:text-sm">{text}</p>
                    <Send size={12} className="opacity-70" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
