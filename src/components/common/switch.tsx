import { FC } from "react";
import { InputSwitch, InputSwitchProps } from "primereact/inputswitch";

export interface SwitchProps extends InputSwitchProps {}
const Switch: FC<SwitchProps> = (props) => {
  return <InputSwitch {...props} />;
};

export default Switch;
