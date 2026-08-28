import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400">
        <WindowControls target="contact" />
        <h2 className="font-bold text-sm text-center w-full text-gray-700">Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img src="/images/adrian.jpg" alt="Hamza" className="w-20 rounded-full" />
        <h3 className="text-xl font-semibold text-gray-900">Let's Connect</h3>
        <p className="text-sm text-gray-600">Got an idea? Need some help with your next project? or just want to say hi? Send me a message!</p>
        <p className="text-sm font-medium text-blue-600">hello@thehamza.tech</p>

        {/* Socials */}
        <ul className="flex items-center gap-3 flex-wrap">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li
              key={id}
              style={{ backgroundColor: bg }}
              className="rounded-lg p-3 w-60 hover:-translate-y-0.5 hover:scale-105 origin-center transition-all duration-300 shadow-sm"
            >
              <a href={link} target="_blank" rel="noopener noreferrer" title={text} className="space-y-5 block">
                <img src={icon} alt={text} className="size-5" />
                <p className="font-semibold text-sm text-white">{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
