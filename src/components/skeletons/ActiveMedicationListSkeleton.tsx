import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import ActiveMedicationItemSkeleton from "./ActiveMedicationItemSkeleton";

const styles = makeStyles(() =>
  createStyles({
    container: {
      listStyleType: "none",
      margin: 0,
      padding: 0,
    },
  }),
);

export default function ActiveMedicationListSkeleton() {
  const classes = styles();
  return (
    <ul className={classes.container}>
      <li>
        <ActiveMedicationItemSkeleton />
      </li>
      <li>
        <ActiveMedicationItemSkeleton />
      </li>
      <li>
        <ActiveMedicationItemSkeleton />
      </li>
    </ul>
  );
}
