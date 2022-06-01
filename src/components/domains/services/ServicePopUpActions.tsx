import { Button, createStyles, Divider, makeStyles } from "@material-ui/core";
import React from "react";
import PrimaryButton from "../../buttons/PrimaryButton";
import LoadingWrapper from "../../LoadingWrapper";
import STRINGS from "../../../utils/strings";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.primary.main}`,
      maxWidth: "200px",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    input: {
      display: "none",
    },
    button: {
      width: "100%",
      textAlign: "center",
    },
  }),
);

interface Props {
  importing: boolean;
  downloading: boolean;
  handleOnCreateNewService: () => void;
  handleOnImportService: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnDownloadTemplate: () => void;
}

export default function ServicePopUpActions({
  importing,
  downloading,
  handleOnCreateNewService,
  handleOnImportService,
  handleOnDownloadTemplate,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <PrimaryButton
        containerStyle={classes.button}
        label={STRINGS.service.NEW_SERVICE}
        onClick={handleOnCreateNewService}
      />
      <input
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleOnImportService}
      />
      <label htmlFor="contained-button-file">
        <LoadingWrapper loading={importing}>
          <Button
            className={classes.button}
            color="primary"
            component="span"
            disabled={importing}>
            {STRINGS.service.IMPORT_SERVICES}
          </Button>
        </LoadingWrapper>
      </label>
      <Divider />
      <PrimaryButton
        containerStyle={classes.button}
        disabled={downloading}
        loading={downloading}
        label={STRINGS.service.DOWNLOAD_SERVICE_TEMPLATE}
        onClick={handleOnDownloadTemplate}
      />
    </div>
  );
}
