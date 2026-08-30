import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";
import { WindowControls } from "#components";

const Terminal = () => {
  return (
    <div className="flex flex-col h-full bg-white select-none overflow-hidden">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
        <WindowControls target="terminal" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-700">Skills & Tech Stack</h2>
        <div className="w-12 md:hidden" />
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 text-xs md:text-sm font-roboto text-gray-800">
        <div className="bg-gray-100/70 p-3 rounded-lg border border-gray-200/80 mb-4">
          <p className="font-mono">
            <span className="font-bold text-blue-600">@hamza</span>
            <span className="text-gray-400"> % </span>
            <span className="text-gray-900 font-semibold">show techstack --all</span>
          </p>
        </div>

        <ul className="py-4 my-2 border-y border-dashed border-gray-300 space-y-3">
          {techStack.map(({ category, items }) => (
            <li
              className="flex flex-col sm:flex-row sm:items-center gap-2 py-1"
              key={category}
            >
              <div className="flex items-center gap-2 min-w-32.5">
                <Check className="text-[#00A154] shrink-0" size={16} />
                <h3 className="font-semibold text-[#00A154]">{category}</h3>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap pl-6 sm:pl-0">
                {items.map((item, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs border border-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="text-[#00A154] space-y-1 mt-4 text-xs">
          <p className="flex items-center gap-2">
            <Check size={16} className="shrink-0" />
            <span>6 of 6 categories loaded successfully (100%)</span>
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <Flag size={14} fill="currentColor" className="shrink-0" />
            <span>Render time: 4ms • Status: Ready to build</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
