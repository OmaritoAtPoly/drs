import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../utils/strings";
import Icon from "../../../Icon/Icon";
import LoadingWrapper from "../../../LoadingWrapper";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  startIcon: {
    alignItems: "center",
    display: "flex",
  },
});

interface Props {
  onImportConsentFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  localBase64?: Schemas.ResultFileRequest;
}

const UploadConsentFile = ({
  onImportConsentFile,
  loading,
  localBase64,
}: Props) => {
  const classes = useStyles();

  return (
    <div>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={onImportConsentFile}
        accept=".doc,.docx,application/pdf, application/msword"
      />
      <label htmlFor="contained-button-file">
        <LoadingWrapper loading={loading}>
          <Button
            startIcon={<Icon className={classes.startIcon} name="uploadIcon" />}
            color="primary"
            component="span"
            disabled={loading}>
            {localBase64?.name || STRINGS.generals.UPLOAD_FILE}
          </Button>
        </LoadingWrapper>
      </label>
    </div>
  );
};

export default UploadConsentFile;
