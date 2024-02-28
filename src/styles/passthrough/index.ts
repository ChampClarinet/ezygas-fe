import { PrimeReactPTOptions } from "primereact/api";
import passwordPT from "./password";
import dropdownPT from "./dropdown";
import inputPT from "./inputtext";
import autocompletePT from "./autocomplete";
import calendarPT from "./calendar";
import checkboxPT from "./checkbox";
import chipsPT from "./chips";
import inputSwitchPT from "./inputswitch";
import inputnumberPT from "./inputnumber";
import inputtextareaPT from "./textarea";
import radioPT from "./radio";
import sliderPT from "./slider";
import dividerPT from "./divider";
import accordionPT from "./accordion";
import cardPT from "./card";
import confirmDialogPT from "./confirmdialog";
import dialogPT from "./dialog";
import skeletonPT from "./skeleton";
import buttonPT from "./button";
import avatarPT from "./avatar";
import toastPT from "./toast";
import menuPT from "./menu";
import datatablePT from "./datatable";

const pt: PrimeReactPTOptions = {
  password: passwordPT,
  dropdown: dropdownPT,
  inputtext: inputPT,
  autocomplete: autocompletePT,
  calendar: calendarPT,
  checkbox: checkboxPT,
  chips: chipsPT,
  inputswitch: inputSwitchPT,
  inputnumber: inputnumberPT,
  inputtextarea: inputtextareaPT,
  radiobutton: radioPT,
  slider: sliderPT,
  divider: dividerPT,
  accordion: accordionPT,
  card: cardPT,
  confirmdialog: confirmDialogPT,
  dialog: dialogPT,
  skeleton: skeletonPT,
  button: buttonPT,
  toast: toastPT,
  avatar: avatarPT,
  menu: menuPT,
  datatable: datatablePT,
};

export default pt;
