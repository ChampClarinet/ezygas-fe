import { FC, useCallback, useEffect } from "react";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import Button from "@/components/common/button";
import Checkbox from "@/components/common/checkbox";
import Input from "@/components/common/input";
import Textarea from "@/components/common/textarea";
import { PersonalPrice } from "@/api/personal-prices";
import { TEL } from "@/constants/regex";
import {
  BanInputGroup,
  Content,
  Error,
  Field,
  InputGroup,
  Label,
  Tag,
  TagGroup,
} from "./css";

export interface CustomerForm {
  name: string;
  tel: string;
  is_active: boolean;
  address: string;
  landmark: string;
  is_juristic: boolean;
  tax_id: string;
  branch: string;
  personal_price_name: string;
  banned_reason: string;
}
export interface CustomerFormProps {
  defaultData: CustomerForm;
  personalPrices: PersonalPrice[];
  toggle?: () => unknown;
  onSubmit: (data: CustomerForm) => unknown;
  nameDuplicateCheckFn?: (name: string) => boolean;
  personalPriceLoading: boolean;
}
const CustomerForm: FC<CustomerFormProps> = (props) => {
  const {
    defaultData,
    onSubmit,
    personalPrices,
    nameDuplicateCheckFn,
    toggle,
    personalPriceLoading,
  } = props;
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CustomerForm>({
    defaultValues: defaultData,
  });

  const isJuristic = watch("is_juristic");
  const isActive = watch("is_active");
  const personalPriceName = watch("personal_price_name");

  const isSubmitDisabled = Object.keys(errors).find((k) => (errors as any)[k])
    ? true
    : false;

  const handleClearPersonalPrices = useCallback(() => {
    setValue("personal_price_name", "");
  }, [setValue]);

  const nameValidator = useCallback(
    (name: string) => {
      if (!nameDuplicateCheckFn) return true;
      return nameDuplicateCheckFn(name);
    },
    [nameDuplicateCheckFn]
  );

  useEffect(() => {
    reset(defaultData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData]);

  return (
    <>
      <div className="w-full flex-grow-default overflow-y-auto overflow-x-hidden">
        <Content>
          <Field>
            <Label>ชื่อ</Label>
            <InputGroup>
              <Controller
                control={control}
                name="name"
                rules={{
                  validate: nameValidator,
                  required: true,
                }}
                render={({ field: { ref, ...rest } }) => (
                  <Input {...rest} pt={inputPT(!!errors.name)} />
                )}
              />
              <Error>
                {errors.name
                  ? "ชือ-นามสกุลนี้ถูกเคยใช้ในการสมัครแล้ว"
                  : "\u00A0"}
              </Error>
            </InputGroup>
          </Field>
          <Field>
            <Label>โทร</Label>
            <InputGroup>
              <Controller
                control={control}
                name="tel"
                rules={{
                  validate: nameValidator,
                  required: true,
                  pattern: TEL,
                }}
                render={({ field: { ref, ...rest } }) => (
                  <Input {...rest} pt={inputPT(!!errors.tel)} type="tel" />
                )}
              />
              <Error>
                {errors.tel
                  ? "กรุณากรอกเบอร์โทรให้ถูกต้อง ตัวอย่างเบอร์โทร 098523xxxx"
                  : "\u00A0"}
              </Error>
            </InputGroup>
          </Field>
          <Field>
            <Label>ที่อยู่</Label>
            <InputGroup>
              <Controller
                control={control}
                name="address"
                render={({ field: { ref, ...rest } }) => (
                  <Textarea {...rest} rows={4} />
                )}
              />
            </InputGroup>
          </Field>
          <Field>
            <Label>จุดสังเกต</Label>
            <InputGroup>
              <Controller
                control={control}
                name="landmark"
                render={({ field: { ref, ...rest } }) => <Input {...rest} />}
              />
            </InputGroup>
          </Field>
          <Field>
            <Controller
              control={control}
              name="is_juristic"
              render={({ field }) => (
                <div className="flex align-items-center">
                  <Checkbox
                    inputId={field.name}
                    name={field.name}
                    checked={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                  <label htmlFor={field.name} className="ml-2">
                    เป็นนิติบุคคล
                  </label>
                </div>
              )}
            />
          </Field>

          {isJuristic && (
            <>
              <Field>
                <Label>สาขา</Label>
                <InputGroup>
                  <Controller
                    control={control}
                    name="branch"
                    rules={{
                      required: isJuristic,
                      validate: (value) => value.length > 0 && !isNaN(+value),
                    }}
                    render={({ field: { ref, ...rest } }) => (
                      <Input
                        {...rest}
                        pt={inputPT(!!errors.branch)}
                        placeholder="สาขา"
                      />
                    )}
                  />
                  <Error>
                    {errors.branch ? "กรุณากรอกเลขที่สาขา" : "\u00A0"}
                  </Error>
                </InputGroup>
              </Field>
              <Field>
                <Label>เลขประจำตัวผู้เสียภาษี</Label>
                <InputGroup>
                  <Controller
                    control={control}
                    name="tax_id"
                    rules={{
                      required: isJuristic,
                      maxLength: 13,
                    }}
                    render={({ field: { ref, ...rest } }) => (
                      <Input
                        {...rest}
                        pt={inputPT(!!errors.tax_id)}
                        keyfilter="int"
                        placeholder="เลขประจำตัวผู้เสียภาษี"
                      />
                    )}
                  />
                  <Error>
                    {errors.tax_id
                      ? "เลขประจำตัวผู้เสียภาษีไม่ถูกต้อง"
                      : "\u00A0"}
                  </Error>
                </InputGroup>
              </Field>
            </>
          )}

          {isActive ? (
            <div className="w-full overflow-hidden">
              <table className="personal-price noborder">
                <tbody>
                  <tr>
                    <td className="label">
                      <span className="whitespace-nowrap">
                        โปรโมชันรายบุคคล:
                      </span>
                    </td>
                    <td>
                      <Controller
                        name="personal_price_name"
                        control={control}
                        render={({ field: { name, onChange, value } }) => (
                          <Dropdown
                            id={name}
                            value={value}
                            options={personalPrices}
                            placeholder="เลือกเพื่อแก้ไขโปรโมชันรายบุคคล"
                            filter
                            loading={personalPriceLoading}
                            optionValue="name"
                            optionLabel="name"
                            emptyFilterMessage="ไม่พบโปรโมชัน"
                            filterPlaceholder="ค้นหา"
                            showClear
                            onChange={(e) => onChange(e.value)}
                          />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      {personalPriceName?.length ? (
                        <TagGroup>
                          <Tag>
                            {personalPriceName}
                            <span
                              className="close"
                              onClick={handleClearPersonalPrices}
                            >
                              {"x"}
                            </span>
                          </Tag>
                        </TagGroup>
                      ) : (
                        <span>{"--  ไม่ได้เลือกโปรโมชัน  --"}</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <BanInputGroup>
              <Label>{"เหตุผลที่ถูกระงับ"}</Label>
              <Controller
                name="banned_reason"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="เหตุผลที่ถูกระงับ"
                  />
                )}
              />
            </BanInputGroup>
          )}
        </Content>
      </div>
      <div className="separator" />
      <div className="footer flex justify-around items-center gap-4 p-8">
        <Button
          color="red"
          baseProps={{ className: "w-[140px]" }}
          onClick={toggle}
        >
          ยกเลิก
        </Button>
        <Button
          baseProps={{ className: "w-[140px]" }}
          disabled={isSubmitDisabled}
          onClick={handleSubmit(onSubmit)}
        >
          ตกลง
        </Button>
      </div>
    </>
  );
};

export default CustomerForm;

const inputPT = (isError: boolean) => ({
  root: {
    className: clsx(isError ? "border-red-700" : "border-gray-400"),
  },
});
