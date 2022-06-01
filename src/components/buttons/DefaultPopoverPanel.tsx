import { Button, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface Props {
  firstItemTitle: string;
  secondItemTitle: string;
  onFirstItemClick: () => void;
  onSecondItemClick: () => void;
  handleClose?: () => JSX.Element;
}

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    // borderRadius: theme.spacing(1),
    border: "2px solid #D6E3F3",
  },
}));

export default function DefaultPopoverPanel({
  firstItemTitle,
  secondItemTitle,
  onFirstItemClick,
  onSecondItemClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClose,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <Button color="primary" onClick={onFirstItemClick}>
        {firstItemTitle}
      </Button>
      <Button color="primary" onClick={onSecondItemClick}>
        {secondItemTitle}
      </Button>
    </div>
  );
}
