import { FC } from "react";
import { Password as P, PasswordProps as PP } from "primereact/password";
import Suggestions from "./Suggestions";

export interface PasswordProps extends PP {
  suggestions?: boolean;
}
const Password: FC<PasswordProps> = ({ suggestions = true, ...props }) => {
  return (
    <P toggleMask footer={suggestions ? Suggestions : undefined} {...props} />
  );
};

export default Password;
