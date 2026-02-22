import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";
import { WindowControls } from "#components";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@hamza % </span> show techstack
        </p>

        <div className="label">
          <div className="w-32">Category</div>
          <div className="w-32">Technologies</div>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li className="flex items-center" key={category}>
              <Check className="check" size={20} />
              <h3>{category}</h3>

              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}{i < items.length - 1 ? ',' : ''}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
          </p>

          <p className="text-black">
            <Flag size={15} fill="black" />
            Render time: 6ms
          </p>
        </div>
      </div>
    </>
  )
}

const TerminalWindow = WindowWrapper(Terminal, 'terminal')

export default TerminalWindow;