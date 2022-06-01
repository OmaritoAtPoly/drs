import React, { useCallback, useState } from "react";
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PrimaryButton from "../../buttons/PrimaryButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cont: {
      display: "flex",
      flexDirection: "row",
    },
    question: {
      lineHeight: "20px",
      color: theme.palette.primary.main,
    },
    answer: {
      display: "flex",
      marginLeft: theme.spacing(2),
      marginTop: -theme.spacing(1),
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
  }),
);

interface Props {
  faqType: Schemas.FaqData;
}

const ItemFaqs = ({ faqType }: Props) => {
  const classes = useStyles();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const handleShowAnswer = useCallback(() => {
    setShowAnswer(!showAnswer);
  }, [showAnswer]);

  return (
    <div>
      <PrimaryButton
        classes={{ root: classes.button }}
        onClick={handleShowAnswer}
        className={classes.question}
        label={`¿${faqType.question}?` || ""}
      />
      {showAnswer && (
        <Typography className={classes.answer}>{faqType.answer}</Typography>
      )}
    </div>
  );
};

export default ItemFaqs;
