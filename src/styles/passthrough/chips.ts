import clsx from "clsx";
import { ChipsPassThroughOptions } from "primereact/chips";

const chipsPT: ChipsPassThroughOptions = {
  root: ({ props }: any) => ({
    className: clsx("flex", {
      "opacity-60 select-none pointer-events-none cursor-default":
        props.disabled,
    }),
  }),
  container: {
    className: clsx(
      "m-0 py-1.5 px-3 list-none cursor-text overflow-hidden flex items-center flex-wrap",
      "w-full",
      "font-sukhumvit text-base text-gray-600 bg-white p-3 border border-gray-300 transition-colors duration-200 appearance-none rounded-lg",
      "hover:border-current focus:outline-none focus:outline-offset-0"
    ),
  },
  inputToken: {
    className: clsx("py-1.5 px-0", "flex flex-1 inline-flex"),
  },
  input: {
    className: clsx(
      "font-sukhumvit text-base text-gray-700 p-0 m-0",
      "border-0 outline-none bg-transparent shadow-none rounded-none w-full"
    ),
  },
  token: {
    className: clsx(
      "py-1 px-2 mr-2 bg-gray-300 text-gray-1000 rounded-full",
      "cursor-default inline-flex items-center"
    ),
  },
  removeTokenIcon: { className: "ml-2" },
};

export default chipsPT;
