import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import fetchCreator from "../utils/fetch.ts/fetchCreator";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";

const fetchLogin = (body: Paths.Login.RequestBody) =>
  fetchCreator({
    endpoint: "/user/login",
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useSignInMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.TokenLegalID,
  TreatedError,
  Paths.Login.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    fetchLogin,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};

const sendValidationEmail = ({ email }: Paths.SendValidation.RequestBody) =>
  fetchCreator({
    endpoint: "/user/send-validation-email",
    body: { email },
    method: "POST",
  });

export const useSendValidationEmailMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  keyof Pick<Paths.SendValidation.Responses.$200, "data">,
  TreatedError,
  Paths.SendValidation.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendValidationEmail,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};

const validateEmail = ({ email, code }: Schemas.EmailCodeRequest) =>
  fetchCreator({
    endpoint: "/user/validate-email",
    body: {
      email,
      code,
    },
    method: "POST",
  });

export const useValidateEmailMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.EmailCodeRequest,
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    validateEmail,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const changePassword = ({
  email,
  code,
  password,
}: Schemas.EmailPasswordRequest) =>
  fetchCreator({
    endpoint: "/user/enable-user",
    body: {
      email,
      code,
      password,
    },
    method: "POST",
  });

export const useChangePasswordMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.EmailPasswordRequest,
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    changePassword,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};

const registerEmail = ({ email }: Paths.Register.RequestBody) =>
  fetchCreator({
    endpoint: "/user/register-email",
    body: {
      email,
    },
    method: "POST",
  });

export const useRegisterEmailMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  keyof Pick<Paths.Register.Responses.$200, "data">,
  TreatedError,
  Paths.Register.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    registerEmail,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};

const updateUser = (body: Schemas.EmailPasswordRequest) =>
  fetchCreator({
    endpoint: "/user/me",
    body,
    method: "POST",
  });

export const useUpdateUserMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.UserData,
  TreatedError,
  Schemas.EmailPasswordRequest,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateUser,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
