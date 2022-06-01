import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../error/TreatedError";
import { useShowError } from "../error/useShowError";
import {
  AsyncStorageKeys,
  setStringItemAsyncStore,
} from "./AsyncStorageKeys";

type SetStringItemAsyncStorageArgs = { key: AsyncStorageKeys; data: string };

const useSetStringItemAsyncStorage = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  string,
  TreatedError,
  SetStringItemAsyncStorageArgs,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async ({ key, data }: SetStringItemAsyncStorageArgs) => {
      await setStringItemAsyncStore(key, data);
      return { data, key };
    },
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data };
};

export default useSetStringItemAsyncStorage;
