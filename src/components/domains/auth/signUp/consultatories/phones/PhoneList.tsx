import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import PhoneItem from "./PhoneItem";

interface Props {
  phones: Schemas.PhoneRequest[];
  onDelete: (phone: string) => void;
}

const styles = makeStyles({
  root: {
    paddingTop: "15px",
  },
  titleStyle: {
    display: "flex",
    // justifyContent: "flex-start",
    color: theme.palette.primary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
});

const PhoneList = ({ phones, onDelete }: Props) => {
  const classes = styles();

  const noEmptyPhones = useMemo(() => phones.filter((a) => a.number !== ""), [
    phones,
  ]);

  return (
    <div className={classes.root}>
      <Typography className={classes.titleStyle}>
        {STRINGS.signUp.CELL_NUMBER}
      </Typography>
      {noEmptyPhones.map((phone: Schemas.PhoneRequest) => (
        <PhoneItem phone={phone} key={phone.number} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PhoneList;
