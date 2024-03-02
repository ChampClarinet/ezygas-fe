import useGlobalStore from "@/stores/global";

export const useSession = () => {
  const user = useGlobalStore((state) => state.user);
  const myVendor = useGlobalStore((state) => state.myVendor);

  return { user, myVendor };
};
