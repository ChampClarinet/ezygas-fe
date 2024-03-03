import { useCallback, useState } from "react";
import axios from "axios";
import { resolveErrorResponse } from "@/utils/error";

export interface UseQuery<T> {
  fetcher: (oldData: T | null) => Promise<T | null>;
}
export const useQuery = <T = any>(options: UseQuery<T>) => {
  const { fetcher } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isValidating, setValidating] = useState(false);
  const [cancels, setCancels] = useState(0);

  const setLoadCompleted = useCallback((isError = false) => {
    setLoading(false);
    setValidating(false);
    setError(isError);
  }, []);

  const startLoading = useCallback(() => {
    setValidating(true);
  }, []);

  const fetchFn = useCallback(async () => {
    try {
      startLoading();
      const response = await fetcher(data);
      setLoadCompleted();
      setData(response);
    } catch (error) {
      if (axios.isCancel(error)) {
        //? use old data
        setCancels((prev) => prev + 1);
        return setLoadCompleted();
      }

      setLoadCompleted(true);
      resolveErrorResponse(error);
      return error;
    }
  }, [data, fetcher, setLoadCompleted, startLoading]);

  return { data, error, isLoading, isValidating, refetch: fetchFn, cancels };
};
