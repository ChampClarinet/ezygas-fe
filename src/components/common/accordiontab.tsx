import { FC } from "react";
import clsx from "clsx";
import {
  AccordionTab as AT,
  AccordionTabPassThroughOptions,
  AccordionTabProps,
} from "primereact/accordion";

const AccordionTab: FC<AccordionTabProps> = (props) => {
  return <AT pt={defaultPassThrough} {...props} />;
};

export default AccordionTab;

export const defaultPassThrough: AccordionTabPassThroughOptions = {
  root: {
    className: clsx("mb-1", "font-sukhumvit"),
  },
  header: ({ props }: any) => ({
    className: clsx(
      {
        "select-none pointer-events-none cursor-default opacity-60":
          props?.disabled,
      } // Condition
    ),
  }),
  headerAction: ({ context }: any) => ({
    className: clsx(
      "flex items-center cursor-pointer relative no-underline select-none", // Alignments
      "p-5 transition duration-200 ease-in-out rounded-t-md font-bold transition-shadow duration-200", // Padding and transition
      "border border-current bg-current text-white shadow-lg", // Borders and colors
      "hover:border-blue-300 hover:bg-blue-800", // Hover
      "focus:outline-none focus:outline-offset-0", // Focus
      {
        "rounded-br-md rounded-bl-md": !context.active,
        "rounded-br-0 rounded-bl-0 text-gray-800": context.active,
      } // Condition
    ),
  }),
  headerIcon: { className: "inline-block mr-2" },
  headerTitle: { className: "leading-none" },
  content: {
    className: clsx(
      "p-5 border border-gray-300 bg-white text-gray-700 border-t-0 rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg shadow-lg"
    ),
  },
};
