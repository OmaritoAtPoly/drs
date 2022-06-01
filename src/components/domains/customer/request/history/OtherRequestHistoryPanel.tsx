/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import RequestItemHistoryContainer from "../../../../../containers/customer/requests/history/RequestItemHistoryContainer";
import { RequestHistory } from "../../../../../utils/types";
import InfiniteScrollList from "../../../../lists/InfiniteScrollList";

interface Props {
  otherRequests: RequestHistory[];
  deleteRequest: (code: string) => void;
  deleting: boolean;
  loadingOtherRequests: boolean;
}

export default function OtherRequestHistoryPanel({
  otherRequests,
  deleteRequest,
  deleting,
  loadingOtherRequests,
}: Props) {
  return (
    <InfiniteScrollList
      data={otherRequests}
      loading={loadingOtherRequests}
      renderRow={(request) => (
        <RequestItemHistoryContainer
          loading={deleting}
          key={request.code}
          deleteRequest={deleteRequest}
          requestItem={request.data}
          {...request}
        />
      )}
    />
  );
}
