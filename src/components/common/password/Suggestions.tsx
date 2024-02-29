import { FC } from "react";
import { Divider } from "primereact/divider";

const Suggestions: FC = () => {
  return (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>Minimum 6 characters</li>
      </ul>
    </>
  );
};

export default Suggestions