import { useCallback, useMemo } from "react";
import { useCustomer } from "@/queries/customers";
import { usePersonalPricesList } from "@/queries/personal-price";

export interface UseStates {
  ppQuery: ReturnType<typeof usePersonalPricesList>;
  cQuery: ReturnType<typeof useCustomer>;
  customerId?: number;
}
const useStates = (params: UseStates) => {
  const { ppQuery, cQuery, customerId } = params;

  const isError = useMemo(
    () => ppQuery.isError || (customerId != null && cQuery.isError),
    [cQuery.isError, customerId, ppQuery.isError]
  );

  const isLoading = useMemo(
    () => ppQuery.isValidating || (customerId != null && cQuery.isValidating),
    [cQuery.isValidating, customerId, ppQuery.isValidating]
  );

  const handleRefetch = useCallback(() => {
    cQuery.refetch();
    ppQuery.refetch();
  }, [cQuery, ppQuery]);

  return {
    isError,
    isLoading,
    handleRefetch,
  };
};

export default useStates;
