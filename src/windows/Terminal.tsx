import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";
import { WindowControls } from "#components";

const Terminal = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400">
        <WindowControls target="terminal" />
        <h2 className="font-bold text-sm text-center w-full text-gray-700">Tech Stack</h2>
      </div>

      <div className="text-sm font-roboto p-5 text-gray-800">
        <p>
          <span className="font-bold">@hamza % </span> show techstack
        </p>

        <div className="flex items-center ms-10 mt-7 text-gray-500 font-semibold">
          <div className="w-32">Category</div>
          <div className="w-32">Technologies</div>
        </div>

        <ul className="py-5 my-5 border-y border-dashed border-gray-300 space-y-1">
          {techStack.map(({ category, items }) => (
            <li className="flex items-center" key={category}>
              <Check className="text-[#00A154] w-5" size={20} />
              <h3 className="font-semibold text-[#00A154] w-32 ms-5">{category}</h3>

              <ul className="flex items-center gap-2 flex-wrap">
                {items.map((item, i) => (
                  <li key={i} className="text-gray-800">
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="text-[#00A154] space-y-1">
          <p className="flex items-center">
            <Check size={20} className="w-5 me-5 inline" /> 5 of 5 stacks loaded successfully (100%)
          </p>

          <p className="text-black flex items-center">
            <Flag size={15} fill="black" className="w-5 me-5 inline" />
            Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
