import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import DateHelper, { DateTuple, Time } from "@cantabile/date-helper";
import { Controller, useForm } from "react-hook-form";
import { useFixCostsList } from "@/queries/fixcost";
import { sanitizeNegativeNumber } from "@/utils/numbers";
import FixCostAPI, { CreateFixCostDTO } from "@/api/fixcost";
import { Dialog } from "primereact/dialog";
import Loading from "@/components/common/loading";
import NumericInput from "@/components/common/numericinput";
import Autocomplete from "@/components/common/autocomplete";

import { Form } from "./css";
import Calendar from "@/components/common/calendar";
import Button from "@/components/common/button";
import { useToastContext } from "@/hooks/toast";
import { resolveErrorResponse } from "@/utils/error";

const now = DateHelper.now({
  lang: "th",
  isUTC: false,
  showSeconds: false,
  use12HourFormat: false,
  useBD: true,
  useShortText: true,
});

export interface EditableFixCost {
  name: string;
  amount: string;
  date: DateTuple | null;
  time: Time;
}

export interface FixCostDialogProps {
  onToggle?: () => unknown;
  isOpen: boolean;
}
const FixCostDialog: FC<FixCostDialogProps> = ({ onToggle, isOpen }) => {
  const toast = useToastContext();
  const { control, setValue, watch, handleSubmit, reset } =
    useForm<EditableFixCost>({
      defaultValues: {
        name: "",
        amount: "0",
        date: now.toDateTuple(),
        time: now.toTimeObject(),
      },
    });

  const query = useFixCostsList();
  const { refetch, recentCostNames, isLoading } = query;

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (data: EditableFixCost) => {
        const convert = ({
          name,
          amount: formAmount,
          date,
          time,
        }: EditableFixCost): CreateFixCostDTO | null => {
          if (
            isNaN(+formAmount) ||
            +formAmount == 0 ||
            date == null ||
            time == null ||
            !name.length
          )
            return null;
          const amount = +formAmount * -1;
          const date_time = DateHelper.fromDateTupleAndTime(
            date,
            time
          ).toISO8601String();
          return {
            name,
            amount,
            date_time,
          };
        };

        const payload = convert(data);

        if (!payload)
          return toast.showToast({
            content: "ฟอร์มไม่ถูกต้อง",
            severity: "error",
          });

        try {
          await FixCostAPI.createNewFixCost(payload);
          toast.showToast({
            content: "เพิ่มรายจ่ายแล้ว",
            severity: "success",
          });
          return refetch();
        } catch (error) {
          resolveErrorResponse(error);
        }
      }),
    [handleSubmit, refetch, toast]
  );

  const onAmountChange = useCallback(
    (amount: string) => {
      const value = amount == "" ? amount : sanitizeNegativeNumber(amount);
      setValue("amount", value);
    },
    [setValue]
  );

  const { name, amount, date } = watch();

  const isSubmitButtonEnabled = useMemo(() => {
    return name.length > 0 && !isNaN(+amount) && +amount > 0 && date != null;
  }, [amount, date, name.length]);

  useEffect(() => {
    if (isOpen) refetch();
    else reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Dialog
      visible={isOpen}
      modal
      onHide={() => onToggle && onToggle()}
      header="เพิ่มรายจ่าย"
      dismissableMask
      draggable={false}
      pt={{
        footer: { className: "border-t border-t-solid border-t-gray-300 pt-6" },
      }}
      footer={
        <div className="w-full flex items-center justify-evenly gap-4">
          <Button
            color="red"
            baseProps={{ className: "w-[140px]" }}
            onClick={onToggle}
          >
            ยกเลิก
          </Button>
          <Button
            baseProps={{
              type: "submit",
              className: "w-[140px]",
              disabled: !isSubmitButtonEnabled,
              onClick: onSubmit,
            }}
          >
            ตกลง
          </Button>
        </div>
      }
    >
      <Loading isLoading={isLoading}>
        <Form onSubmit={onSubmit}>
          <label htmlFor="name">ชื่อรายการ</label>
          <Controller
            control={control}
            name="name"
            rules={{
              required: true,
            }}
            render={({ field: { value } }) => {
              const onChange = (v: string) => setValue("name", v);
              return (
                <Autocomplete<string>
                  placeholder="รายการจ่าย"
                  listOfHint={recentCostNames}
                  onChange={(e) => onChange(e.value)}
                  value={value}
                />
              );
            }}
          />
          <label htmlFor="amount">จำนวนเงิน (บาท)</label>
          <Controller
            control={control}
            name="amount"
            rules={{
              required: true,
              min: 0,
            }}
            render={({ field: { value } }) => (
              <NumericInput
                value={+value}
                onValueChange={(e) => onAmountChange(e.value + "")}
                mode="currency"
                currency="THB"
                locale="th"
              />
            )}
          />
          <label htmlFor="date">วันที่</label>
          <Controller
            control={control}
            name="date"
            render={({ field: { value: valueTuple } }) => {
              const value = DateHelper.fromDateTuple(valueTuple)?.getDate();
              return (
                <Calendar
                  value={value}
                  onChange={(e) => {
                    const date = e.value;
                    if (date instanceof Date)
                      setValue("date", new DateHelper(+date).toDateTuple());
                  }}
                />
              );
            }}
          />
          <label htmlFor="time">เวลา</label>
          <Controller
            control={control}
            name="time"
            rules={{ required: true }}
            render={({ field: { value: time } }) => {
              const value = new Date();
              value.setHours(time.hour || 0, time.minute || 0);
              return (
                <Calendar
                  timeOnly
                  value={value}
                  onChange={(e) => {
                    if (e.value instanceof Date) {
                      const time = new DateHelper(+e.value).toTimeObject();
                      return setValue("time", time);
                    }
                  }}
                />
              );
            }}
          />
        </Form>
      </Loading>
    </Dialog>
  );
};

export default FixCostDialog;
