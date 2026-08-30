import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Mail, Send } from "lucide-react";

const Contact = () => {
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
              src="/images/adrian.jpg"
              alt="Hamza"
              className="size-20 md:size-24 rounded-full object-cover shadow-md ring-4 ring-blue-50"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Hamza</h3>
          <p className="text-xs md:text-sm text-gray-500 max-w-xs">
            Software Developer • Full Stack & Mobile
          </p>

          {/* Quick Email Action Button */}
          <a
            href="mailto:hello@thehamza.tech"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#007AFF] text-white text-xs font-semibold shadow-sm hover:bg-blue-600 active:scale-95 transition-all"
          >
            <Mail size={14} />
            <span>hello@thehamza.tech</span>
          </a>
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
            {socials.map(({ id, bg, link, icon, text }) => (
              <li
                key={id}
                style={{ backgroundColor: bg }}
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
                    <img src={icon} alt={text} className="size-4" />
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
