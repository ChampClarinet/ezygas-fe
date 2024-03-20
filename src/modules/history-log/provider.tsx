"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import DateHelper from "@cantabile/date-helper";
import { BalanceGroupedByDate, BalanceType } from "@/api/balance";
import { useBalancesList } from "@/queries/history";

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
  isValidating: boolean;
  refetch: () => unknown;
  error: boolean;
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
  isValidating: false,
  refetch: () => {},
  error: false,
  initialize: () => {},
});

export const HistoryLogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [from, _setFrom] = useState(fiveDaysBefore);
  const [to, _setTo] = useState(today);
  const [type, setType] = useState<BalanceType>(undefined);
  const [completeOnly, setCompleteOnly] = useState(false);
  const { balancesList, typeCodes, isLoading, isValidating, refetch, error } =
    useBalancesList({
      from: from.joinDateTuple(),
      to: to.joinDateTuple(),
      type,
      completed_only: completeOnly,
    });
  const initialize = useCallback(async () => {
    _setFrom(fiveDaysBefore);
    _setTo(today);
    setType(undefined);
    setCompleteOnly(false);
    await refetch();
  }, [refetch]);

  const onFiltersChange = useCallback(() => {
    refetch();
  }, [refetch]);

  const setFrom = useCallback(
    (f: DateHelper) => {
      if (DateHelper.isSameDay(f, from)) return;
      setFrom(f);
      onFiltersChange();
    },
    [from, onFiltersChange]
  );

  const setTo = useCallback(
    (t: DateHelper) => {
      if (DateHelper.isSameDay(t, to)) return;
      _setTo(t);
      onFiltersChange();
    },
    [onFiltersChange, to]
  );

  useEffect(() => {
    onFiltersChange();
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
        isValidating,
        refetch,
        error,
        initialize,
      }}
    >
      {children}
    </HistoryLogContext.Provider>
  );
};

export default HistoryLogContext;
