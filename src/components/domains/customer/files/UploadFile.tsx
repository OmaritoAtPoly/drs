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
  onImportFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  localBase64?: Schemas.ResultFileRequest;
  accept?: string;
}

const UploadFile = ({ onImportFile, loading, localBase64, accept }: Props) => {
  const classes = useStyles();

  return (
    <div>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={onImportFile}
        accept={
          accept ||
          ".xlsx, .xls, .csv, .png, .jpg, jpeg,.doc,.docx,application/pdf, application/msword"
        }
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

export default UploadFile;
