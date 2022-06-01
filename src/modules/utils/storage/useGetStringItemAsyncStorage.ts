import { useQuery } from "react-query";
import { AsyncStorageKeys, getStringItemAsyncStore } from "./AsyncStorageKeys";

export const useGetStringItemAsyncStorage = ({
  key,
  enabled = true,
}: {
  key: AsyncStorageKeys;
  enabled?: boolean;
}) => {
  const { isLoading: loading, data: value } = useQuery(
    [key],
    async () => {
      const result = await getStringItemAsyncStore(key);
      return result;
    },
    { enabled, suspense: true },
  );
  return { loading, value };
};

export default useGetStringItemAsyncStorage;
