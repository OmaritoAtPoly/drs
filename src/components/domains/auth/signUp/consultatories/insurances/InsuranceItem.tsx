import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import BadgedButton from "../../../../../buttons/BadgedButton";

interface Props {
  insurance: string;
  onDelete: (insurance: string) => void;
}
const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  badgedButtonStyle: {
    height: "30px",
    display: "flex",
    justifyContent: "center",
  },
  titleStyle: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "30px",
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: "bold",
  },
});

const InsuranceItem = ({ insurance, onDelete }: Props) => {
  const classes = styles();

  const handleOnDelete = useCallback(() => {
    if (insurance) onDelete(insurance);
  }, [insurance, onDelete]);

  return (
    <div className={classes.container}>
      <Typography>
        {`${insurance}`}
      </Typography>
      <BadgedButton containerStyle={classes.badgedButtonStyle} iconWidth={15} iconName="trash" fill={theme.palette.error.main} onClick={handleOnDelete} />
    </div>
  );
};

export default InsuranceItem;
