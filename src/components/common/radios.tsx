import clsx from "clsx";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { useMemo } from "react";

export interface Option {
  key: string;
  label: string;
}
export interface RadiosProps<T> {
  value?: T;
  onChange?: (changeTo: T) => unknown;
  alignment?: "horizontal" | "vertical";
  list: T[];
  name?: string;
  idKey: keyof T;
  labelKey: keyof T;
}
const Radios = <T,>(props: RadiosProps<T>) => {
  const {
    alignment = "horizontal",
    value,
    onChange,
    list,
    name,
    idKey,
    labelKey,
  } = props;

  const options = useMemo(
    (): Option[] =>
      list.map((item) => {
        const _key = item[idKey];
        if (typeof _key !== "string" && typeof _key !== "number")
          throw new Error("Radios: idKey must be string or number");
        let key: string;
        if (typeof _key == "number") key = _key + "";
        else key = _key as string;
        const label = item[labelKey];
        return { key, label } as Option;
      }),
    [idKey, labelKey, list]
  );

  return (
    <div
      className={clsx(
        "radio-group",
        "flex",
        alignment == "vertical" && "flex-col",
        "gap-4"
      )}
    >
      {options.map((option, i) => {
        const key = option.key;
        const checked = value && value[idKey] == key;
        return (
          <div
            key={i}
            className={clsx("flex", "items-center")}
            onClick={() => {
              const target = list.find((item) => item[idKey] == key);
              target && onChange && onChange(target);
            }}
          >
            <RadioButton
              inputId={key}
              name={name}
              value={option}
              checked={checked}
            />
            <label htmlFor={key} className="ml-2">
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Radios;
