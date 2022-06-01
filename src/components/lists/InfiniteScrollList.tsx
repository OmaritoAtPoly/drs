/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStyles, List, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Waypoint } from "react-waypoint";
import { DEFAULT_ITEM_REST_LOAD_MORE } from "../../utils/constants";
import LoadingWrapper from "../LoadingWrapper";

interface Props {
  data: any[];
  loading?: boolean;
  hasNextPage?: boolean;
  fetchMore?: () => void;
  renderRow: (element: any, index: number) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  classNameContainer?: string;
  height?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: ({ height }: { height?: number }) => ({
      backgroundColor: theme.palette.common.white,
      width: "100%",
      height,
    }),
    list: ({ height }: { height?: number }) => ({
      width: "100%",
      overflow: "scroll",
      height,
    }),
  }),
);

const InfiniteScrollList = ({
  data = [],
  loading = false,
  hasNextPage = false,
  fetchMore = () => {},
  renderRow,
  renderHeader,
  classNameContainer,
  height = 500,
}: Props) => {
  const classes = useStyles({ height });

  return (
    <LoadingWrapper loading={loading}>
      <div className={`${classes.container} ${classNameContainer}`}>
        {!!renderHeader && renderHeader()}
        <List className={classes.list}>
          {data.map((item, i) => (
            <React.Fragment key={Math.random().toFixed(5).toString()}>
              {renderRow(item, i)}
              {hasNextPage &&
                i === data.length - DEFAULT_ITEM_REST_LOAD_MORE && (
                  <Waypoint onEnter={fetchMore} />
                )}
            </React.Fragment>
          ))}
        </List>
      </div>
    </LoadingWrapper>
  );
};

export default InfiniteScrollList;
