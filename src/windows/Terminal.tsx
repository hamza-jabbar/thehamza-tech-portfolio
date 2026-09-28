"use client";

import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag, Folder as FolderIcon } from "lucide-react";
import { WindowControls } from "#components";
import { useSanityData } from "#hooks/useSanityData";
import { useMemo } from "react";
import { useWindowRouteSync } from "#hooks/useWindowRouteSync";
import { sanityProjectToFinderItem } from "#lib/finderUtils";

const Terminal = () => {
  const { data, loading } = useSanityData();
  const { navigateToWindow } = useWindowRouteSync();

  // Each Skill document is now a category:
  //   skill.title  → category heading
  //   skill.skills → sub-skill chip labels
  //   skill.portfolio → linked Finder project folders
  const skillGroups = useMemo(() => {
    if (!loading && data.skills.length > 0) {
      return data.skills.map((skill) => ({
        category: skill.title,
        items: skill.skills ?? [],
        portfolio: skill.portfolio ?? [],
      }));
    }
    return techStack.map((g) => ({ ...g, portfolio: [] }));
  }, [data.skills, loading]);

  // Pre-build a lookup of Sanity portfolio → FinderItem for fast access
  const finderItemMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof sanityProjectToFinderItem>>();
    data.portfolio.forEach((p, i) => {
      map.set(p._id, sanityProjectToFinderItem(p, i));
    });
    return map;
  }, [data.portfolio]);

  const totalCategories = skillGroups.length;
  const loadedCategories = skillGroups.filter((g) => g.items.length > 0).length;

  return (
    <div className="flex flex-col h-full bg-white select-none overflow-hidden">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
        <WindowControls target="terminal" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-700">Skills & Tech Stack</h2>
        <div className="w-12 md:hidden" />
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 text-xs md:text-sm font-roboto text-gray-800">
        <div className="bg-gray-100/70 p-3 rounded-lg border border-gray-200/80 mb-4">
          <p className="font-mono">
            <span className="font-bold text-blue-600">@hamza</span>
            <span className="text-gray-400"> % </span>
            <span className="text-gray-900 font-semibold">show techstack --all</span>
          </p>
        </div>

        {loading && (
          <p className="text-xs text-gray-400 animate-pulse mb-3">Fetching skills…</p>
        )}

        <ul className="py-4 my-2 border-y border-dashed border-gray-300 space-y-4">
          {skillGroups.map(({ category, items, portfolio }) => (
            <li
              className="flex flex-col gap-2 py-1"
              key={category}
            >
              {/* Category heading */}
              <div className="flex items-center gap-2">
                <Check className="text-[#00A154] shrink-0" size={16} />
                <h3 className="font-semibold text-[#00A154]">{category}</h3>
              </div>

              {/* Sub-skill chips */}
              {items.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pl-6">
                  {items.map((item, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs border border-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* Linked portfolio project buttons */}
              {portfolio.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pl-6">
                  {portfolio.map((proj) => {
                    const finderItem = finderItemMap.get(proj._id);
                    if (!finderItem) return null;
                    return (
                      <button
                        key={proj._id}
                        onClick={() => navigateToWindow("finder", finderItem)}
                        className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                      >
                        <FolderIcon size={12} className="shrink-0" />
                        {proj.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="text-[#00A154] space-y-1 mt-4 text-xs">
          <p className="flex items-center gap-2">
            <Check size={16} className="shrink-0" />
            <span>
              {loadedCategories} of {totalCategories} categories loaded successfully (
              {totalCategories > 0 ? Math.round((loadedCategories / totalCategories) * 100) : 0}%)
            </span>
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <Flag size={14} fill="currentColor" className="shrink-0" />
            <span>Render time: 4ms • Status: Ready to build</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
