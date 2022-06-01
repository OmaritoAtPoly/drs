import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import InsuranceItem from "./InsuranceItem";

interface Props {
  insurances: string[];
  onDelete: (insurance: string) => void;
}

const styles = makeStyles({
  titleStyle: {
    display: "flex",
    color: theme.palette.primary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
});

const InsuranceList = ({ insurances, onDelete }: Props) => {
  const classes = styles();
  const noEmptyInsurances = useMemo(() => insurances.filter((a) => a !== ""), [
    insurances,
  ]);

  return (
    <>
      <Typography className={classes.titleStyle}>
        {STRINGS.signUp.ASSOCIATED_INSURANCES}
      </Typography>
      {noEmptyInsurances.map((insurance) => {
        const key = Math.random();
        return (
          <InsuranceItem insurance={insurance} key={key} onDelete={onDelete} />
        );
      })}
    </>
  );
};

export default InsuranceList;
