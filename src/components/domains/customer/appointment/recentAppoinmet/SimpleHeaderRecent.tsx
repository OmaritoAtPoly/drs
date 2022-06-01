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
      fontSize: 15,
      fontWeight: "bold",
    },
    largeColumn: {
      width: "20%",
      padding: 2,
      fontWeight: "bold",
      fontSize: 20,
    },
    flex: { display: "flex", marginTop: 50 },
    min: { minWidth: 100 },
  }),
);

const SimpleHeaderRecent = () => {
  const classes = useStyles();

  const largeDevice = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md"),
  );

  const rowInLagerDevice = useMemo(
    () => (
      <ListItem button alignItems="flex-start" className={classes.flex}>
        <div className={classes.shortColumn}>
          <ListItemText primary="Hora" />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText primary="Modalidad" />
        </div>
        <div className={classes.largeColumn}>
          <ListItemText primary="Paciente" />
        </div>
        <div className={classes.largeColumn}>
          <ListItemText primary="Motivo de la Consulta" />
        </div>
        <div className={`${classes.shortColumn} ${classes.min}`}>
          <ListItemText primary="Estado" />
        </div>
      </ListItem>
    ),
    [classes.flex, classes.largeColumn, classes.min, classes.shortColumn],
  );

  return (
    <div className={classes.container}>{largeDevice && rowInLagerDevice}</div>
  );
};

export default SimpleHeaderRecent;
