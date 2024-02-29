import { FC, useMemo } from "react";
import { Calendar as BC, CalendarProps as CP } from "primereact/calendar";
import { useThaiLocale } from "@/hooks/calendar";

export interface CalendarProps {}
const Calendar: FC<CP & CalendarProps> = (props) => {
  useThaiLocale();
  const { timeOnly } = props;
  const icon = useMemo(() => {
    if (timeOnly) return () => <i className="pi pi-clock" />;
    return undefined;
  }, [timeOnly]);
  return <BC icon={icon} locale="th" dateFormat="dd MM yy" {...props} />;
};

export default Calendar;
