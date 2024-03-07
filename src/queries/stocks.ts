import { useCallback, useEffect, useMemo } from "react";
import MasterAPI, { BrandOrTypeMasterData } from "@/api/master";
import StocksAPI, { ExistsStock, Stock } from "@/api/stock";
import { uniq } from "@/utils";
import { tankTypeToTypeCode } from "@/utils/stocks";
import { useQuery } from ".";

export interface UseStocksList {
  activeOnly?: boolean;
  onStockChanges?: (stocks: Stock[]) => unknown;
}
export const useStocksList = (params: UseStocksList) => {
  const { activeOnly = true, onStockChanges } = params;

  const fetchFn = useCallback(async () => {
    let response = await StocksAPI.fetchStocksList();
    if (activeOnly) response = response.filter(({ is_active }) => is_active);
    return response;
  }, [activeOnly]);

  const { data, error, isLoading, isValidating, refetch } = useQuery<Stock[]>({
    fetcher: fetchFn,
  });

  useEffect(() => {
    if (onStockChanges && data != null) onStockChanges(data);
  }, [data, onStockChanges]);
  return {
    stocksList: data || [],
    error,
    isLoading,
    isValidating,
    refetch,
  };
};

export const useExistsStocks = () => {
  const fetchFn = useCallback(async () => {
    return await StocksAPI.fetchExistsStock();
  }, []);

  const query = useQuery<ExistsStock[]>({
    fetcher: fetchFn,
  });

  const existsStocksList = useMemo(() => query.data || [], [query.data]);

  const uniqueBrands = useMemo(() => {
    const list = existsStocksList.reduce(
      (arr: string[], curr) => [...arr, curr.cylinder_brand.toLowerCase()],
      []
    );
    return uniq(list).sort();
  }, [existsStocksList]);

  const uniqueTypes = useMemo(() => {
    const list = existsStocksList.reduce(
      (arr: string[], curr) => [...arr, tankTypeToTypeCode(curr.cylinder_type)],
      []
    );
    return uniq(list).sort((a: string, b: string) => +a - +b);
  }, [existsStocksList]);

  return {
    ...query,
    existsStocksList,
    uniqueBrands,
    uniqueTypes,
  };
};

export const useBrandsList = () => {
  const fetchFn = useCallback(async () => {
    return await MasterAPI.fetchBrandsList();
  }, []);

  const query = useQuery<BrandOrTypeMasterData[]>({
    fetcher: fetchFn,
  });

  return {
    ...query,
    brandsList: query.data || [],
  };
};
