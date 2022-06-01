/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  createStyles,
  Icon,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import WizardAccordion from "../../accordion/WizardAccordion";
import BadgedButton from "../../buttons/BadgedButton";
import PrimaryButton from "../../buttons/PrimaryButton";
import CardLayout from "../../cards/CardLayout";
import LabeledDialog from "../../dialogs/LabeledDialog";
import AdjustAccountAccordion from "./AdjustAccountAccordion";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      justifyContent: "space-between",
    },
    button1: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      height: "100%",
      maxWidth: "100px",
      maxHeight: "100px",
      minWidth: "100px",
      minHeight: "100px",
    },
    button2: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
      height: "100%",
      maxWidth: "100px",
      maxHeight: "100px",
      minWidth: "100px",
      minHeight: "100px",
    },
    cancelButton: {
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: theme.spacing(3),
      flexWrap: "wrap",
      paddingInline: theme.spacing(3),
    },
    full: {
      width: "100%",
    },

    label: {
      // Aligns the content of the button vertically.
      flexDirection: "column",
    },
    button: {
      height: 95, // setting height/width is optional
    },
  }),
);

interface Props {
  open: boolean;
  handleShow: () => void;
}

export default function AdjustAccountDialog({ open, handleShow }: Props) {
  const classes = useStyles();

  const renderActionPanel = useCallback(
    () => (
      <BadgedButton
        onClick={handleShow}
        fill={theme.palette.error.dark}
        iconName="closeIcon"
        iconWidth={15}
        iconHeight={15}
      />
    ),
    [handleShow],
  );

  return (
    <LabeledDialog
      label={STRINGS.generals.ADJUST_ACCOUNT}
      actionPanel={renderActionPanel()}
      open={open}
      contentClassName={classes.container}
      handleShow={handleShow}>
      <AdjustAccountAccordion handleShow={handleShow} />
    </LabeledDialog>
  );
}
