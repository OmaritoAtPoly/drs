import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import ItemListSkeleton from "./ItemListSkeleton";

const styles = makeStyles(() =>
  createStyles({
    container: {
      listStyleType: "none",
      margin: 0,
      padding: 0,
    },
  }),
);

export default function ListSkeleton() {
  const classes = styles();
  return (
    <ul className={classes.container}>
      <li>
        <ItemListSkeleton />
      </li>
      <li>
        <ItemListSkeleton />
      </li>
      <li>
        <ItemListSkeleton />
      </li>
    </ul>
  );
}
