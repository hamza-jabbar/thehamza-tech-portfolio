import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { ChevronRight, ExternalLink, FileText, Folder as FolderIcon, Image as ImageIcon, LayoutGrid, Search, Smartphone } from "lucide-react";
import useLocationStore from "#store/location";
import { locations } from "#constants";
import clsx from "clsx";
import useWindowStore from "#store/window";
import { useState, useMemo } from "react";
import { useSanityData } from "#hooks/useSanityData";
import { projectImage } from "#lib/imageUrl";
import type { SanityPortfolio, SanityProjectFile } from "#lib/queries";

interface FinderItem {
  id: string | number;
  name: string;
  icon: string;
  fileType?: string;
  kind?: string;
  href?: string;
  position?: string;
  subtitle?: string;
  description?: string[];
  imageUrl?: string;
  children?: FinderItem[];
  [key: string]: unknown;
}

// Map a Sanity portfolio project → FinderItem folder shape
function sanityProjectToFinderItem(project: SanityPortfolio, index: number): FinderItem {
  const defaultPositions = [
    "top-10 left-5",
    "top-52 right-80",
    "top-10 left-80",
    "top-10 right-5",
    "top-52 left-5",
  ];

  const children: FinderItem[] = (project.files ?? []).map((file: SanityProjectFile, fi: number) => {
    const filePositions = [
      "top-5 left-10",
      "top-10 right-20",
      "top-52 right-80",
      "top-60 right-20",
      "top-32 left-40",
    ];

    const iconMap: Record<string, string> = {
      txt: "/images/txt.png",
      url: "/images/safari.png",
      pdf: "/images/pdf.png",
      fig: "/images/plain.png",
      img: "/images/image.png",
    };

    return {
      id: file._key ?? fi,
      name: file.name ?? "Untitled",
      icon: iconMap[file.fileType ?? "txt"] ?? "/images/txt.png",
      kind: "file",
      fileType: file.fileType ?? "txt",
      href: file.href,
      position: file.position ?? filePositions[fi % filePositions.length],
      description: file.description,
      imageUrl: file.asset && file.assetUrl ? projectImage(file.asset) : undefined,
    };
  });

  return {
    id: project._id,
    name: project.title,
    icon: "/images/folder.png",
    kind: "folder",
    position: project.position ?? defaultPositions[index % defaultPositions.length],
    children,
  };
}

