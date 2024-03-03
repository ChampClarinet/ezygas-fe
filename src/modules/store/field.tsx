import { FC, lazy } from "react";
import { lazily } from "react-lazily";
import clsx from "clsx";
import { Control, Controller } from "react-hook-form";
import { VendorForm } from "./form";

const Input = lazy(() => import("@/components/common/input"));
const { InputMask } = lazily(() => import("primereact/inputmask"));
const NumericInput = lazy(() => import("@/components/common/numericinput"));

export interface FieldProps {
  label: string;
  name: keyof VendorForm;
  errorMessage?: string;
  /**
   * Rules of react hook form
   */
  rules?: any;
  type: "text" | "number" | "citizen_id" | "pint" | "tel" | "money";
  control: Control<VendorForm, any>;
  isSmall?: boolean;
  itemClasses?: string;
}
const Field: FC<FieldProps> = (props) => {
  const {
    control,
    label,
    errorMessage: error,
    name,
    rules,
    type,
    isSmall = false,
    itemClasses,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <div className={clsx(itemClasses)}>
          <label
            htmlFor={name}
            className={clsx(isSmall && "w-[max-content] whitespace-nowrap")}
          >{`${label}:`}</label>
          <div
            className={clsx(
              "m-0 flex flex-col w-auto",
              isSmall && "flex-grow min-w-[120px] max-w-[200px]"
            )}
          >
            {type == "citizen_id" ? (
              <InputMask
                name={name}
                value={value as string}
                onChange={(e) => onChange(e.value)}
                mask="9-9999-99999-99-9"
                type="text"
                autoClear
                unmask
              />
            ) : type == "pint" ? (
              <NumericInput
                name={name}
                value={+(value as string)}
                onChange={(e) => onChange(e.value)}
                min={0}
                type="number"
              />
            ) : type == "tel" ? (
              <Input
                id={name}
                name={name}
                placeholder="เบอร์โทรศัพท์"
                type="tel"
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
              />
            ) : type == "money" ? (
              <NumericInput
                name={name}
                value={+(value as string)}
                onValueChange={(e) => onChange(e.value)}
                mode="currency"
                currency="THB"
                locale="th-TH"
                type="number"
              />
            ) : type == "number" ? (
              <NumericInput
                name={name}
                value={+(value as string)}
                onValueChange={(e) => onChange(e.value)}
                type="number"
              />
            ) : (
              <Input
                name={name}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                type="text"
              />
            )}
            <span className={clsx("mt-1", "pl-3", "text-red-700")}>
              {error?.length ? error : "\u00A0"}
            </span>
          </div>
        </div>
      )}
    />
  );
};

export default Field;
