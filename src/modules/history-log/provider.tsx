"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import DateHelper from "@cantabile/date-helper";
import BalanceAPI, { BalanceGroupedByDate, BalanceType } from "@/api/balance";
import { resolveErrorResponse } from "@/utils/error";

const today = DateHelper.now();
const fiveDaysBefore = new DateHelper(today.toMs() - DateHelper.timeDelta(5));

export interface HistoryLogContextType {
  showDetailsOf: string[];
  from: DateHelper;
  to: DateHelper;
  type: BalanceType;
  completeOnly: boolean;
  setFrom: (f: DateHelper) => unknown;
  setTo: (t: DateHelper) => unknown;
  setType: (t: BalanceType) => unknown;
  setCompleteOnly: (b: boolean) => unknown;
  balancesList: BalanceGroupedByDate[];
  typeCodes: (string | number)[];
  isLoading: boolean;
  initialize: () => unknown;
}

const HistoryLogContext = createContext<HistoryLogContextType>({
  showDetailsOf: [],
  from: fiveDaysBefore,
  to: today,
  type: undefined,
  completeOnly: false,
  setFrom: () => {},
  setTo: () => {},
  setType: () => {},
  setCompleteOnly: () => {},
  balancesList: [],
  typeCodes: [],
  isLoading: true,
  initialize: () => {},
});

export const HistoryLogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [from, _setFrom] = useState(fiveDaysBefore);
  const [to, _setTo] = useState(today);
  const [type, setType] = useState<BalanceType>(undefined);
  const [completeOnly, setCompleteOnly] = useState(false);
  const [balancesList, setBalancesList] = useState<BalanceGroupedByDate[]>([]);
  const [typeCodes, setTypeCodes] = useState<(string | number)[]>([]);
  const [isLoading, setLoading] = useState(false);

  const refetch = useCallback(
    async (
      from: DateHelper,
      to: DateHelper,
      type: BalanceType,
      completeOnly: boolean
    ) => {
      setLoading(true);
      try {
        const {
          data: { type_codes, data },
        } = await BalanceAPI.fetchBalance({
          from: from.joinDateTuple(),
          to: to.joinDateTuple(),
          type,
          completed_only: completeOnly,
        });
        setBalancesList(data);
        setTypeCodes(type_codes);
      } catch (error) {
        if (!axios.isCancel(error)) resolveErrorResponse(error);
      }
      setLoading(false);
    },
    []
  );

  const initialize = useCallback(async () => {
    _setFrom(fiveDaysBefore);
    _setTo(today);
    setType(undefined);
    setCompleteOnly(false);
    await refetch(fiveDaysBefore, today, undefined, false);
  }, [refetch]);

  const setFrom = useCallback(
    (f: DateHelper) => {
      if (DateHelper.isSameDay(f, from)) return;
      _setFrom(f);
      refetch(f, to, type, completeOnly);
    },
    [completeOnly, from, refetch, to, type]
  );

  const setTo = useCallback(
    (t: DateHelper) => {
      if (DateHelper.isSameDay(t, to)) return;
      _setTo(t);
      refetch(from, t, type, completeOnly);
    },
    [completeOnly, from, refetch, to, type]
  );

  useEffect(() => {
    refetch(from, to, type, completeOnly);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, completeOnly]);
  return (
    <HistoryLogContext.Provider
      value={{
        showDetailsOf: [],
        from,
        to,
        type,
        completeOnly,
        setFrom,
        setTo,
        setType,
        setCompleteOnly,
        balancesList,
        typeCodes,
        isLoading,
        initialize,
      }}
    >
      {children}
    </HistoryLogContext.Provider>
  );
};

export default HistoryLogContext;
