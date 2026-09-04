"use client";

import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { photosLinks, gallery } from "#constants";
import useWindowStore from "#store/window";
import clsx from "clsx";
import { useState, useMemo } from "react";
import { useSanityData } from "#hooks/useSanityData";
import { galleryThumb } from "#lib/imageUrl";

const GALLERY_GRID_SPAN: Record<number, string> = {
  0: "row-start-1 row-span-3 col-start-1 col-span-3",
  1: "row-start-1 row-span-3 col-start-4 col-span-2",
  2: "row-start-4 row-span-2 col-start-3 col-span-3",
  3: "row-start-4 row-span-2 col-start-1 col-span-2",
};

const Photos = () => {
  const { openWindow } = useWindowStore();
  const [activeTab, setActiveTab] = useState<string | number>("all");
  const { data, loading } = useSanityData();

  // Build sidebar tabs from Sanity skillsCategories, falling back to constants
  const tabs = useMemo(() => {
    if (!loading && data.skillsCategories.length > 0) {
      return [
        { id: "all", title: "Library", icon: "/icons/gicon1.svg" },
        ...data.skillsCategories.map((cat, i) => ({
          id: cat._id,
          title: cat.title,
          icon: ["/icons/gicon1.svg", "/icons/gicon2.svg", "/icons/file.svg", "/icons/gicon4.svg", "/icons/gicon5.svg"][i % 5],
        })),
      ];
    }
    return [{ id: "all", title: "Library", icon: "/icons/gicon1.svg" }, ...photosLinks.map((l) => ({ ...l, id: String(l.id) }))];
  }, [data.skillsCategories, loading]);

  // Build gallery items from Sanity photos, falling back to constants
  const galleryItems = useMemo(() => {
    if (!loading && data.photos.length > 0) {
      return data.photos.map((photo) => ({
        id: photo._id,
        img: galleryThumb(photo.image),
        alt: photo.alt,
        caption: photo.caption,
        categoryId: photo.category?._id ?? "all",
        imageRef: photo.image,
      }));
    }
    // Fallback to hardcoded constants
    return gallery.map((g) => ({
      id: g.id,
      img: g.img,
      alt: `Gallery Image ${g.id}`,
      caption: undefined,
      categoryId: "all",
      imageRef: null,
    }));
  }, [data.photos, loading]);

  // Filter by active tab
  const filteredItems = useMemo(() => {
    if (activeTab === "all") return galleryItems;
    return galleryItems.filter((item) => item.categoryId === activeTab);
  }, [galleryItems, activeTab]);

  const handleImageClick = (id: string | number, img: string, alt: string) => {
    openWindow("imgfile", {
      id,
      name: alt ?? `Gallery Photo`,
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
        {tabs.map(({ id, title }) => (
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
            {tabs.map(({ id, icon, title }) => (
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
          {loading && (
            <p className="text-xs text-gray-400 animate-pulse mb-4">Loading photos…</p>
          )}

          {/* Mobile 2-column Grid */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {filteredItems.map(({ id, img, alt }) => (
              <div
                key={id}
                onClick={() => handleImageClick(id, img, alt)}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all"
              >
                <img
                  src={img}
                  alt={alt}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Desktop Custom 5x5 Grid */}
          <ul className="hidden md:grid grid-cols-5 grid-rows-5 gap-2.5 min-h-85 h-full">
            {filteredItems.map(({ id, img, alt }, index) => (
              <li
                key={id}
                className={clsx(
                  "cursor-pointer overflow-hidden rounded-lg",
                  GALLERY_GRID_SPAN[index] ?? ""
                )}
                onClick={() => handleImageClick(id, img, alt)}
              >
                <img
                  src={img}
                  alt={alt}
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
