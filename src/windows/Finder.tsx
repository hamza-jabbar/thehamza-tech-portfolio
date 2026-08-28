import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { SearchIcon } from "lucide-react";
import useLocationStore from "#store/location";
import { locations } from "#constants";
import clsx from "clsx";
import useWindowStore from "#store/window";

interface FinderItem {
  id: string | number;
  name: string;
  icon: string;
  fileType?: string;
  kind?: string;
  href?: string;
  position?: string;
  children?: FinderItem[];
  [key: string]: unknown;
}

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item: FinderItem) => {
    if (item.fileType === "pdf") return openWindow("resume", item);
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType ?? "") && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name: string, items: FinderItem[]) => (
    <div>
      <h3 className="text-xs font-medium text-gray-400 mb-1">{name}</h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
              item.id === activeLocation?.id
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-200"
            )}
            key={item.id}
            onClick={() => setActiveLocation(item)}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400">
        <WindowControls target="finder" />
        <SearchIcon className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
      </div>

      <div className="bg-white flex h-full min-h-87.5">
        <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col p-5 space-y-3">
          {renderList("Favorites", Object.values(locations) as FinderItem[])}
          {renderList("My Projects", locations.work.children as FinderItem[])}
        </div>

        <ul className="flex-1 p-8 bg-white max-w-2xl relative min-h-75">
          {(activeLocation as FinderItem | null)?.children?.map((item) => (
            <li
              key={item.id}
              className={clsx("absolute flex items-center flex-col gap-3 group cursor-pointer", item.position)}
              onClick={() => openItem(item)}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="object-contain object-center size-16 relative group-hover:scale-105 transition-transform"
              />
              <p className="text-sm text-center font-medium w-40 text-gray-800">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
