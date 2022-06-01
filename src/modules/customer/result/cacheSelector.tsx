import moment from "moment";
import { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import { RequestType } from "../../../utils/enums";
import { ReactQueryKeys } from "../../apiTypes";
import { useSearch } from "../../utils/route";
import { useResultsQuery } from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useResultsCacheSelector = ({
  seen: seenProp,
  staleTime,
}: {
  seen?: boolean;
  staleTime?: number;
}) => {
  const { id: code } = useParams<{ id?: string }>();
  const {
    requestType: requestTypeRoute,
    seen: seenRoute,
    to: toRoute,
    from: fromRoute,
  } = useSearch();
  const [{ requestType, seen, from, to }, setFilters] = useState({
    requestType: requestTypeRoute,
    seen: seenProp || seenRoute,
    from: fromRoute || moment().subtract(1, "months").format("DD/MM/yyyy"),
    to: toRoute || moment().format("DD/MM/yyyy"),
  });

  const {
    loading,
    items,
    isFetchingMore,
    canFetchMore,
    fetchMore,
    totalItems,
  } = useResultsQuery({
    code: code || "",
    requestType,
    seen,
    from,
    to,
    showError: true,
    retry: false,
    staleTime,
  });

  const setRangeDates = useCallback(
    (fromDate: Date, toDate: Date) => {
      setFilters({
        requestType,
        seen,
        to: `${toDate.getDate()}/${
          toDate.getMonth() + 1
        }/${toDate.getFullYear()}`,
        from: `${fromDate.getDate()}/${
          fromDate.getMonth() + 1
        }/${fromDate.getFullYear()}`,
      });
    },
    [requestType, seen],
  );

  const setSeen = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (seen?: boolean) => {
      setFilters({
        requestType,
        seen: seen || false,
        to,
        from,
      });
    },
    [from, requestType, to],
  );

  const setRequestType = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (requestType: RequestType) => {
      setFilters({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        requestType: requestType as any,
        seen,
        to,
        from,
      });
    },
    [from, seen, to],
  );

  return {
    loading,
    setFilters,
    setRangeDates,
    setSeen,
    setRequestType,
    items,
    isFetchingMore,
    canFetchMore,
    fetchMore,
    requestType,
    seen,
    from,
    to,
    totalItems,
  };
};

export const useSaveCurrentResultSelectorCacheSelector = () => {
  const saveCurrentResult = useCallback((data?: Schemas.ResultResponse) => {
    queryCache.setQueryData<Schemas.ResultResponse | undefined>(
      [ReactQueryKeys["current-customer-result"]],
      data,
    );
  }, []);
  return { saveCurrentResult };
};
