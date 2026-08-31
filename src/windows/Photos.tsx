import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window";
import clsx from "clsx";
import { useState } from "react";

const GALLERY_GRID_SPAN: Record<number, string> = {
  0: "row-start-1 row-span-3 col-start-1 col-span-3",
  1: "row-start-1 row-span-3 col-start-4 col-span-2",
  2: "row-start-4 row-span-2 col-start-3 col-span-3",
  3: "row-start-4 row-span-2 col-start-1 col-span-2",
};

const Photos = () => {
  const { openWindow } = useWindowStore();
  const [activeTab, setActiveTab] = useState(1);

  const handleImageClick = (id: number, img: string) => {
    openWindow("imgfile", {
      id,
      name: `Gallery Photo ${id}`,
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      imageUrl: img,
    });
  };

  return (
    <div className="flex flex-col h-full bg-white select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
        <WindowControls target="photos" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-700">Photos & Gallery</h2>
        <div className="w-12 flex justify-end">
          <Search className="p-1 hover:bg-gray-200 rounded cursor-default size-6 text-gray-500" />
        </div>
      </div>

      {/* Mobile Category Filter Bar */}
      <div className="md:hidden flex items-center gap-2 px-4 py-2.5 overflow-x-auto bg-gray-50/50 border-b border-gray-100 shrink-0">
        {photosLinks.map(({ id, title }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={clsx(
              "px-3 py-1 rounded-full text-xs font-medium shrink-0 cursor-pointer transition-all",
              activeTab === id
                ? "bg-[#007AFF] text-white shadow-xs"
                : "bg-gray-200/70 text-gray-600 hover:bg-gray-200"
            )}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Left Sidebar */}
        <div className="hidden md:flex w-48 flex-none bg-gray-50 border-r border-gray-200 flex-col p-5 space-y-3 overflow-y-auto">
          <h2 className="text-xs font-medium text-gray-400 mb-1">Library</h2>

          <ul className="space-y-1">
            {photosLinks.map(({ id, icon, title }) => (
              <li
                key={id}
                onClick={() => setActiveTab(id)}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
                  activeTab === id ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"
                )}
              >
                <img src={icon} alt={title} className="w-4" />
                <p className="text-sm font-medium">{title}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          {/* Mobile 2-column Grid */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {gallery.map(({ id, img }) => (
              <div
                key={id}
                onClick={() => handleImageClick(id, img)}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all"
              >
                <img
                  src={img}
                  alt={`Gallery Image ${id}`}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Desktop Custom 5x5 Grid */}
          <ul className="hidden md:grid grid-cols-5 grid-rows-5 gap-2.5 min-h-85 h-full">
            {gallery.map(({ id, img }, index) => (
              <li
                key={id}
                className={clsx(
                  "cursor-pointer overflow-hidden rounded-lg",
                  GALLERY_GRID_SPAN[index] ?? ""
                )}
                onClick={() => handleImageClick(id, img)}
              >
                <img
                  src={img}
                  alt={`Gallery Image ${id}`}
                  className="size-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
