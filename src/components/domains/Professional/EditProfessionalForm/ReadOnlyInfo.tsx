/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../../styles/theme";
import { EMAIL_INFO_ECLINIQ } from "../../../../utils/constants";
import STRINGS from "../../../../utils/strings";

const styles = makeStyles({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: theme.palette.grey[700],
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    color: theme.palette.grey[500],
  },
  ad: {
    fontSize: 12,
    color: theme.palette.primary.main,
    maxWidth: 400,
    textAlign: "center",
  },
  adBold: {
    fontWeight: "bold",
  },
});
interface Props {
  values: Schemas.ProfessionalRequest;
  professions: Schemas.ProfessionResponse[];
  professionalEmail: string;
}

export default function ReadOnlyInfo({ values, professions, professionalEmail }: Props) {
  const classes = styles();

  return (
    <div className={classes.center}>
      <>
        <Typography
          className={classes.title}
          color="textSecondary"
          display="block"
          variant="caption">
          {STRINGS.signUp.MAIN_EMAIL}
        </Typography>
        <Typography
          className={classes.subTitle}
          color="textSecondary"
          display="block"
          variant="caption">
          {professionalEmail}
        </Typography>
      </>
      <>
        <Typography
          className={classes.title}
          color="textSecondary"
          display="block"
          variant="caption">
          {STRINGS.generals.PROFESSION}
        </Typography>
        <Typography
          className={classes.subTitle}
          color="textSecondary"
          display="block"
          variant="caption">
          {professions?.find((p) => p.code === values.profession)?.name || ""}
        </Typography>
      </>
      <>
        <Typography
          className={classes.title}
          color="textSecondary"
          display="block"
          variant="caption">
          {STRINGS.professionalProfile.LEGAL_ID}
        </Typography>
        <Typography
          className={classes.subTitle}
          color="textSecondary"
          display="block"
          variant="caption">
          {values.professionalID}
        </Typography>
      </>
      <Typography
        className={classes.ad}
        color="textSecondary"
        display="block"
        variant="caption">
        {STRINGS.professionalProfile.TO_CHANGE_DATA_SEND_EMAIL}
        <Link target="_blank" href={`mailto:${EMAIL_INFO_ECLINIQ}`}>
          <Typography
            className={`${classes.ad} ${classes.adBold}`}
            color="textSecondary"
            display="block"
            variant="caption">
            {STRINGS.generals.EMAIL}
          </Typography>
        </Link>
      </Typography>
    </div>
  );
}
