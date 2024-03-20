import { FC } from "react";
import clsx from "clsx";
import { Image } from "primereact/image";

export interface SideButtonProps {
  onClick: () => unknown;
  show?: boolean;
  disabled?: boolean;
}
const SideButton: FC<SideButtonProps> = ({
  onClick,
  show = false,
  disabled = false,
}) => {
  return (
    <div
      className={clsx(
        "bg-current",
        "p-2",
        "rounded-xl",
        "flex",
        "justify-center",
        "items-center",
        "fixed",
        "bottom-[40%]",
        "w-[60px]",
        "h-[70px]",
        "z-[1000]",
        "transition-all",
        "duration-300",
        show ? "left-[calc(100%_-_60px)]" : "left-[100%]",
        disabled ? ["grayscale-1"] : "clickable"
      )}
      onClick={onClick}
    >
      <Image
        className="sidebar-icon"
        src="/assets/img/white_cylinder.svg"
        alt="fill"
      />
    </div>
  );
};

export default SideButton;
