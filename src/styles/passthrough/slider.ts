import clsx from "clsx";

const sliderPT = {
  root: ({ props }: any) => ({
    className: clsx(
      "relative",
      "bg-gray-500",
      "border-0 rounded-6",
      {
        "h-1 w-56": props.orientation == "horizontal",
        "w-1 h-56": props.orientation == "vertical",
      },
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      }
    ),
  }),
  range: ({ props }: any) => ({
    className: clsx("bg-blue-900", "block absolute", {
      "top-0 left-0 h-full": props.orientation == "horizontal",
      "bottom-0 left-0 w-full": props.orientation == "vertical",
    }),
  }),
  handle: ({ props }: any) => ({
    className: clsx(
      "h-4 w-4 bg-blue-900",
      "border-2 border-blue-900 rounded-full transition duration-200",
      "cursor-grab touch-action-none block",
      "focus:outline-none focus:outline-offset-0",
      "hover:bg-blue-900 hover:border hover:border-blue-900",
      {
        "top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]":
          props.orientation == "horizontal",
        "left-[50%] mb-[-0.5715rem] ml-[-0.4715rem]":
          props.orientation == "vertical",
      }
    ),
  }),
};

export default sliderPT;
