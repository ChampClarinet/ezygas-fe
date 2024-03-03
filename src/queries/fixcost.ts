import { useCallback, useMemo } from "react";
import FixCostAPI, { FixCost } from "@/api/fixcost";
import { filterDuplicates } from "@/utils/string";
import { useQuery } from ".";

export const useFixCostsList = () => {
  const fetchFn = useCallback(async () => {
    const fixCosts = await FixCostAPI.fetchFixCostsList();
    return fixCosts;
  }, []);

  const query = useQuery<FixCost[]>({
    fetcher: fetchFn,
  });
  const { data } = query;

  const recentCostNames = useMemo(() => {
    const names = (data ?? []).map((item) => item.name);
    return filterDuplicates(names);
  }, [data]);

  return {
    ...query,
    fixCostsList: data,
    recentCostNames,
  };
};
