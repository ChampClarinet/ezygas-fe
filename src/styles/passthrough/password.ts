import clsx from "clsx";
import { PasswordPassThroughOptions } from "primereact/password";

const passwordPT: PasswordPassThroughOptions = {
  root: ({ props }: any) => ({
    className: clsx(
      "inline-flex",
      "relative",
      props.disabled &&
        "opacity-60 select-none pointer-events-none cursor-default"
    ),
  }),
  panel: {
    className: clsx(
      "p-5",
      "bg-white",
      "text-gray-1000",
      "shadow-md",
      "rounded-md",
      "border",
      "border-solid",
      "border-gray-300"
    ),
  },
  meter: { className: clsx("mb-2", "bg-gray-300", "h-3") },
  meterLabel: ({ state, props }: any) => ({
    className: clsx(
      "transition-width duration-1000 ease-in-out h-full",
      {
        "bg-red-500": state.meter?.strength == "weak",
        "bg-orange-500": state.meter?.strength == "medium",
        "bg-green-500": state.meter?.strength == "strong",
      },
      { "pr-[2.5rem] ": props.toggleMask }
    ),
  }),
  showIcon: {
    className: clsx("absolute top-1/2 -mt-2", "right-3 text-gray-600"),
  },
  hideIcon: {
    className: clsx("absolute top-1/2 -mt-2", "right-3 text-gray-600"),
  },
  input: { className: clsx("w-full", "text-gray-1000") },
};

export default passwordPT;
