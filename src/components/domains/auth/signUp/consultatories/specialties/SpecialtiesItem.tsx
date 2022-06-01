import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import BadgedButton from "../../../../../buttons/BadgedButton";

interface Props {
  specialty: string;
  onDelete: (specialty: string) => void;
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
});

const SpecialtiesItem = ({ specialty, onDelete }: Props) => {
  const classes = styles();

  const handleOnDelete = useCallback(() => {
    if (specialty) onDelete(specialty);
  }, [specialty, onDelete]);

  return (
    <div className={classes.container}>
      <Typography>{`${specialty}`}</Typography>
      <BadgedButton
        containerStyle={classes.badgedButtonStyle}
        iconWidth={12}
        iconHeight={12}
        iconName="trash"
        fill={theme.palette.error.main}
        onClick={handleOnDelete}
      />
    </div>
  );
};

export default SpecialtiesItem;
