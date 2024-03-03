import { useCallback, useState } from "react";
import CustomerAPI, { Customer, FetchCustomerParams } from "@/api/customer";
import { useListen } from "@/hooks";
import { useQuery } from ".";

export const useCustomersList = (params: FetchCustomerParams) => {
  const [currentParams, setCurrentParams] =
    useState<FetchCustomerParams>(params);
  const { refetch, isValidating, data, error, cancels } = useQuery<Customer[]>({
    fetcher: async () => await CustomerAPI.fetchCustomersList(currentParams),
  });

  const onParamsChange = useCallback(() => {
    setCurrentParams(params);
  }, [params]);

  useListen(params, onParamsChange);

  return { refetch, isValidating, customersList: data || [], error };
};

export const useCustomer = (id?: number, params: FetchCustomerParams = {}) => {
  const {
    data: customer = null,
    isValidating,
    error,
    refetch,
  } = useQuery<Customer>({
    fetcher: async (oldData) => {
      if (!id) return oldData;
      return await CustomerAPI.fetchCustomer(id, params);
    },
  });

  return { customer, isValidating, isError: error, refetch };
};
