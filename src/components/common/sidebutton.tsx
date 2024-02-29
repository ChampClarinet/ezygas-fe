import clsx from "clsx";

interface SideButtonProps {
  button: any;
  onClick: any;
}
const SideButton = ({ button, onClick }: SideButtonProps): JSX.Element => (
  <div
    className={clsx(
      "side-button-container",
      "w-[280px]",
      "fixed",
      "z-[1030]",
      "top-[50%]",
      "right-[50px]",
      "bg-current",
      "shadow-md",
      "translate-x-[280px]",
      "translate-y-[-50%]",
      "transition-transform",
      "duration-500",
      "py-[10px]"
    )}
  >
    <span
      className={clsx(
        "side-button",
        "flex",
        "justify-center",
        "absolute",
        "bg-current",
        "py-3",
        "px-4",
        "rounded-xl",
        "top-[50%]",
        "translate-y-[-50%]",
        "text-white",
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      {button}
    </span>
  </div>
);

export default SideButton;
