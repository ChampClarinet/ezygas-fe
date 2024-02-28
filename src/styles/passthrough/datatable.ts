import clsx from "clsx";
import { DataTablePassThroughOptions } from "primereact/datatable";

const datatablePT: DataTablePassThroughOptions = {
  root: ({ props }: any) => ({
    className: clsx("relative", {
      "flex flex-col h-full": props.scrollable && props.scrollHeight === "flex",
    }),
  }),
  loadingOverlay: {
    className: clsx(
      "fixed w-full h-full t-0 l-0 bg-gray-100/40",
      "transition duration-200",
      "absolute flex items-center justify-center z-2"
    ),
  },
  loadingIcon: { className: "w-8 h-8" },
  wrapper: ({ props }: any) => ({
    className: clsx({
      relative: props.scrollable,
      "flex flex-col grow h-full":
        props.scrollable && props.scrollHeight === "flex",
    }),
  }),
  header: ({ props }: any) => ({
    className: clsx(
      "bg-slate-50 text-gray-1100 border-gray-300 font-bold p-4",
      props.showGridlines
        ? "border-x border-t border-b-0"
        : "border-y border-x-0"
    ),
  }),
  table: { className: "w-full border-spacing-0" },
  thead: ({ context }: any) => ({
    className: clsx({
      "bg-slate-50 top-0 z-[1]": context.scrollable,
    }),
  }),
  tbody: ({ props, context }: any) => ({
    className: clsx({
      "sticky z-[1]": props.frozenRow && context.scrollable,
    }),
  }),
  tfoot: ({ context }: any) => ({
    className: clsx({
      "bg-slate-50 bottom-0 z-[1]": context.scrollable,
    }),
  }),
  footer: {
    className: clsx(
      "bg-slate-50 text-gray-1100 border-t-0 border-b border-x-0 border-gray-300 font-bold p-4"
    ),
  },
  column: {
    headerCell: ({ context, props }: any) => ({
      className: clsx(
        "text-left border-0 border-b border-solid border-gray-300 font-bold",
        "transition duration-200",
        context?.size === "small"
          ? "p-2"
          : context?.size === "large"
          ? "p-5"
          : "p-4", // Size
        context.sorted
          ? "bg-blue-50 text-blue-700"
          : "bg-slate-50 text-gray-1100", // Sort
        {
          "sticky z-[1]": props.frozen || props.frozen === "", // Frozen Columns
          "border-x border-y": context?.showGridlines,
          "overflow-hidden space-nowrap border-y relative bg-clip-padding":
            context.resizable, // Resizable
        }
      ),
    }),
    headerContent: { className: "flex items-center" },
    bodyCell: ({ props, context }: any) => ({
      className: clsx(
        "text-left border-0 border-b border-solid border-gray-300",
        context?.size === "small"
          ? "p-2"
          : context?.size === "large"
          ? "p-5"
          : "p-4", // Size
        {
          "sticky bg-inherit": props && (props.frozen || props.frozen === ""), // Frozen Columns
          "border-x border-y": context.showGridlines,
        }
      ),
    }),
    sortIcon: ({ context }: any) => ({
      className: clsx(
        "ml-2",
        context.sorted ? "text-blue-700" : "text-slate-700"
      ),
    }),
    sortBadge: {
      className: clsx(
        "flex items-center justify-center align-middle",
        "rounded-[50%] w-[1.143rem] leading-[1.143rem] ml-2",
        "text-blue-700 bg-blue-50"
      ),
    },
    columnFilter: { className: "inline-flex items-center ml-auto" },
    filterOverlay: {
      className: clsx(
        "bg-white text-gray-600 border-0 rounded-md min-w-[12.5rem]"
      ),
    },
    filterMatchModeDropdown: {
      root: {
        className: "min-[0px]:flex mb-2",
      },
    },
    filterRowItems: { className: "m-0 p-0 py-3 list-none" },
    filterRowItem: ({ context }: any) => ({
      className: clsx(
        "m-0 py-3 px-5 bg-transparent",
        "transition duration-200",
        context?.highlighted
          ? "text-blue-700 bg-blue-100"
          : "text-gray-600 bg-transparent"
      ),
    }),
    filterOperator: {
      className: clsx(
        "px-5 py-3 border-b border-solid border-gray-300 text-slate-700 bg-slate-50 rounded-t-md"
      ),
    },
    filterOperatorDropdown: {
      root: { className: "min-[0px]:flex" },
    },
    filterConstraint: {
      className:
        "p-5 border-b border-solid border-gray-300 dark:border-blue-900/40",
    },
    filterAddRule: { className: "py-3 px-5" },
    filterAddRuleButton: {
      root: { className: "justify-center w-full min-[0px]:text-sm" },
      // label: { className: "flex-auto grow-0" },
      // icon: "mr-2",
    },
    filterRemoveButton: {
      root: { className: "ml-2" },
      // label: { className: "grow-0" },
    },
    filterButtonbar: { className: "flex items-center justify-between p-5" },
    filterClearButton: {
      root: {
        className:
          "w-auto min-[0px]:text-sm border-blue-500 text-blue-500 px-4 py-3",
      },
    },
    filterApplyButton: {
      root: { className: "w-auto min-[0px]:text-sm px-4 py-3" },
    },
    filterMenuButton: ({ context }: any) => ({
      className: clsx(
        "inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative ml-2",
        "w-8 h-8 rounded-[50%]",
        "transition duration-200",
        "hover:text-slate-700 hover:bg-gray-300/20", // Hover
        "focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]", // Focus
        {
          "bg-blue-50 text-blue-700": context.active,
        }
      ),
    }),
    headerFilterClearButton: ({ context }: any) => ({
      className: clsx(
        "inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative",
        "text-left bg-transparent m-0 p-0 border-none select-none ml-2",
        {
          invisible: !context.hidden,
        }
      ),
    }),
    columnResizer: {
      className:
        "block absolute top-0 right-0 m-0 w-2 h-full p-0 cursor-col-resize border border-transparent",
    },
    // rowreordericon: "cursor-move",
    rowEditorInitButton: {
      className: clsx(
        "inline-flex items-center justify-center overflow-hidden relative",
        "text-left cursor-pointer select-none",
        "w-8 h-8 border-0 rounded-[50%]",
        "transition duration-200",
        "text-slate-700 border-transparent",
        "focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]", //Focus
        "hover:text-slate-700 hover:bg-gray-300/20" //Hover
      ),
    },
    rowEditorSaveButton: {
      className: clsx(
        "inline-flex items-center justify-center overflow-hidden relative",
        "text-left cursor-pointer select-none",
        "w-8 h-8 border-0 rounded-[50%]",
        "transition duration-200",
        "text-slate-700 border-transparent",
        "focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]", //Focus
        "hover:text-slate-700 hover:bg-gray-300/20" //Hover
      ),
    },
    rowEditorCancelButton: {
      className: clsx(
        "inline-flex items-center justify-center overflow-hidden relative",
        "text-left cursor-pointer select-none",
        "w-8 h-8 border-0 rounded-[50%]",
        "transition duration-200",
        "text-slate-700 border-transparent",
        "focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]", //Focus
        "hover:text-slate-700 hover:bg-gray-300/20" //Hover
      ),
    },
    radiobuttonWrapper: {
      className: clsx(
        "relative inline-flex cursor-pointer select-none align-bottom",
        "w-6 h-6"
      ),
    },
    radiobutton: ({ context }: any) => ({
      className: clsx(
        "flex justify-center items-center",
        "border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out",
        context.checked
          ? "border-blue-500 bg-blue-500"
          : "border-gray-300 bg-white",
        {
          "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]":
            !context.disabled,
          "cursor-default opacity-60": context.disabled,
        }
      ),
    }),
    radiobuttonIcon: ({ context }: any) => ({
      className: clsx(
        "transform rounded-full",
        "block w-3 h-3 transition duration-200 bg-white",
        {
          "backface-hidden scale-10 invisible": context.checked === false,
          "transform scale-100 visible": context.checked === true,
        }
      ),
    }),
    headerCheckboxWrapper: {
      className: clsx(
        "cursor-pointer inline-flex relative select-none align-bottom",
        "w-6 h-6"
      ),
    },
    headerCheckbox: ({ context }: any) => ({
      className: clsx(
        "flex items-center justify-center",
        "border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200",
        context.checked
          ? "border-blue-500 bg-blue-500"
          : "border-gray-300 bg-white",
        {
          "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]":
            !context.disabled,
          "cursor-default opacity-60": context.disabled,
        }
      ),
    }),
    headerCheckboxIcon: {
      className: "w-4 h-4 transition-all duration-200 text-white text-base",
    },
    checkboxWrapper: {
      className: clsx(
        "cursor-pointer inline-flex relative select-none align-bottom",
        "w-6 h-6"
      ),
    },
    checkbox: ({ context }: any) => ({
      className: clsx(
        "flex items-center justify-center",
        "border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200",
        context.checked
          ? "border-blue-500 bg-blue-500"
          : "border-gray-300 bg-white",
        {
          "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]":
            !context.disabled,
          "cursor-default opacity-60": context.disabled,
        }
      ),
    }),
    checkboxIcon: {
      className: "w-4 h-4 transition-all duration-200 text-white text-base",
    },
  },
  footerCell: ({ context }: any) => ({
    className: clsx(
      "text-left border-0 border-b border-solid border-gray-300 font-bold",
      "bg-slate-50 text-slate-700",
      "transition duration-200",
      context?.size === "small"
        ? "p-2"
        : context?.size === "large"
        ? "p-5"
        : "p-4", // Size
      {
        "border-x border-y": context.showGridlines,
      }
    ),
  }),
  bodyRow: ({ context }: any) => {
    return {
      className: clsx(
        context.selected
          ? "bg-blue-100 text-blue-800"
          : "bg-white text-gray-700",
        // context.stripedRows && [
        //   context.index % 2 === 0
        //     ? "!bg-gray-100 text-gray-700"
        //     : "bg-white text-gray-700",
        // ],
        "transition duration-200",
        "focus:outline focus:outline-[0.15rem] focus:outline-blue-200 focus:outline-offset-[-0.15rem]", // Focus
        {
          "cursor-pointer": context.selectable,
          "hover:bg-gray-300/20 hover:text-gray-600":
            context.selectable && !context.selected, // Hover
        }
      ),
    };
  },
  rowExpansion: {
    className: "bg-white text-gray-600",
  },
  rowGroupHeader: {
    className: clsx(
      "sticky z-[1]",
      "bg-white text-gray-600",
      "transition duration-200"
    ),
  },
  rowgroupFooter: {
    className: clsx(
      "sticky z-[1]",
      "bg-white text-gray-600",
      "transition duration-200"
    ),
  },
  resizeHelper: {
    className: "absolute hidden w-px z-10 bg-blue-500",
  },
};

export default datatablePT;
