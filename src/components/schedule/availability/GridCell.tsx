/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useCallback } from "react";
import { AvailabilityGridItem } from "../../../utils/types";
import { numberToDay } from "../../../utils/utils";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    borderRadius: theme.spacing(1),
    border: `2px solid ${theme.palette.grey[300]}`,
    marginBottom: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
      "& $regularFont": {
        color: "#fff",
      },
    },
  },
  activeItem: {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },

  hoverItem: {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.dark,
  },
  disabledItem: {
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.grey[500],
    "&:hover": {
      borderColor: theme.palette.grey[300],
      backgroundColor: theme.palette.grey[500],
      cursor: "text",
      "& $regularFont": {
        color: theme.palette.text.primary,
      },
    },
  },
  regularFont: {
    color: theme.palette.text.primary,
  },
  activeFont: {
    color: "#fff",
  },
  skeleton: {
    marginBottom: theme.spacing(0.25),
    borderRadius: theme.spacing(1),
  },
}));

interface Props {
  loading: boolean;
  availability: AvailabilityGridItem;
  containerStyle?: string;
  onCellClicked: (item: AvailabilityGridItem) => void;
  onCellHover: (item: AvailabilityGridItem) => void;
}

export default function GridCell({
  loading,
  availability,
  containerStyle = "",
  onCellClicked,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCellHover,
}: Props) {
  const classes = useStyles();

  const renderContainerStyle = useCallback(() => {
    switch (availability.status) {
      case "ACTIVE":
        return classes.activeItem;
      case "HOVER":
        return classes.hoverItem;
      case "DISABLED":
        return classes.disabledItem;
      default:
        return classes.item;
        break;
    }
  }, [
    availability.status,
    classes.activeItem,
    classes.disabledItem,
    classes.hoverItem,
    classes.item,
  ]);

  const renderFontStyle = useCallback(() => {
    switch (availability.status) {
      case "ACTIVE":
        return classes.activeFont;
      case "HOVER":
        return classes.activeFont;
      default:
        return classes.regularFont;
        break;
    }
  }, [availability.status, classes.activeFont, classes.regularFont]);

  const handleOnClick = useCallback(() => {
    onCellClicked(availability);
  }, [availability, onCellClicked]);

  // TODO To refactor this code to make an high performance
  // const handleOnOver = useCallback(() => {
  //   onCellHover(availability);
  // }, [availability, onCellHover]);

  return loading ? (
    <Skeleton
      className={classes.skeleton}
      width="95%"
      height={35}
      variant="rect"
    />
  ) : (
    <div
      className={`${containerStyle} ${classes.item} ${renderContainerStyle()}`}
      onClick={handleOnClick}>
      <Typography className={`${renderFontStyle()}`}>
        {`${numberToDay(availability.hour)}:${numberToDay(
          availability.minute,
        )}`}
      </Typography>
    </div>
  );
}
