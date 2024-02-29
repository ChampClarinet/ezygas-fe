import { FC } from "react";
import { Checkbox as CB, CheckboxProps as CP } from "primereact/checkbox";

export interface CheckboxProps extends CP {}
const Checkbox: FC<CheckboxProps> = (props) => {
  return <CB {...props} />;
};

export default Checkbox;
