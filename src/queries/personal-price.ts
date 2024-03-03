import PersonalPriceAPI, { PersonalPrice } from "@/api/personal-prices";
import { useQuery } from ".";

export const usePersonalPricesList = () => {
  const { data, isValidating, error, refetch } = useQuery<PersonalPrice[]>({
    fetcher: async () => {
      const response = await PersonalPriceAPI.fetchPersonalPricesList();
      return response.data.data;
    },
  });

  return {
    personalPricesList: data || [],
    isValidating,
    isError: error,
    refetch,
  };
};
