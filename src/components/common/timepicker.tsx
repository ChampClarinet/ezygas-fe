import { FC, useCallback, useMemo } from "react";
import { Nullable } from "primereact/ts-helpers";
import DateHelper, { Time } from "@cantabile/date-helper";
import Calendar from "./calendar";

export interface TimePickerProps {
  value?: Time;
  onChange?: (value: Time) => void;
}
const TimePicker: FC<TimePickerProps> = (props) => {
  const value = useMemo(() => {
    if (!props.value) return undefined;
    const timeString = DateHelper.timeToTimeString(props.value);
    return new Date(`${DateHelper.now().toISODate()}T${timeString}`);
  }, [props]);

  const onChange = useCallback(
    (e: any) => {
      const d = e.value as Nullable<Date>;
      if (d && props.onChange) {
        props.onChange(DateHelper.timeStringToTime(d.toTimeString()));
      }
    },
    [props]
  );

  return <Calendar timeOnly value={value} onChange={onChange} />;
};

export default TimePicker;
