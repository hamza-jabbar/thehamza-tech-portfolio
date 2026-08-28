import useWindowStore from "#store/window";

interface WindowControlsProps {
    target: string;
}

const WindowControls = ({ target }: WindowControlsProps) => {
    const { closeWindow } = useWindowStore();

    return (
        <div className="flex gap-2 items-center">
            <div
                className="size-3.5 rounded-full bg-[#ff6157] cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => closeWindow(target)}
                title="Close"
            />
            <div className="size-3.5 rounded-full bg-[#ffc030]" title="Minimize" />
            <div className="size-3.5 rounded-full bg-[#2acb42]" title="Maximize" />
        </div>
    );
};

export default WindowControls;
