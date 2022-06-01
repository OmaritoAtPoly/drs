import moment from "moment";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../utils/date";
import { RequestType } from "../../../utils/enums";
import { useSearchRequestsQuery } from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useSearchRequestCacheSelector = ({
  from,
  requestType,
  to,
}: {
  requestType: RequestType;
  from: Date;
  to: Date;
}) => {
  const { id } = useParams<{ id: string }>();

  const {
    items,
    isFetchingMore,
    canFetchMore,
    fetchMore,
    loading,
  } = useSearchRequestsQuery({
    showError: true,
    retry: false,
    from: moment(from).format(formatDate.DD_MM_YYYY),
    to: moment(to).format(formatDate.DD_MM_YYYY),
    requestType,
    code: id,
  });

  return {
    loading,
    items,
    isFetchingMore,
    canFetchMore,
    fetchMore,
  };
};
