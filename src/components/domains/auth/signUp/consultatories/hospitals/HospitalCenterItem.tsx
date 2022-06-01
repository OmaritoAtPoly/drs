import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import BadgedButton from "../../../../../buttons/BadgedButton";

interface Props {
  hospital: string;
  onDelete: (hospital: string) => void;
}
const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: "10px",
  },
  badgedButtonStyle: {
    height: "30px",
    display: "flex",
    justifyContent: "center",
  },
  fontWrapperStyle: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "60%",
  },
});

const HospitalCenterItem = ({ hospital, onDelete }: Props) => {
  const classes = styles();

  const handleOnDelete = useCallback(() => {
    onDelete(hospital);
  }, [hospital, onDelete]);

  return (
    <div className={classes.container} id="hospital-item-container">
      <div className={classes.fontWrapperStyle}>
        <Typography>
          {`${STRINGS.generals.NAME_NOTES}: ${hospital}`}
        </Typography>
      </div>
      <BadgedButton containerStyle={classes.badgedButtonStyle} iconWidth={15} iconName="trash" fill={theme.palette.error.main} onClick={handleOnDelete} />
    </div>
  );
};

export default HospitalCenterItem;
