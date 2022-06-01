/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { QueryKey, useInfiniteQuery, useQuery } from "react-query";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import {
  ReactQueryKeys,
  UseInfiniteQueryArgs,
  UseQueryArgs,
} from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchLabCategory = (
  _key: QueryKey,
  { search }: Paths.GetLaboratoriesCategories.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/laboratories-categories?search=${search}` as any,
    body: {},
    method: "GET",
  });

export const useCustomerLabCategoryQuery = ({
  showError,
  search,
  ...argsQuery
}: UseQueryArgs<Schemas.CategoryData[], TreatedError> &
  Paths.GetLaboratoriesCategories.QueryParameters) => {
  const { data, error, isLoading: loading } = useQuery<
    Schemas.CategoryData[],
    TreatedError
  >(
    [ReactQueryKeys["customer-lab-category-key"], { search }],
    fetchLabCategory,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error };
};

const fetchImageCategory = (
  _key: QueryKey,
  { search }: Paths.GetImagesCategories.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/images-categories?search=${search}` as any,
    body: {},
    method: "GET",
  });

export const useCustomerImageCategoryQuery = ({
  showError,
  search,
  ...argsQuery
}: UseQueryArgs<Schemas.CategoryData[], TreatedError> &
  Paths.GetImagesCategories.QueryParameters) => {
  const { data, error, isLoading: loading } = useQuery<
    Schemas.CategoryData[],
    TreatedError
  >(
    [ReactQueryKeys["customer-image-category-key"], { search }],
    fetchImageCategory,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error };
};

const fetchDiagnoses = (
  _key: QueryKey,
  { search }: Paths.GetDiagnoses.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/diagnoses?search=${search}` as any,
    body: {},
    method: "GET",
  });

export const useCustomerDiagnosesQuery = ({
  showError,
  search,
  ...argsQuery
}: UseQueryArgs<Schemas.Diagnose[], TreatedError> &
  Paths.GetDiagnoses.QueryParameters) => {
  const { data, error, isLoading: loading } = useQuery<
    Schemas.Diagnose[],
    TreatedError
  >(
    [ReactQueryKeys["customer-diagnose-key"], { search }],
    fetchDiagnoses,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error };
};

const fetchSearchRequests = (
  _key: QueryKey,
  {
    code,
    from,
    to,
    requestType,
  }: Paths.Requests.PathParameters &
    Omit<Paths.Requests.QueryParameters, "page" | "pageSize">,
  page = 0,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/requests-items?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}${
      from ? `&from=${from}` : ""
    }${to ? `&to=${to}` : ""}${
      requestType ? `&requestType=${requestType}` : ""
    }` as any,
    body: {},
    method: "GET",
  });

export const useSearchRequestsQuery = ({
  showError,
  code,
  from,
  to,
  requestType,
  ...argsQuery
}: UseInfiniteQueryArgs<Schemas.PageResponseRequestItem, TreatedError> &
  Paths.Requests.PathParameters &
  Omit<Paths.Requests.QueryParameters, "page" | "pageSize">) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery<Schemas.PageResponseRequestItem, TreatedError>(
    [
      ReactQueryKeys["customers-requests-items"],
      { code, from, to, requestType },
    ],
    fetchSearchRequests,
    argsQuery,
  );

  const fetchMore = useCallback(
    (page?: number) => {
      fetchMoreQuery(Number.isInteger(page) ? page : undefined);
    },
    [fetchMoreQuery],
  );

  useShowError({ showError, error: error as TreatedError | undefined });
  return {
    loading,
    groups: data,
    items: data?.flatMap((d) => d.items || []) || [],
    error,
    fetchMore,
    isFetchingMore,
    refetch,
    canFetchMore,
  };
};

const fetchOtherRequests = (
  _key: QueryKey,
  {
    code,
    appointment,
    page,
    pageSize,
  }: Paths.GetCustomerOthers.PathParameters &
    Paths.GetCustomerOthers.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/other-requests?appointment=${appointment}&page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

export const useCustomerOtherRequestQuery = ({
  showError,
  code,
  page,
  pageSize,
  appointment,
  ...argsQuery
}: UseQueryArgs<Schemas.OtherRequestResponse[], TreatedError> &
  Paths.GetCustomerOthers.PathParameters &
  Paths.GetCustomerOthers.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.OtherRequestResponse[],
    TreatedError
  >(
    [
      ReactQueryKeys["customer-other-requests-key"],
      { code, page, pageSize, appointment },
    ],
    fetchOtherRequests,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useOtherRequestCacheQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.OtherRequestResponse, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.OtherRequestItemResponse,
    TreatedError
  >([ReactQueryKeys["customer-last-other-request-key"]], argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};
