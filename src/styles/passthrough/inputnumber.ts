import clsx from "clsx";
import { InputNumberPassThroughOptions } from "primereact/inputnumber";

const inputnumberPT: InputNumberPassThroughOptions = {
  root: { className: "w-full inline-flex" },
  input: {
    root: ({ props }: any) => ({
      className: clsx({
        "rounded-tr-none rounded-br-none":
          props.showButtons && props.buttonLayout == "stacked",
      }),
    }),
  },
  buttonGroup: ({ props }: any) => ({
    className: clsx({
      "flex flex-col": props.showButtons && props.buttonLayout == "stacked",
    }),
  }),
  incrementButton: ({ props }: any) => ({
    className: clsx("flex !items-center !justify-center", {
      "rounded-br-none rounded-bl-none rounded-bl-none !p-0 flex-1 w-[3rem]":
        props.showButtons && props.buttonLayout == "stacked",
    }),
  }),
  decrementButton: ({ props }: any) => ({
    className: clsx("flex !items-center !justify-center", {
      "rounded-tr-none rounded-tl-none rounded-tl-none !p-0 flex-1 w-[3rem]":
        props.showButtons && props.buttonLayout == "stacked",
    }),
  }),
};

export default inputnumberPT;