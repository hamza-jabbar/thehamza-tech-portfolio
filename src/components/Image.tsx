import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";

const ImageWindowContent = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data as { name: string; imageUrl?: string };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400">
        <WindowControls target="imgfile" />
        <h2 className="font-bold text-sm text-center w-full text-gray-700">{name}</h2>
      </div>

      <div className="p-5 bg-white flex items-center justify-center">
        {imageUrl ? (
          <div className="w-full flex items-center justify-center">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-sm"
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(ImageWindowContent, "imgfile");
export default ImageWindow;
