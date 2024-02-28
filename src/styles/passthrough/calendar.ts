import clsx from "clsx";
import { CalendarPassThroughOptions } from "primereact/calendar";

const TRANSITIONS = {
  overlay: {
    timeout: 150,
    clsx: {
      enter: "opacity-0 scale-75",
      enterActive:
        "opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in",
      exit: "opacity-100",
      exitActive: "!opacity-0 transition-opacity duration-150 ease-linear",
    },
  },
};

const calendarPT: CalendarPassThroughOptions = {
  root: ({ props }: any) => ({
    className: clsx("inline-flex max-w-full relative !font-sukhumvit", {
      "opacity-60 select-none pointer-events-none cursor-default":
        props.disabled,
    }),
  }),
  input: {
    root: ({ parent }: any) => ({
      className: clsx(
        "text-base text-current font-sukhumvit bg-white p-3 border border-current transition-colors duration-200 appearance-none",
        "hover:border-blue-500",
        {
          "rounded-lg": !parent.props.showIcon,
          "border-r-0 rounded-l-lg": parent.props.showIcon,
        }
      ),
    }),
  },
  dropdownButton: {
    root: ({ props }: any) => ({
      className: clsx({ "rounded-l-none bg-current text-white": props.icon }),
    }),
  },
  panel: ({ props }: any) => ({
    className: clsx("bg-white", "font-sukhumvit", {
      "shadow-md border-0 absolute": !props.inline,
      "inline-block overflow-x-auto border border-gray-300 p-2 rounded-lg":
        props.inline,
    }),
  }),
  header: {
    className: clsx(
      "flex items-center justify-between",
      "p-2 text-gray-700 bg-white font-semibold m-0 border-b border-gray-300 rounded-t-lg"
    ),
  },
  previousButton: {
    className: clsx(
      "flex items-center justify-center cursor-pointer overflow-hidden relative",
      "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
      "hover:text-current hover:border-transparent hover:bg-blue-200"
    ),
  },
  title: { className: "leading-8 mx-auto" },
  monthTitle: {
    className: clsx(
      "text-gray-700 transition duration-200 font-semibold p-2",
      "mr-2",
      "hover:text-current"
    ),
  },
  yearTitle: {
    className: clsx(
      "text-gray-700 transition duration-200 font-semibold p-2",
      "hover:text-current"
    ),
  },
  nextButton: {
    className: clsx(
      "flex items-center justify-center cursor-pointer overflow-hidden relative",
      "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
      "hover:text-current hover:border-transparent hover:bg-blue-200"
    ),
  },
  table: {
    className: clsx("border-collapse w-full", "my-2"),
  },
  tableHeaderCell: { className: clsx("p-2") },
  weekDay: { className: clsx("text-black", "font-bold", "select-none") },
  day: { className: "p-2" },
  dayLabel: ({ context }: any) => ({
    className: clsx(
      "w-10 h-10 rounded-full transition-shadow duration-200 border-transparent border text-black",
      "flex items-center justify-center mx-auto overflow-hidden relative",
      "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(12,12,169,1)]",
      {
        "opacity-60 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
      {
        "text-black bg-transprent hover:bg-blue-200 hover:text-current":
          !context.selected && !context.disabled,
        "text-blue-700 bg-blue-100 hover:bg-blue-200":
          context.selected && !context.disabled,
      }
    ),
  }),
  monthPicker: { className: "my-2" },
  month: ({ context }: any) => ({
    className: clsx(
      "w-1/3 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
      "p-2 transition-shadow duration-200 rounded-lg",
      "focus:outline-none focus:outline-offset-0",
      {
        "text-gray-600 bg-transprent hover:bg-blue-200 hover:text-current":
          !context.selected && !context.disabled,
        "text-blue-current bg-blue-100 hover:bg-blue-200":
          context.selected && !context.disabled,
      }
    ),
  }),
  yearPicker: {
    className: clsx("my-2"),
  },
  year: ({ context }: any) => ({
    className: clsx(
      "w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
      "p-2 transition-shadow duration-200 rounded-lg",
      "focus:outline-none focus:outline-offset-0",
      {
        "text-gray-600 bg-transprent hover:bg-blue-200 hover:text-current":
          !context.selected && !context.disabled,
        "text-current bg-blue-100 hover:bg-blue-200":
          context.selected && !context.disabled,
      }
    ),
  }),
  timePicker: {
    className: clsx(
      "flex justify-center items-center",
      "border-t-1 border-solid border-gray-300 p-2"
    ),
  },
  separatorContainer: { className: "flex items-center flex-col px-2" },
  separator: { className: "text-xl" },
  hourPicker: { className: "flex items-center flex-col px-2" },
  minutePicker: { className: "flex items-center flex-col px-2" },
  ampmPicker: { className: "flex items-center flex-col px-2" },
  incrementButton: {
    className: clsx(
      "flex items-center justify-center cursor-pointer overflow-hidden relative",
      "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
      "hover:text-current hover:border-transparent hover:bg-blue-200"
    ),
  },
  decrementButton: {
    className: clsx(
      "flex items-center justify-center cursor-pointer overflow-hidden relative",
      "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
      "hover:text-current hover:border-transparent hover:bg-blue-200"
    ),
  },
  groupContainer: { className: "flex" },
  group: {
    className: clsx(
      "flex-1",
      "border-l border-gray-300 pr-0.5 pl-0.5 pt-0 pb-0",
      "first:pl-0 first:border-l-0"
    ),
  },
  transition: TRANSITIONS.overlay,
};

export default calendarPT;
