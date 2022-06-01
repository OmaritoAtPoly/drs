import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import { ValueAndLabelType } from "../../../../../../utils/types";
import LanguagesItem from "./LanguagesItem";

interface Props {
  languages: string[];
  onDelete: (language: string) => void;
  allLanguages: ValueAndLabelType[];
}

const styles = makeStyles({
  root: {
    paddingTop: "15px",
  },
  titleStyle: {
    display: "flex",
    color: theme.palette.primary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
});

const LanguagesList = ({ languages, allLanguages, onDelete }: Props) => {
  const classes = styles();
  const noEmptyInsurances = useMemo(() => languages.filter((a) => a !== ""), [
    languages,
  ]);

  const languageLabel = useMemo(
    () =>
      noEmptyInsurances.map((value) => {
        const find = allLanguages.find((f) => f.value === value);
        return find ? find.label : "";
      }),
    [allLanguages, noEmptyInsurances],
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.titleStyle}>
        {STRINGS.generals.LANGUAGES}
      </Typography>
      {languageLabel.map((language) => {
        const key = Math.random();
        return (
          <LanguagesItem language={language} key={key} onDelete={onDelete} />
        );
      })}
    </div>
  );
};

export default LanguagesList;
