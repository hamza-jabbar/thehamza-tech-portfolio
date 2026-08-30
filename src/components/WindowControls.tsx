import useWindowStore from "#store/window";
import { ChevronLeft } from "lucide-react";

interface WindowControlsProps {
  target: string;
  onBack?: () => void;
  backLabel?: string;
}

const WindowControls = ({ target, onBack, backLabel = "Back" }: WindowControlsProps) => {
  const { closeWindow } = useWindowStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      closeWindow(target);
    }
  };

  return (
    <>
      {/* Mobile: iOS Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="md:hidden flex items-center text-[#007AFF] font-medium text-sm active:opacity-60 transition-opacity cursor-pointer focus:outline-none -ml-1"
      >
        <ChevronLeft size={20} className="stroke-[2.5]" />
        <span>{backLabel}</span>
      </button>

      {/* Desktop: macOS Traffic Light Dots */}
      <div className="hidden md:flex gap-2 items-center">
        <div
          className="size-3.5 rounded-full bg-[#ff6157] cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => closeWindow(target)}
          title="Close"
        />
        <div className="size-3.5 rounded-full bg-[#ffc030]" title="Minimize" />
        <div className="size-3.5 rounded-full bg-[#2acb42]" title="Maximize" />
      </div>
    </>
  );
};

export default WindowControls;
