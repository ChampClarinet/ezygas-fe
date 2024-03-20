import { useCallback, useState } from "react";
import BalanceAPI, {
  BalanceGroupedByDate,
  GetBalanceParams,
} from "@/api/balance";
import { useQuery } from ".";

export const useBalancesList = (params: GetBalanceParams) => {
  const { from, to, type, completed_only } = params;

  const [typeCodes, setTypeCodes] = useState<(string | number)[]>([]);

  const fetchFn = useCallback(async () => {
    const {
      data: { type_codes, data },
    } = await BalanceAPI.fetchBalance({
      from,
      to,
      type,
      completed_only,
    });
    setTypeCodes(type_codes);
    return data;
  }, [completed_only, from, to, type]);

  const { data, error, isLoading, isValidating, refetch } = useQuery<
    BalanceGroupedByDate[]
  >({
    fetcher: fetchFn,
  });

  return {
    balancesList: data || [],
    typeCodes,
    error,
    isLoading,
    isValidating,
    refetch,
  };
};
