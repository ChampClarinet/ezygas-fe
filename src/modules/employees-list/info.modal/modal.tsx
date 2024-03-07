import EmployeeAPI, { CreateEmployeeDTO, Employee } from "@/api/employee";
import { useEmployee } from "@/queries/employees";
import { FC, useCallback, useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import EmployeesListPageContext from "../provider";
import { ToastContext } from "@/toast.context";
import Textarea from "@/components/common/textarea";

import { Content, Error, Field, Input, InputGroup, Label } from "./css";
import Loading from "@/components/common/loading";
import { TEL } from "@/constants/regex";
import { Divider } from "primereact/divider";
import clsx from "clsx";
import Button from "@/components/common/button";
import NumericInput from "@/components/common/numericinput";

export enum Context {
  CREATE = "create",
  EDIT = "edit",
}

export interface EmployeeForm {
  name: string;
  tel: string;
  wages: number;
  address: string;
}

const emptyForm: EmployeeForm = {
  name: "",
  tel: "",
  wages: 0,
  address: "",
};

export interface DialogProps {
  isOpen: boolean;
  employeeId?: number;
  toggle: () => void;
}
const Dialog: FC<DialogProps> = ({ isOpen, toggle, employeeId }) => {
  const context = employeeId ? Context.EDIT : Context.CREATE;
  const {
    employee,
    error,
    refetch: fetchEmployee,
    isValidating,
  } = useEmployee(employeeId);

  const toast = useContext(ToastContext);
  const { employeesQuery } = useContext(EmployeesListPageContext);
  const { refetch: refetchEmployeesList } = employeesQuery!;

  const formProps = useForm<EmployeeForm>({
    defaultValues: emptyForm,
  });
  const {
    setValue,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = formProps;

  const isNameExists = useCallback(
    async (name: string) => {
      if (!name.length) return false;
      //? check to duplicate with old name
      if (employee) {
        const oldName = employee?.name;
        if (name == oldName) return true;
      }

      //? check to duplicate with others
      const employees = await EmployeeAPI.fetchEmployeesList();
      const names = employees.map(({ name }) => name);
      return names.includes(name);
    },
    [employee]
  );

  const shouldDisabledSubmit = useMemo(
    () =>
      !formProps.formState.isValid ||
      (context === Context.EDIT && !formProps.formState.isDirty),
    [context, formProps.formState.isDirty, formProps.formState.isValid]
  );

  const onClose = useCallback(() => {
    toggle();
    refetchEmployeesList();
  }, [refetchEmployeesList, toggle]);

  const onSubmit = useCallback(
    async (form: EmployeeForm) => {
      const { name, tel, address, wages } = form;
      const payload: CreateEmployeeDTO = {
        name,
        tel,
        address,
        wages: +wages,
      };
      if (context === Context.CREATE) {
        await EmployeeAPI.createEmployee(payload);
        toast.showToast({
          content: "เพิ่มคนส่งแล้ว",
          severity: "success",
        });
        onClose();
      } else {
        if (employee == null) return;
        const emp: Employee = {
          ...employee,
          ...payload,
        };
        await EmployeeAPI.updateEmployee(emp);
        toast.showToast({ content: "อัพเดทข้อมูลแล้ว", severity: "success" });
        onClose();
        return false;
      }
    },
    [context, employee, onClose, toast]
  );

  const clearForm = useCallback(() => {
    setValue("name", "");
    setValue("address", "");
    setValue("tel", "");
    setValue("wages", 0);
  }, [setValue]);

  useEffect(() => {
    if (employee) {
      const form: EmployeeForm = {
        address: employee.address,
        name: employee.name,
        tel: employee.tel,
        wages: employee.wages,
      };
      reset(form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  useEffect(() => {
    if (isOpen) fetchEmployee();
    else clearForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Loading isLoading={isValidating} isError={error}>
      <div className="w-full flex-grow-default overflow-y-auto overflow-x-hidden">
        <Content>
          <Controller
            control={control}
            name="name"
            rules={{
              required: true,
              validate: (val) => !isNameExists(val),
            }}
            render={({ field: { name, onBlur, value, disabled } }) => (
              <Field>
                <Label htmlFor={name}>ชื่อ</Label>
                <InputGroup>
                  <Input
                    id={name}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) =>
                      setValue("name", e.target.value, { shouldValidate: true })
                    }
                    value={value}
                    disabled={disabled}
                    isCorrect={!!errors.name}
                  />
                  <Error>
                    {errors.name?.type === "required"
                      ? "กรุณากรอกชื่อ"
                      : errors.name?.type === "validate"
                      ? "คนส่งคนนี้มีแล้ว"
                      : "\u00A0"}
                  </Error>
                </InputGroup>
              </Field>
            )}
          />
          <Controller
            control={control}
            name="tel"
            rules={{
              pattern: TEL,
            }}
            render={({ field: { ref, ...field } }) => (
              <Field>
                <Label htmlFor={field.name}>โทร</Label>
                <InputGroup>
                  <Input
                    {...field}
                    isCorrect={!!errors.tel}
                    type="tel"
                    onChange={(e) =>
                      setValue("tel", e.target.value, { shouldValidate: true })
                    }
                  />
                  <Error>
                    {errors.tel?.type === "pattern"
                      ? "กรุณากรอกเบอร์โทรให้ถูกต้อง ตัวอย่างเบอร์โทร 098523xxxx"
                      : "\u00A0"}
                  </Error>
                </InputGroup>
              </Field>
            )}
          />
          <Controller
            control={control}
            name="wages"
            rules={{
              min: 0,
              validate: (val) => +val >= 0,
            }}
            render={({ field: { ref, ...field } }) => (
              <Field>
                <Label htmlFor={field.name}>เงินเดือน</Label>
                <InputGroup>
                  <NumericInput
                    {...field}
                    mode="currency"
                    min={0}
                    currency="THB"
                    locale="th-TH"
                    onChange={(e) =>
                      e.value != null &&
                      setValue("wages", e.value, { shouldValidate: true })
                    }
                    pt={{
                      root: {
                        className: clsx(
                          !!errors.wages ? "border-red-700" : "border-green-700"
                        ),
                      },
                    }}
                  />
                  <Error>
                    {errors.wages?.type === "min"
                      ? "เงินเดือนไม่สามารถติดลบได้"
                      : "\u00A0"}
                  </Error>
                </InputGroup>
              </Field>
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field: { name, value, onBlur, disabled } }) => (
              <Field>
                <Label htmlFor={name}>ที่อยู่</Label>
                <Textarea
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  disabled={disabled}
                  onChange={(e) => setValue("address", e.target.value)}
                  rows={4}
                />
              </Field>
            )}
          />
        </Content>
        <Divider />

        <div
          className={clsx(
            "footer",
            "flex",
            "justify-around",
            "items-center",
            "gap-4",
            "p-8"
          )}
        >
          <Button color="red" onClick={toggle}>
            ยกเลิก
          </Button>
          <Button
            disabled={shouldDisabledSubmit}
            onClick={handleSubmit(onSubmit)}
          >
            ตกลง
          </Button>
        </div>
      </div>
    </Loading>
  );
};

export default Dialog;
