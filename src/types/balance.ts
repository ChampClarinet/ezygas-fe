import { DateTuple } from "@/utils/calendar";

export enum BalanceType {
  ORDER = "ORDER",
  FILL = "FILL",
  FIX_COST = "FIX_COST",
}

export interface BalanceTable {
  id: number;
  type: BalanceType;
  description: string;
  details: BalanceDetails | null;
  employee: string | null;
  balance: number;
  date: Date;
}

export interface BalanceDetails {
  [brand: string]: {
    [typeCode: string]: number | null;
  };
}

export interface GroupedBalanceTable {
  [dateISO: string]: BalanceTable[];
}

export interface BalanceFilters {
  isShowIncome: boolean;
  isShowExpense: boolean;
  fromDate: DateTuple | null;
  toDate: DateTuple | null;
}

export interface EChartsTooltipFormatterParams {
  axisDim?: string;
  axisId?: string;
  axisIndex?: number;
  axisType?: string;
  axisValue?: string;
  axisValueLabel?: string;
  borderColor?: string;
  color?: string;
  componentIndex?: number;
  componentSubType?: string;
  componentType?: string;
  data?: number | string;
  dataIndex?: number;
  dataType?: unknown;
  dimensionsNames?: string[];
  marker?: string;
  name?: string;
  seriesId?: string;
  seriesIndex?: string;
  seriesName?: string;
  seriesType?: string;
  value?: number | string;
}

export interface EChartsTooltipFormatterParamsDataSet {
  borderColor?: string;
  color?: string;
  componentIndex?: number;
  componentSubType?: string;
  componentType?: string;
  data?: { [x: string]: any };
  dataIndex?: number;
  dataType?: unknown;
  dimensionsNames?: string[];
  marker?: string;
  name?: string;
  seriesId?: string;
  seriesIndex?: string;
  seriesName?: string;
  seriesType?: string;
  value?: { [x: string]: any };
}

export interface TooltipFormatter {
  title: string | JSX.Element;
  data: {
    seriesName: string | number;
    value: string | number;
    color: string;
  }[];
}
