/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button,
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import LoadingWrapper from "../../../LoadingWrapper";

const useStyles = makeStyles((theme) =>
  createStyles({
    templateLabel: {
      display: "flex",
      justifyContent: "center",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.primary.main}`,
    },
    input: {
      display: "none",
    },
  }),
);

interface Props {
  downLoading: boolean;
  importing: boolean;
  templateIndex: number;
  onCreateNewPatient: () => void;
  onImportPatient: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadTemplate: (templateNumber: number) => void;
}

export default function NewCustomerPopPanel({
  downLoading,
  importing,
  templateIndex,
  onCreateNewPatient,
  onImportPatient,
  onDownloadTemplate,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <PrimaryButton
        label={STRINGS.generals.NEW_PATIENT}
        onClick={onCreateNewPatient}
      />
      <input
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onImportPatient}
      />
      <label htmlFor="contained-button-file">
        <LoadingWrapper loading={importing}>
          <Button color="primary" component="span" disabled={importing}>
            {STRINGS.generals.IMPORT_PATIENT}
          </Button>
        </LoadingWrapper>
      </label>
      <Divider />
      <div className={classes.templateLabel}>
        <Typography>{STRINGS.generals.TEMPLATE}</Typography>
      </div>
      <PrimaryButton
        loading={templateIndex === 1 && downLoading}
        disabled={downLoading}
        label={STRINGS.generals.DOWNLOAD_TEMPLATE_1}
        onClick={() => onDownloadTemplate(1)}
      />
      <PrimaryButton
        loading={templateIndex === 2 && downLoading}
        disabled={downLoading}
        label={STRINGS.generals.DOWNLOAD_TEMPLATE_2}
        onClick={() => onDownloadTemplate(2)}
      />
    </div>
  );
}
