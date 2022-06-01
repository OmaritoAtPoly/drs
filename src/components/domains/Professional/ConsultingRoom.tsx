import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../styles/theme";
import BadgedButton from "../../buttons/BadgedButton";
import Icon from "../../Icon/Icon";

interface Props {
  healthCenter?: Schemas.ProfessionalHealthCenterResponse[];
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  healthCenterWrapper: {
    display: "flex",
    alignItems: "center",
  },
  nameStyle: {
    width: "100%",
    paddingLeft: theme.spacing(1.5),
  },
  textWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: "white",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
});

const ConsultingRoom = ({ healthCenter }: Props) => {
  const classes = useStyles();

  return (
    <div id="id-consulting-room-container" className={classes.root}>
      {healthCenter &&
        healthCenter.map((a) => {
          const key = Math.random();
          return (
            <div key={key} className={classes.healthCenterWrapper}>
              <Icon name="consult" width={25} height={25} />
              <div id="text-wrapper" className={classes.textWrapper}>
                <Typography className={classes.nameStyle}>
                  {`${a.name || a.address}${a.notes ? ` / ${a.notes}` : ""}`}
                </Typography>
              </div>
              <BadgedButton circular iconName="joyStick" />
            </div>
          );
        })}
    </div>
  );
};

export default ConsultingRoom;
