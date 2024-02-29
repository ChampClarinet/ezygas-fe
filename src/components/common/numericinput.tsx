import { FC } from "react";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";

export interface NumericInputProps extends InputNumberProps {}
const NumericInput: FC<NumericInputProps> = (props) => {
  return <InputNumber {...props} />;
};

export default NumericInput;
