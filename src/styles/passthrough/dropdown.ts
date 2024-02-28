import clsx from "clsx";

const TRANSITIONS = {
  overlay: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass:
      "transition-transform transition-opacity duration-150 ease-in",
    leaveActiveClass: "transition-opacity duration-150 ease-linear",
    leaveToClass: "opacity-0",
  },
};

const dropdownPT: any = {
  root: ({ props }: any) => ({
    className: clsx(
      "cursor-pointer inline-flex relative select-none",
      "bg-white border border-gray-400 transition-colors duration-200 ease-in-out rounded-3xl",
      "w-full",
      "focus:outline-none focus:outline-offset-0",
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      }
    ),
  }),
  input: ({ props }: any) => ({
    className: clsx(
      "font-sukhumvit",
      "cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative",
      "bg-transparent border-0 text-gray-1000",
      "p-3 transition duration-200 bg-transparent rounded appearance-none text-base",
      "focus:outline-none focus:shadow-none",
      "p-[.7rem_1.5rem_.65rem]",
      { "pr-7": props.showClear }
    ),
  }),
  trigger: {
    className: clsx(
      "flex items-center justify-center shrink-0",
      "bg-transparent text-gray-500 w-12 rounded-tr-lg rounded-br-lg"
    ),
  },
  wrapper: {
    className: clsx(
      "max-h-[200px] overflow-auto",
      "bg-white text-gray-700 border-0 rounded-md shadow-lg"
    ),
  },
  list: clsx("py-3 list-none m-0", "border", "border-solid", "border-gray-300"),
  item: ({ context }: any) => ({
    className: clsx(
      "font-sukhumvit",
      "cursor-pointer font-normal overflow-hidden relative whitespace-nowrap",
      "m-0 p-3 border-0  transition-shadow duration-200 rounded-none",
      "hover:text-gray-1000 hover:bg-gray-200",
      context.focused && !context.selected && ["bg-gray-300", "text-gray-1000"],
      context.focused && context.selected && ["bg-blue-400 text-current"],
      !context.focused && context.selected && ["bg-blue-50 text-blue-700"],
      context.disabled &&
        "opacity-60 select-none pointer-events-none cursor-default",
      !context.focused && !context.selected && "text-gray-1000"
    ),
  }),
  itemgroup: {
    className: clsx("m-0 p-3 text-gray-1000 bg-white font-bold", "cursor-auto"),
  },
  header: {
    className: clsx(
      "p-3 border-b border-gray-300 text-gray-1000 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg"
    ),
  },
  filtercontainer: "relative",
  filterinput: {
    className: clsx(
      "w-full",
      "font-sukhumvit",
      "text-base",
      "text-gray-1000",
      "bg-white",
      "p-[.7rem_1.5rem_.65rem]",
      "border border-gray-400",
      "transition duration-200",
      "rounded-3xl",
      "appearance-none",
      "focus:outline-none focus:outline-offset-0"
    ),
  },
  filtericon: "-mt-2 absolute top-1/2 fill-blue-900",
  clearicon: "text-gray-500 right-12 -mt-2 absolute top-1/2",
  transition: TRANSITIONS.overlay,
};

export default dropdownPT;
