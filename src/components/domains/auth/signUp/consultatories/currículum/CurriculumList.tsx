import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import CurriculumItem from "./CurriculumItem";

interface Props {
  curriculums: string[];
  onDelete: (curriculum: string) => void;
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
  listingStyle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  bullet: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "100%",
    marginRight: theme.spacing(2),
    background: theme.palette.action.active,
  },
});

const CurriculumList = ({ curriculums, onDelete }: Props) => {
  const classes = styles();

  const noEmptyCurriculum = useMemo(() => curriculums.filter((a) => a !== ""), [
    curriculums,
  ]);

  return (
    <>
      <Typography className={classes.titleStyle}>
        {STRINGS.signUp.CURRICULUM_DESCRIPTION}
      </Typography>
      {noEmptyCurriculum.map((curriculum: string) => {
        const key = Math.random();
        return (
          <div className={classes.listingStyle}>
            <div className={classes.bullet} />
            <CurriculumItem
              key={key}
              curriculum={curriculum}
              onDelete={onDelete}
            />
          </div>
        );
      })}
    </>
  );
};

export default CurriculumList;
