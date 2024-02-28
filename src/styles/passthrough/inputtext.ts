import clsx from "clsx";
import { InputTextPassThroughOptions } from "primereact/inputtext";

const inputPT: InputTextPassThroughOptions = {
  root: ({ props, context }: any) => ({
    className: clsx(
      "m-0",
      "font-sukhumvit text-gray-1000 bg-white border border-gray-400 transition-colors duration-200 appearance-none rounded-full",
      {
        "hover:border-current focus:outline-none focus:outline-offset-0":
          !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },
      {
        "text-lg px-4 py-4": props.size == "large",
        "text-xs px-2 py-2": props.size == "small",
        "py-3 px-5 text-base": props.size == null,
      }
    ),
  }),
};

export default inputPT;
