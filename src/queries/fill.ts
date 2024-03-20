import FillAPI, { Fill } from "@/api/fill";
import { useCallback } from "react";
import { useQuery } from ".";

export const useFillsList = () => {
  const fetchFn = useCallback(
    async () =>
      (await FillAPI.fetchFillsList()).sort(
        (a, b) => +new Date(a.updatedAt) - +new Date(b.updatedAt)
      ),
    []
  );

  const fillsQuery = useQuery<Fill[]>({
    fetcher: fetchFn,
  });
  const { error, data, isLoading, isValidating, refetch } = fillsQuery;

  return {
    fillsList: data || [],
    error,
    isLoading,
    isValidating,
    refetch,
  };
};
