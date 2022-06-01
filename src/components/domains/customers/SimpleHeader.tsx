/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useMemo } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    inline: {
      display: "inline",
    },
    shortColumn: {
      width: "10%",
      padding: 2,
    },
    largeColumn: {
      width: "20%",
      padding: 2,
    },
    flex: { display: "flex" },
    min: { minWidth: 100 },
  }),
);

const SimpleHeader = () => {
  const classes = useStyles();

  const largeDevice = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md"),
  );

  // TODO: add city in api and patient app
  const rowInLagerDevice = useMemo(
    () => (
      <ListItem button alignItems="flex-start" className={classes.flex}>
        <div className={classes.largeColumn}>
          <ListItemText primary="NOMBRES" />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText primary="EDAD" />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText primary="SEXO" />
        </div>
        <div className={classes.largeColumn}>
          <ListItemText primary="EMAIL" />
        </div>
        <div className={`${classes.largeColumn} ${classes.min}`}>
          <ListItemText primary="TELÉFONO" />
        </div>
        <div className={`${classes.shortColumn} ${classes.min}`}>
          <ListItemText primary="CI" />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText primary="CIUDAD" />
        </div>
        <div className={classes.shortColumn} />
      </ListItem>
    ),
    [classes.flex, classes.largeColumn, classes.min, classes.shortColumn],
  );

  return (
    <div className={classes.container}>{largeDevice && rowInLagerDevice}</div>
  );
};

export default SimpleHeader;
