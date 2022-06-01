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
  historicalImages: RequestHistory[];
  deleteRequest: (code: string) => void;
  loading: boolean;
  loadingImageRequestHistory: boolean;
}

export default function ImageRequestHistoryPanel({
  historicalImages,
  deleteRequest,
  loading,
  loadingImageRequestHistory,
}: Props) {
  const classes = styles();
  return loadingImageRequestHistory ? (
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
      {historicalImages.map((image) => (
        <RequestItemHistoryContainer
          key={image.code}
          deleteRequest={deleteRequest}
          loading={loading}
          requestItem={image.data}
          {...image}
        />
      ))}
    </div>
  );
}
