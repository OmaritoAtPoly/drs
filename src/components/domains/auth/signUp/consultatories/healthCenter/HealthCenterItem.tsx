import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import BadgedButton from "../../../../../buttons/BadgedButton";

interface Props {
  healthCenter: Schemas.ProfessionalHealthCenterRequest;
  onDelete: (healthCenter: Schemas.ProfessionalHealthCenterRequest) => void;
}
const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  badgedButtonStyle: {
    height: "30px",
    display: "flex",
    justifyContent: "center",
  },
  fontWrapperStyle: {
    display: "flex",
    flexDirection: "column",
  },
});

const HealthCenterItem = ({ healthCenter, onDelete }: Props) => {
  const classes = styles();

  const handleOnDelete = useCallback(() => {
    onDelete(healthCenter);
  }, [healthCenter, onDelete]);

  return (
    <div className={classes.container} id="healthCenter-item-container">
      <div className={classes.fontWrapperStyle}>
        <Typography>
          {`${STRINGS.generals.NAME_NOTES}: ${`${
            healthCenter.name || healthCenter.address
          }${healthCenter.notes ? ` / ${healthCenter.notes}` : ""}`}`}
        </Typography>
      </div>
      <BadgedButton
        containerStyle={classes.badgedButtonStyle}
        iconWidth={15}
        iconName="trash"
        fill={theme.palette.error.main}
        onClick={handleOnDelete}
      />
    </div>
  );
};

export default HealthCenterItem;
