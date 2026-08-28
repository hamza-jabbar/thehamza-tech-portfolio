import { Mail, Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window";
import clsx from "clsx";

const GALLERY_GRID_SPAN: Record<number, string> = {
  0: "row-start-1 row-span-3 col-start-1 col-span-3",
  1: "row-start-1 row-span-3 col-start-4 col-span-2",
  2: "row-start-4 row-span-2 col-start-3 col-span-3",
  3: "row-start-4 row-span-2 col-start-1 col-span-2",
};

const Photos = () => {
  const { openWindow } = useWindowStore();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400">
        <WindowControls target="photos" />

        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
          <Search className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-3/12 flex-none bg-gray-50 border-r border-gray-200 flex flex-col p-5">
          <h2 className="text-xs font-medium text-gray-400 mb-1">Photos</h2>

          <ul className="space-y-1">
            {photosLinks.map(({ id, icon, title }, idx) => (
              <li
                key={id}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
                  idx === 0 ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"
                )}
              >
                <img src={icon} alt={title} className="w-4" />
                <p className="text-sm font-medium">{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 flex-1">
          <ul className="grid grid-cols-5 grid-rows-5 gap-2.5 h-85">
            {gallery.map(({ id, img }, index) => (
              <li
                key={id}
                className={clsx("cursor-pointer overflow-hidden rounded-lg", GALLERY_GRID_SPAN[index] ?? "")}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery Image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
              >
                <img src={img} alt={`Gallery Image ${id}`} className="size-full object-cover rounded-lg hover:scale-105 transition-transform duration-300" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
