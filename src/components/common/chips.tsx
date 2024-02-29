import { FC } from "react";
import { Chips as C, ChipsProps as CP } from "primereact/chips";

export interface ChipsProps extends CP {}
const Chips: FC<ChipsProps> = (props) => {
  return <C separator="," {...props} />;
};

export default Chips;
