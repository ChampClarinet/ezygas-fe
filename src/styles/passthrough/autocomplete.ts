import clsx from "clsx";
import { AutoCompletePassThroughOptions } from "primereact/autocomplete";

const TRANSITIONS = {
  overlay: {
    timeout: 150,
    classNames: {
      enter: "opacity-0 scale-75",
      enterActive:
        "opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in",
      exit: "opacity-100",
      exitActive: "!opacity-0 transition-opacity duration-150 ease-linear",
    },
  },
};

const autocompletePT: AutoCompletePassThroughOptions = {
  root: ({ props }: any) => ({
    className: clsx(
      "relative inline-flex",
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
      { "w-full": props.multiple }
    ),
  }),
  container: {
    className: clsx(
      "m-0 list-none cursor-text overflow-hidden flex items-center flex-wrap w-full",
      "px-3 py-2 gap-2",
      "text-base text-gray-700 bg-white border border-gray-300 transition duration-200 ease-in-out appearance-none rounded-md",
      "focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(12,12,169,1)] hover:border-blue-500 focus:outline-none"
    ),
  },
  inputToken: {
    className: clsx("py-0.375rem px-0", "flex-1 inline-flex"),
  },
  input: ({ props }: any) => ({
    root: {
      className: clsx(
        "m-0",
        "font-sukhumvit",
        "transition-colors duration-200 appearance-none rounded-full",
        { "rounded-tr-none rounded-br-none": props.dropdown },
        {
          "text-base text-gray-1000 bg-white p-3 border border-gray-300 focus:outline-offset-0 focus:shadow-lg hover:border-blue-500 focus:outline-none":
            !props.multiple,
          "text-base text-gray-1000 border-0 outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full":
            props.multiple,
        }
      ),
    },
  }),
  token: {
    className: clsx(
      "py-1 px-2 mr-2 bg-gray-300 text-gray-1000 rounded-full",
      "cursor-default inline-flex items-center"
    ),
  },
  dropdownButton: {
    root: "rounded-tl-none rounded-bl-none",
  } as any,
  panel: {
    className: clsx(
      "bg-white text-gray-1000 border-0 rounded-md shadow-lg",
      "max-h-[200px] overflow-auto"
    ),
  },
  list: {
    className: "py-3 list-none m-0",
  },
  item: ({ context }: any) => ({
    className: clsx(
      "cursor-pointer font-normal overflow-hidden relative whitespace-nowrap",
      "m-0 p-3 border-0 transition-shadow duration-200 rounded-none",
      {
        "text-gray-1000 hover:text-gray-700 hover:bg-gray-200":
          !context.selected,
        "bg-gray-300 text-gray-1000 hover:text-gray-1000 hover:bg-gray-200":
          context.focused && !context.selected,
        "bg-blue-100 text-blue-700": context.selected,
        "bg-blue-50 text-blue-700": context.selected,
      }
    ),
  }),
  itemGroup: {
    className: clsx(
      "m-0 p-3 text-gray-1000 bg-white font-bold",
      "cursor-auto"
    ),
  },
  transition: TRANSITIONS.overlay,
};

export default autocompletePT;
