import clsx from "clsx";
import { RadioButtonPassThroughOptions } from "primereact/radiobutton";

const radioPT: RadioButtonPassThroughOptions = {
  root: {
    className: clsx(
      "relative inline-flex cursor-pointer select-none align-bottom",
      "w-6 h-6"
    ),
  },
  input: ({ props }: any) => ({
    className: clsx(
      "flex justify-center items-center",
      "border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out",
      {
        "border-gray-500 bg-white": !props.checked,
        "border-green-500 bg-green-500": props.checked,
      },
      {
        "hover:border-green-500 focus:outline-none focus:outline-offset-0":
          !props.disabled,
        "cursor-default opacity-60": props.disabled,
      }
    ),
  }),
  icon: ({ props }: any) => ({
    className: clsx(
      "transform rounded-full",
      "block w-3 h-3 transition duration-200 bg-white dark:bg-gray-900",
      {
        "backface-hidden scale-10 invisible": !props.checked,
        "transform scale-100 visible": props.checked,
      }
    ),
  }),
};

export default radioPT;
