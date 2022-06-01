import React from "react";
import Snackbar from "./Snackbar";
import { useAlertSelector } from "../../modules/utils/error/handleError";

const SnackbarContainer = () => {
  const { alerts } = useAlertSelector();

  return <Snackbar alerts={alerts} />;
};

export default SnackbarContainer;
