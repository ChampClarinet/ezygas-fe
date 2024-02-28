import clsx from "clsx";
import { InputTextareaPassThroughOptions } from "primereact/inputtextarea";

const inputtextareaPT: InputTextareaPassThroughOptions = {
  root: ({ context }: any) => ({
    className: clsx(
      "m-0",
      "font-sukhumvit text-base text-gray-1000 bg-white p-3 border border-gray-400 transition-colors duration-200 appearance-none rounded-2xl",
      "hover:border-current focus:outline-none focus:outline-offset-0",
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      }
    ),
  }),
};

export default inputtextareaPT;