import clsx from "clsx";
import { InputSwitchPassThroughOptions } from "primereact/inputswitch";

const inputSwitchPT: InputSwitchPassThroughOptions = {
  root: ({ props }: any) => ({
    className: clsx("inline-block relative", "w-12 h-7", {
      "opacity-60 select-none pointer-events-none cursor-default":
        props.disabled,
    }),
  }),
  slider: ({ props }: any) => ({
    className: clsx(
      "absolute cursor-pointer top-0 left-0 right-0 bottom-0 border border-transparent",
      "transition-colors duration-200 rounded-2xl",
      "focus:outline-none focus:outline-offset-0",
      "before:absolute before:content-'' before:top-1/2 before:bg-white before:w-5 before:h-5 before:left-1 before:-mt-2.5 before:rounded-full before:transition-duration-200",
      {
        "bg-gray-500 hover:bg-gray-600":
          !props.checked,
        "bg-green-500 before:transform before:translate-x-5": props.checked,
      }
    ),
  }),
};

export default inputSwitchPT;
