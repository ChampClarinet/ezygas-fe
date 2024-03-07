import { FC, useCallback, useContext, useMemo } from "react";
import clsx from "clsx";
import { ToggleButton } from "primereact/togglebutton";
import { Controller } from "react-hook-form";
import { useBreakpoint } from "@cantabile/hooks";
import Checkbox from "@/components/common/checkbox";
import TimePicker from "@/components/common/timepicker";
import Textarea from "@/components/common/textarea";
import * as regex from "@/constants/regex";
import { useDaysList } from "@/queries/general";
import { addressToDisplayAddress } from "@/utils";

import Field, { FieldProps } from "./field";
import { StorePageContext } from "./provider";

const Form: FC = () => {
  const { formHook, myVendor } = useContext(StorePageContext);
  const vendor = myVendor!;

  const { days: daysList } = useDaysList();

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = formHook!;

  const isSmall = useBreakpoint(700);

  const isJuristic = watch("is_juristic");

  const address = useMemo(() => {
    const { subdistrict, district, province, zipcode } = vendor;
    return addressToDisplayAddress({
      subdistrict,
      district,
      province,
      zipcode,
      isInBangkok: province === "กรุงเทพมหานคร",
    });
  }, [vendor]);

  const onToggleDay = useCallback(
    (slug: string) => {
      const dayCloses = watch("dayCloses");
      let newVal = [...dayCloses];
      const isAlreadyInList = dayCloses.includes(slug);
      if (isAlreadyInList) newVal = newVal.filter((d) => d !== slug);
      else newVal = [...newVal, slug];
      setValue("dayCloses", newVal, { shouldDirty: true });
    },
    [setValue, watch]
  );

  const { fields, juristicFields } = useMemo(
    () => ({
      fields: [
        {
          label: "ชื่อร้าน",
          errorMessage: errors["name_th"] ? "กรุณากรอกชื่อ" : undefined,
          name: "name_th",
          rules: {
            required: true,
          },
          type: "text",
        },
        {
          label: "ค่าบริการ",
          errorMessage: errors?.service_charge
            ? "ค่าบริการไม่ถูกต้อง"
            : undefined,
          name: "service_charge",
          rules: {
            required: true,
            validate: (value: string) => !isNaN(+value),
          },
          type: "money",
        },
        {
          label: "เบอร์โทรศัพท์",
          errorMessage: errors?.tel ? "เบอร์โทรศัพท์ไม่ถูกต้อง" : undefined,
          name: "tel",
          rules: {
            pattern: regex.TEL,
            required: true,
          },
          type: "tel",
        },
        {
          label: "คำต่อท้ายใบเสร็จรับเงิน",
          name: "receipt_footer_message",
          type: "text",
        },
      ] as Omit<FieldProps, "control">[],
      juristicFields: [
        {
          label: "สาขาที่",
          name: "branch",
          errorMessage: errors?.branch ? "กรุณากรอกเลขที่สาขา" : undefined,
          type: "pint",
          rules: {
            required: watch("is_juristic"),
            validate: (value: string) => !isNaN(+value),
          },
        },
        {
          label: "เลขประจำตัวผู้เสียภาษี",
          name: "tax_id",
          errorMessage: errors.tax_id
            ? "เลขประจำตัวผู้เสียภาษีไม่ถูกต้อง"
            : undefined,
          rules: {
            required: watch("is_juristic"),
            minLength: 13,
            maxLength: 13,
          },
          type: "citizen_id",
        },
      ] as Omit<FieldProps, "control">[],
    }),
    [errors, watch]
  );

  const itemClasses = clsx(
    "flex",
    "justify-between",
    "items-baseline",
    "flex-shrink-0",
    "mb-4",
    isSmall ? "basis-[50%]" : "basis-[49%]",
    isSmall ? "flex-grow" : "flex-grow-0",
    isSmall && "flex-wrap"
  );

  return (
    <div className="px-5">
      <h1 className={clsx("text-current", "font-bold", "text-2xl", "mb-5")}>
        ข้อมูลร้าน
      </h1>
      <form className={clsx("flex", "flex-wrap", "gap-2", "justify-between")}>
        {fields.map((props, i) => {
          return (
            <Field
              {...props}
              control={control}
              itemClasses={itemClasses}
              key={i}
            />
          );
        })}

        <div className={itemClasses}>
          <Controller
            control={control}
            name="is_juristic"
            render={({ field: { value, onChange, name } }) => (
              <div className="flex align-items-center">
                <Checkbox
                  checked={value}
                  name={name}
                  onChange={() => onChange(!value)}
                />
                <label htmlFor={name} className="ml-2">
                  เป็นนิติบุคคล
                </label>
              </div>
            )}
          />
        </div>

        <div className={itemClasses} />

        {isJuristic && (
          <>
            {juristicFields.map((props, i) => (
              <Field {...props} control={control} key={i} />
            ))}
          </>
        )}

        <Controller
          control={control}
          name="workTime"
          render={({ field: { value, onChange, name } }) => {
            const { openOn, closeOn } = value || {};
            return (
              <>
                <div className={clsx(itemClasses, "mt-4")}>
                  <label htmlFor={name}>เวลาเปิดทำการ</label>
                  <TimePicker
                    value={openOn}
                    onChange={(time) => onChange({ ...value, openOn: time })}
                  />
                </div>
                <div className={clsx(itemClasses, "mt-4")}>
                  <label>ถึง</label>
                  <TimePicker
                    value={closeOn}
                    onChange={(time) =>
                      onChange({
                        ...value,
                        closeOn: time,
                      })
                    }
                  />
                </div>
              </>
            );
          }}
        />
      </form>

      <div className={clsx("grid", "grid-cols-[18%_1fr]", "gap-10", "my-4")}>
        <label className="flex items-center">เลือกวันทำงานประจำ:</label>
        <div className="flex flex-wrap gap-2">
          {daysList?.map(({ slug, long_name }) => {
            const dayCloses = watch("dayCloses");
            const checked = !dayCloses.includes(slug);
            return (
              <ToggleButton
                key={slug}
                checked={checked}
                onChange={() => onToggleDay(slug)}
                onLabel={long_name}
                offLabel={long_name}
                pt={{
                  root: {
                    className: clsx(
                      "rounded-full",
                      "border-2",
                      "border-solid",
                      "border-blue-900",
                      "clickable",
                      checked
                        ? [
                            "bg-blue-900",
                            "text-white",
                            "hover:brightness-[1.2]",
                          ]
                        : ["bg-white", "text-blue-900", "hover:bg-blue-700/10"]
                    ),
                  },
                }}
              />
            );
          })}
        </div>
      </div>

      <div
        className={clsx("mb-4", "flex", "justify-between", "items-baseline")}
      >
        <label htmlFor="address">ที่อยู่:</label>
        <Textarea
          className="flex-[0_1_80%] ml-auto"
          rows={4}
          disabled
          value={address}
        />
      </div>
    </div>
  );
};

export default Form;
