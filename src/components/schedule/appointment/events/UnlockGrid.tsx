/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AvailabilityGridItem } from "../../../../utils/types";
import GridCell from "../../availability/GridCell";

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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
  unlockGrid: AvailabilityGridItem[][];
  handleOnCellClicked: (item: AvailabilityGridItem) => void;
}

export default function UnlockGrid({
  loading,
  unlockGrid,
  handleOnCellClicked,
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
          onCellClicked={handleOnCellClicked}
          onCellHover={() => {}}
        />
      )),
    [handleOnCellClicked, loading],
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 9,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className={classes.container}>
      <Carousel responsive={responsive}>
        {unlockGrid.map((col, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={classes.col}>
            {renderColumn(col)}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
