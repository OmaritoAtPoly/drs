/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from "@material-ui/core";
import React from "react";
import RequestItemHistoryContainer from "../../../../../containers/customer/requests/history/RequestItemHistoryContainer";
import { RequestHistory } from "../../../../../utils/types";
import RequestHistoryItemSkeleton from "../../../../skeletons/RequestHistoryItemSkeleton";
import RowSkeleton from "../../../../skeletons/RowSkeleton";

const styles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));

interface Props {
  historicalLabs: RequestHistory[];
  deleteRequest: (code: string) => void;
  loading: boolean;
  loadingLabRequestHistory: boolean;
}

export default function LabRequestHistoryPanel({
  historicalLabs,
  deleteRequest,
  loading,
  loadingLabRequestHistory,
}: Props) {
  const classes = styles();
  return loadingLabRequestHistory ? (
    <RowSkeleton>
      <>
        <RequestHistoryItemSkeleton />
        <RequestHistoryItemSkeleton />
        <RequestHistoryItemSkeleton />
        <RequestHistoryItemSkeleton />
      </>
    </RowSkeleton>
  ) : (
    <div className={classes.container}>
      {historicalLabs.map((lab) => (
        <RequestItemHistoryContainer
          loading={loading}
          key={lab.code}
          deleteRequest={deleteRequest}
          requestItem={lab.data}
          {...lab}
        />
      ))}
    </div>
  );
}
