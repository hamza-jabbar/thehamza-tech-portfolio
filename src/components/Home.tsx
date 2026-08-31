import { locations } from "#constants";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { Search } from "lucide-react";

const projects = locations.work?.children ?? [];

interface MobileApp {
  id: string;
  name: string;
  icon: string;
  action: () => void;
}

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleWindowOpenFinder = (project: (typeof projects)[number]) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    // Only initialize draggable on desktop
    if (window.innerWidth >= 768) {
      Draggable.create(".folder");
    }
  }, []);

  const mobileApps: MobileApp[] = [
    {
      id: "finder",
      name: "Files",
      icon: "/images/icons/files.svg",
      action: () => {
        setActiveLocation(locations.work);
        openWindow("finder");
      },
    },
    {
      id: "terminal",
      name: "Skills",
      icon: "/images/icons/terminal.svg",
      action: () => openWindow("terminal"),
    },
    {
      id: "safari",
      name: "Blog",
      icon: "/images/icons/safari.svg",
      action: () => openWindow("safari"),
    },
    {
      id: "photos",
      name: "Photos",
      icon: "/images/icons/photos.svg",
      action: () => openWindow("photos"),
    },
    {
      id: "contact",
      name: "Contact",
      icon: "/images/icons/contacts.svg",
      action: () => openWindow("contact"),
    },
    {
      id: "resume",
      name: "Resume",
      icon: "/images/icons/resume.svg",
      action: () => openWindow("resume"),
    },
    {
      id: "about",
      name: "About Me",
      icon: "/images/icons/resume.svg",
      action: () => {
        const aboutData = locations.about.children?.find((c) => c.fileType === "txt");
        openWindow("txtfile", aboutData);
      },
    },
    {
      id: "trash",
      name: "Archive",
      icon: "/images/trash.png",
      action: () => {
        setActiveLocation(locations.trash);
        openWindow("finder");
      },
    },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* Mobile iPhone SpringBoard (Grid of Apps + Search Pill Coming soon)        */}
      {/* ========================================================================= */}
      <section className="md:hidden flex flex-col justify-between h-dvh pt-16 pb-28 px-4 overflow-y-auto z-10 select-none">
        <div>
          {/* iOS 4-Column App Grid */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-3 max-w-sm mx-auto">
            {mobileApps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={app.action}
                className="flex flex-col items-center group cursor-pointer active:scale-90 transition-transform duration-150 focus:outline-none"
              >
                <div className="size-15 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="size-full object-contain drop-shadow-sm"
                  />
                </div>
                <span className="text-[11px] font-medium text-white text-center mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tracking-tight truncate w-full px-0.5">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* iOS Search Pill Button */}
        {/* <div className="flex justify-center mt-auto mb-2">
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-xs font-medium shadow-md border border-white/10 active:scale-95 transition-transform cursor-pointer">
            <Search size={12} className="stroke-[2.5]" />
            <span>Search</span>
          </div>
        </div> */}
      </section>

      {/* ========================================================================= */}
      {/* Desktop macOS Folders View                                                */}
      {/* ========================================================================= */}
      <section id="home" className="hidden md:block relative z-0">
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={clsx(
                "group folder absolute z-0 select-none flex items-center flex-col cursor-pointer",
                project.windowPosition
              )}
              onClick={() => handleWindowOpenFinder(project)}
            >
              <img
                src="/images/folder.png"
                alt={project.name}
                className="group-hover:bg-gray-950/10  rounded-md transition-colors"
              />
              <p className="text-sm text-white text-center px-1 rounded-md group-hover:bg-blue-500 transition-colors max-w-40">
                {project.name}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
