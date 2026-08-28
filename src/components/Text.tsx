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
    <>
      <div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400">
        <WindowControls target="txtfile" />
        <h2 className="font-bold text-sm text-center w-full text-gray-700">{name}</h2>
      </div>

      <div className="p-5 space-y-6 bg-white max-h-[70vh] overflow-y-auto">
        {image ? (
          <div className="w-full">
            <img src={image} alt={name} className="w-full h-auto rounded-lg shadow-sm" />
          </div>
        ) : null}

        {subtitle ? <h3 className="text-lg font-semibold text-gray-900">{subtitle}</h3> : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3 leading-relaxed text-base text-gray-800">
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
