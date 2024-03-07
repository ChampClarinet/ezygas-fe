import VendorsAPI, { WorkTimeDTO } from "@/api/vendors";
import { useFetch } from "@/hooks/fetch";

export const useDayCloses = () => {
  return useFetch<string[]>({
    fetcher: async () => {
      const response = await VendorsAPI.fetchDayClosesAPI();
      return response.data.data;
    },
  });
};

export const useWorkTime = () => {
  return useFetch<WorkTimeDTO>({
    fetcher: async () => {
      const response = await VendorsAPI.fetchWorkTimeAPI();
      return response.data.data;
    },
  });
};
