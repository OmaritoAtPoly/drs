/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
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
    item: { fontWeight: "bold" },
  }),
);

const ServiceSimpleHeader = () => {
  const classes = useStyles();

  const largeDevice = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md"),
  );

  const rowInLagerDevice = useMemo(
    () => (
      <ListItem button alignItems="flex-start" className={classes.flex}>
        <div className={classes.largeColumn}>
          <ListItemText
            primary={<Typography className={classes.item}>Nombre</Typography>}
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={<Typography className={classes.item}>Código</Typography>}
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={<Typography className={classes.item}>IVA</Typography>}
          />
        </div>
        <div className={`${classes.shortColumn}`}>
          <ListItemText
            primary={<Typography className={classes.item}>Precio</Typography>}
          />
        </div>
        <div className={`${classes.largeColumn}`}>
          <ListItemText
            primary={
              <Typography className={classes.item}>Descripción</Typography>
            }
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={<Typography className={classes.item}>Activo</Typography>}
          />
        </div>
        <div className={classes.shortColumn} />
      </ListItem>
    ),
    [classes.flex, classes.item, classes.largeColumn, classes.shortColumn],
  );

  return (
    <div className={classes.container}>{largeDevice && rowInLagerDevice}</div>
  );
};

export default ServiceSimpleHeader;
