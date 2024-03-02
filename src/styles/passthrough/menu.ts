import { MenuPassThroughOptions } from "primereact/menu";

const menuPT: MenuPassThroughOptions = {
  root: { className: "border border-solid border-gray-300 shadow-lg" },
  menu: { className: "list-none" },
  menuitem: { className: "m-0" },
  submenuHeader: { className: "font-bold text-lg py-1 m-0" },
  action: {
    className: "hover:bg-blue-200",
  },
  separator: {
    className: "border-t border-gray-300 my-1",
  },
};

export default menuPT;
