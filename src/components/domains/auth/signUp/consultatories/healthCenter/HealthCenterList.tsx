import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import HealthCenterItem from "./HealthCenterItem";

interface Props {
  healthCenters: Schemas.ProfessionalHealthCenterRequest[];
  onDelete: (healthCenter: Schemas.ProfessionalHealthCenterRequest) => void;
}

const styles = makeStyles({
  titleStyle: {
    display: "flex",
    marginBottom: 6,
    color: theme.palette.primary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
      alignSelf: "center",
    },
  },
});

const HealthCenterList = ({ healthCenters, onDelete }: Props) => {
  const classes = styles();

  const noEmptyHealthCenters = useMemo(
    () => healthCenters.filter((a) => a.code !== ""),
    [healthCenters],
  );

  return (
    <div>
      <Typography className={classes.titleStyle}>
        {STRINGS.signUp.ADD_CONSULTING_ROOM}
      </Typography>
      {noEmptyHealthCenters.map(
        (healthCenter: Schemas.ProfessionalHealthCenterRequest) => (
          <HealthCenterItem
            key={healthCenter.code}
            healthCenter={healthCenter}
            onDelete={onDelete}
          />
        ),
      )}
    </div>
  );
};

export default HealthCenterList;