const Finder = () => {
  const { openWindow, closeWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const [mobileSearch, setMobileSearch] = useState("");
  const [isAtBrowseRoot, setIsAtBrowseRoot] = useState(false);
  const { data, loading } = useSanityData();

  // Build dynamic project folders from Sanity, falling back to constants while loading
  const projectFolders: FinderItem[] = useMemo(() => {
    if (!loading && data.portfolio.length > 0) {
      return data.portfolio.map((p, i) => sanityProjectToFinderItem(p, i));
    }
    // Fallback to hardcoded constants while Sanity loads
    return locations.work.children as FinderItem[];
  }, [data.portfolio, loading]);

  // Merged work location using live Sanity projects
  const workLocation = useMemo(
    () => ({ ...locations.work, children: projectFolders }),
    [projectFolders]
  );

  const openItem = (item: FinderItem) => {
    if (item.fileType === "pdf") return openWindow("resume", item);
    if (item.kind === "folder") {
      setIsAtBrowseRoot(false);
      return setActiveLocation(item);
    }
    if (["fig", "url"].includes(item.fileType ?? "") && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  // Determine hierarchy for iOS Files app
  const isWorkFolder = activeLocation?.id === locations.work.id;
  const isProjectChild = workLocation.children?.some((p) => p.id === activeLocation?.id);
  const currentFolderTitle = isAtBrowseRoot
    ? "Browse"
    : (activeLocation?.name ?? "Browse");

  // Handle Mobile iOS Back Navigation
  const handleMobileBack = () => {
    if (isProjectChild) {
      setActiveLocation(workLocation);
    } else if (!isAtBrowseRoot && (isWorkFolder || activeLocation?.id !== undefined)) {
      setIsAtBrowseRoot(true);
    } else {
      closeWindow("finder");
    }
  };

  const getMobileBackLabel = () => {
    if (isProjectChild) return "Work";
    if (!isAtBrowseRoot) return "Browse";
    return "Home";
  };

  // Desktop render sidebar lists
  const renderDesktopList = (name: string, items: FinderItem[]) => (
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
            onClick={() => {
              setIsAtBrowseRoot(false);
              setActiveLocation(item);
            }}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const browseLocations = [
    {
      id: workLocation.id,
      name: "Work (Projects)",
      subtitle: `${workLocation.children?.length ?? 0} project folders`,
      icon: "/images/folder.png",
      rawLocation: workLocation,
    },
    {
      id: locations.about.id,
      name: "About Me",
      subtitle: "Photos & Bio",
      icon: "/icons/info.svg",
      rawLocation: locations.about,
    },
    {
      id: locations.resume.id,
      name: "Resume",
      subtitle: "PDF Document",
      icon: "/images/pdf.png",
      rawLocation: locations.resume,
    },
    {
      id: locations.trash.id,
      name: "Archive",
      subtitle: "Archived files",
      icon: "/icons/trash.svg",
      rawLocation: locations.trash,
    },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* Mobile iOS Files App Interface                                            */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col h-full bg-gray-50 select-none overflow-hidden">
        {/* iOS Navigation Header */}
        <div className="bg-gray-50/95 backdrop-blur-md border-b border-gray-200 px-4 pt-3 pb-2 flex items-center justify-between shrink-0">
          <WindowControls
            target="finder"
            onBack={handleMobileBack}
            backLabel={getMobileBackLabel()}
          />
          <h1 className="font-semibold text-base text-gray-900 truncate max-w-45 text-center">
            {currentFolderTitle}
          </h1>
          <div className="w-12 flex justify-end">
            <LayoutGrid size={18} className="text-[#007AFF]" />
          </div>
        </div>

        {/* iOS Search Bar */}
        <div className="px-4 py-2 bg-gray-50 shrink-0">
          <div className="flex items-center gap-2 bg-gray-200/80 rounded-xl px-3 py-1.5 text-gray-500">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              placeholder="Search in Files"
              className="bg-transparent text-xs text-gray-800 placeholder:text-gray-400 outline-none w-full"
            />
          </div>
        </div>

        {/* iOS Files Content View */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          {/* Level 1: Root Browse View */}
          {isAtBrowseRoot ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
                  Locations
                </h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                  {browseLocations.map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => {
                        setIsAtBrowseRoot(false);
                        setActiveLocation(loc.rawLocation);
                      }}
                      className="flex items-center justify-between p-3.5 active:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={loc.icon} alt={loc.name} className="size-7 object-contain" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{loc.name}</p>
                          <p className="text-xs text-gray-400">{loc.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : isWorkFolder ? (
            /* Level 2: Work Folder -> Lists separate Project Folders */
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Projects ({projectFolders.length})
                </h2>
                <span className="text-xs text-blue-600 font-medium">Select a folder</span>
              </div>

              {loading && (
                <p className="text-xs text-gray-400 px-1 animate-pulse">Loading projects…</p>
              )}

              <div className="grid grid-cols-1 gap-2.5">
                {projectFolders
                  .filter((p) => p.name.toLowerCase().includes(mobileSearch.toLowerCase()))
                  .map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        setIsAtBrowseRoot(false);
                        setActiveLocation(project);
                      }}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <FolderIcon className="size-6 text-blue-500 fill-blue-500/20" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                            {project.name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {project.children?.length ?? 0} files inside
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 shrink-0 ml-2" />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* Level 3: Inside a Specific Project / Location Files */
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Files ({activeLocation?.children?.length ?? 0})
                </h2>
                <span className="text-xs text-gray-400">Tap to open</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(activeLocation as FinderItem | null)?.children
                  ?.filter((item) => item.name.toLowerCase().includes(mobileSearch.toLowerCase()))
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openItem(item)}
                      className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-between text-center cursor-pointer active:scale-95 transition-all min-h-36"
                    >
                      <div className="size-14 rounded-xl flex items-center justify-center my-auto">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="size-full object-contain drop-shadow-sm"
                        />
                      </div>
                      <div className="w-full mt-2">
                        <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
                          {item.name}
                        </p>
                        <span className="text-[10px] text-blue-600 uppercase font-medium">
                          {item.fileType === "url"
                            ? "Demo"
                            : item.fileType === "fig"
                              ? "Figma"
                              : item.fileType ?? "File"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* iOS Files Bottom Tab Bar */}
        <div className="bg-white/90 backdrop-blur-md border-t border-gray-200 px-6 py-2 flex justify-around items-center shrink-0">
          <button
            type="button"
            onClick={() => setIsAtBrowseRoot(true)}
            className={clsx(
              "flex flex-col items-center gap-0.5 text-[10px] font-medium cursor-pointer",
              isAtBrowseRoot ? "text-[#007AFF]" : "text-gray-400"
            )}
          >
            <LayoutGrid size={18} />
            <span>Browse</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAtBrowseRoot(false);
              setActiveLocation(workLocation);
            }}
            className={clsx(
              "flex flex-col items-center gap-0.5 text-[10px] font-medium cursor-pointer",
              !isAtBrowseRoot && isWorkFolder ? "text-[#007AFF]" : "text-gray-400"
            )}
          >
            <FolderIcon size={18} />
            <span>Projects</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Desktop macOS Finder Window                                               */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col select-none h-full w-full">
        <div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
          <WindowControls target="finder" />
          <h2 className="font-bold text-sm text-center flex-1 text-gray-700 truncate px-2">
            {activeLocation?.name ?? "Portfolio"}
          </h2>
          <div className="w-12 flex justify-end">
            <Search className="p-1 hover:bg-gray-200 rounded cursor-default size-6 text-gray-500" />
          </div>
        </div>

        <div className="bg-white flex flex-1 h-full min-h-87.5 overflow-hidden">
          <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col p-5 space-y-3 shrink-0 overflow-y-auto">
            {renderDesktopList("Favorites", Object.values(locations) as FinderItem[])}
            {renderDesktopList("My Projects", projectFolders)}
          </div>

          <ul className="flex-1 p-8 bg-white relative min-w-130 min-h-90 overflow-auto">
            {loading && (activeLocation as FinderItem | null)?.id === workLocation.id && (
              <li className="absolute top-4 left-4 text-xs text-gray-400 animate-pulse">
                Loading projects…
              </li>
            )}
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
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
