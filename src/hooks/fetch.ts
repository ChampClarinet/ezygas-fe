import { FetchAbortedError } from "@/errors";
import { resolveErrorResponse } from "@/utils/error";
import axios from "axios";
import { useCallback, useState } from "react";

export interface UseFetch<T> {
  /**
   * Fetches new data.
   * @param {T} oldData The old fetched data.
   * @returns {Promise<T>} A promise that resolves with the new fetched data.
   * @throws {FetchAbortedError} Throws this error to abort the fetching process.
   */
  fetcher: (oldData: T | null) => Promise<T | null>;
}
export const useFetch = <T = any>(options: UseFetch<T>) => {
  const { fetcher } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isValidating, setValidating] = useState(false);
  const [cancels, setCancels] = useState(0);

  const onLoadCompleted = useCallback((isError = false) => {
    setLoading(false);
    setValidating(false);
    setError(isError);
  }, []);

  const onStartLoading = useCallback(() => setValidating(true), []);

  const clear = useCallback(() => {
    setData(null);
    setError(false);
    setLoading(true);
    setValidating(false);
  }, []);

  const fetchFn = useCallback(async () => {
    try {
      onStartLoading();
      const response = await fetcher(data);
      onLoadCompleted();
      setData(response);
      return response;
    } catch (error) {
      if (axios.isCancel(error) || error instanceof FetchAbortedError) {
        //? use old data
        setCancels((prev) => prev + 1);
        return onLoadCompleted();
      }

      onLoadCompleted(true);
      resolveErrorResponse(error);
      return error;
    }
  }, [data, fetcher, onLoadCompleted, onStartLoading]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    cancels,
    fetchFn,
    clear,
  };
};
