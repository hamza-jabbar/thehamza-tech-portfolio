import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data as {
    name: string;
    image?: string;
    subtitle?: string;
    description?: string[];
  };

  return (
    <div className="flex flex-col h-full bg-white select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
        <WindowControls target="txtfile" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-700 truncate px-2">
          {name}
        </h2>
        <div className="w-12 md:hidden" />
      </div>

      {/* Reader Body */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5 bg-white max-w-2xl mx-auto w-full">
        {image ? (
          <div className="w-full">
            <img
              src={image}
              alt={name}
              className="w-full max-h-64 object-cover rounded-2xl shadow-sm border border-gray-100"
            />
          </div>
        ) : null}

        {subtitle ? (
          <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
            {subtitle}
          </h3>
        ) : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3.5 leading-relaxed text-sm md:text-base text-gray-700">
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
