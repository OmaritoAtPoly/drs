import {
  CircularProgress,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import Search, { ItemType } from "../../../../inputs/Search/Search";
import RequestItem from "./RequestItem";

const styles = makeStyles(() =>
  createStyles({
    container: {},
    seeker: {
      padding: "10px",
      width: "30%",
    },
  }));

interface Props {
  loading?: boolean;
  requestList: ItemType[];
  newRequestList: ItemType[];
  handleAddRequestItem: (value: ItemType) => void;
  handleDeleteRequestItem: (value: string) => void;
}
export default function Requests({
  loading = false,
  requestList,
  newRequestList,
  handleAddRequestItem,
  handleDeleteRequestItem,
}: Props) {
  const classes = styles();

  return (
    <div>
      <div id="search-container" className={classes.seeker}>
        <Search items={requestList} onPickedOption={handleAddRequestItem} />
      </div>
      { loading ? <CircularProgress size={24} />
        : newRequestList && newRequestList.map((a, index) => {
          const key = Math.random();
          return (
            <RequestItem
              index={index}
              key={key}
              label={a.label}
              onDelete={() => handleDeleteRequestItem(a.value)}
            />
          );
        })}
    </div>
  );
}
