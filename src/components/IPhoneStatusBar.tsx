import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Wifi } from "lucide-react";

const IPhoneStatusBar = () => {
  const [time, setTime] = useState(dayjs().format("h:mm"));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("h:mm"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="md:hidden fixed top-0 inset-x-0 z-40 px-6 pt-3 pb-1 flex items-center justify-between text-white select-none pointer-events-none">
      {/* Left: Time */}
      <div className="w-16">
        <span className="text-sm font-semibold tracking-tight">{time}</span>
      </div>

      {/* Center: Dynamic Island / Notch Pill */}
      <div className="pointer-events-auto flex items-center justify-between gap-2.5 bg-black/90 text-white px-3 py-1 rounded-full text-[10px] shadow-lg border border-white/10 transition-all hover:scale-105">
        <div className="size-2 rounded-full bg-emerald-500/80 animate-pulse" />
        <span className="font-medium text-xs text-white/90">Hamza's Portfolio</span>
      </div>

      {/* Right: Cellular, WiFi, Battery */}
      <div className="flex items-center gap-2 justify-end w-16 text-white">
        {/* Signal Bars */}
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 h-1 bg-white rounded-xs" />
          <span className="w-0.5 h-1.5 bg-white rounded-xs" />
          <span className="w-0.5 h-2 bg-white rounded-xs" />
          <span className="w-0.5 h-2.5 bg-white rounded-xs" />
        </div>

        {/* WiFi */}
        <Wifi size={13} className="stroke-[2.5]" />

        {/* Battery */}
        <div className="relative flex items-center">
          <div className="w-5 h-2.5 border border-white/80 rounded-xs p-px flex items-center">
            <div className="h-full w-4/5 bg-white rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-1 bg-white/80 rounded-r-xs" />
        </div>
      </div>
    </div>
  );
};

export default IPhoneStatusBar;
