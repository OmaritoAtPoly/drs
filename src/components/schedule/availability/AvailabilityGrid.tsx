import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { WEEK_DAYS } from "../../../utils/constants";
import { AvailabilityGridItem } from "../../../utils/types";
import GridCell from "./GridCell";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  info: {
    width: "100%",
    fontSize: "1rem",
    textAlign: "center",
    fontWeight: "bold",
  },
}));

interface Props {
  loading: boolean;
  availabilityGrid: AvailabilityGridItem[][];
  onCellClicked: (item: AvailabilityGridItem) => void;
  onCellHover: (item: AvailabilityGridItem) => void;
}

export default function AvailabilityGrid({
  loading,
  availabilityGrid,
  onCellClicked,
  onCellHover,
}: Props) {
  const classes = useStyles();

  const renderColumn = useCallback(
    (availabilities: AvailabilityGridItem[]) =>
      availabilities &&
      availabilities.map((availability, index) => (
        <GridCell
          key={index.toString()}
          loading={loading}
          availability={availability}
          onCellClicked={onCellClicked}
          onCellHover={onCellHover}
        />
      )),
    [loading, onCellClicked, onCellHover],
  );

  return (
    <div className={classes.container}>
      <div className={classes.headerContent}>
        {WEEK_DAYS.map((day) => (
          <Typography key={day} className={classes.info}>
            {day}
          </Typography>
        ))}
      </div>
      <div className={classes.gridContainer}>
        <div className={classes.col}>{renderColumn(availabilityGrid[0])}</div>
        <div className={classes.col}>{renderColumn(availabilityGrid[1])}</div>
        <div className={classes.col}>{renderColumn(availabilityGrid[2])}</div>
        <div className={classes.col}>{renderColumn(availabilityGrid[3])}</div>
        <div className={classes.col}>{renderColumn(availabilityGrid[4])}</div>
        <div className={classes.col}>{renderColumn(availabilityGrid[5])}</div>
        <div className={classes.col}>{renderColumn(availabilityGrid[6])}</div>
      </div>
    </div>
  );
}
