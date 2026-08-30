import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";

const ImageWindowContent = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data as { name: string; imageUrl?: string };

  return (
    <div className="flex flex-col h-full bg-white select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
        <WindowControls target="imgfile" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-700 truncate px-2">
          {name}
        </h2>
        <div className="w-12 md:hidden" />
      </div>

      {/* Image Preview Canvas */}
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-neutral-900 md:bg-neutral-100 flex items-center justify-center">
        {imageUrl ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={imageUrl}
              alt={name}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No image preview available</p>
        )}
      </div>
    </div>
  );
};

const ImageWindow = WindowWrapper(ImageWindowContent, "imgfile");
export default ImageWindow;
