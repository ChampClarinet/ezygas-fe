import { useBreakpoint } from "@cantabile/hooks";

export const useCheckMobileSize = () => {
  return useBreakpoint(768);
};
