import MasterAPI from "@/api/master";
import { useCallback } from "react";
import { useQuery } from ".";
import { WeekdayDTO } from "@/types/misc";

export const useDaysList = () => {
  const fetchFn = useCallback(async () => {
    const response = await MasterAPI.fetchDaysListAPI();
    return response.data.data;
  }, []);

  const { data, error, isLoading, isValidating, refetch } = useQuery<
    WeekdayDTO[]
  >({
    fetcher: fetchFn,
  });

  return {
    days: data || [],
    error,
    isLoading,
    isValidating,
    refetch,
  };
};
