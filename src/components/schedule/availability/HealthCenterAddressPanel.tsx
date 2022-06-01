import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../utils/strings";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
  },
  font: {
    color: "#fff",
  },
}));

interface Props {
  center: Schemas.ProfessionalHealthCenterResponse;
}

export default function HealthCenterAddressPanel({ center }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.font}>
        {`${STRINGS.schedule.CONFIG_DATA_INFO} ${center.name} | ${center.address}`}
      </Typography>
    </div>
  );
}
