import { CheckboxPassThroughOptions } from "primereact/checkbox";

const checkboxPT: CheckboxPassThroughOptions = {
  root: {
    className: [
      "cursor-pointer inline-flex relative select-none align-bottom",
      "w-6 h-6",
    ],
  },
  input: ({ props, context }: any) => ({
    className: [
      "flex items-center justify-center",
      "border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200",
      {
        "border-gray-300 bg-white": !context.checked,
        "border-current bg-current": context.checked,
      },
      {
        "hover:border-blue-500 focus:outline-none focus:outline-offset-0":
          !props.disabled,
        "cursor-default opacity-60": props.disabled,
      },
    ],
  }),
  icon: {
    className:
      "w-4 h-4 transition-all duration-200 text-white text-base",
  },
};

export default checkboxPT;
