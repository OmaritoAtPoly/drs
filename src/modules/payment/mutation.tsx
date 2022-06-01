/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const addCard = (body: Paths.AddCard.RequestBody) =>
  fetchCreator({
    endpoint: "/professional/payment/cards",
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useAddCardMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.PaymentCardData,
  TreatedError,
  Paths.AddCard.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addCard,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

type SubscriptionCode = {
  subscriptionCode: string;
};
const paySubscription = (
  body: Paths.PaySubscription.RequestBody & SubscriptionCode,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/subscriptions/${body.subscriptionCode}/pay` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const usePaySubscriptionMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalData,
  TreatedError,
  Paths.PaySubscription.RequestBody & SubscriptionCode,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    paySubscription,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deletePayCard = ({ token }: Paths.RemoveCard.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/payment/cards/${token}` as any,
    body: {},
    headers: {},
    method: "DELETE",
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeletePayCardMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.PaymentCardData,
  TreatedError,
  Paths.RemoveCard.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deletePayCard,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
