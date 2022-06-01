import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import InfiniteScrollList from "../../../lists/InfiniteScrollList";
import AddFilesFormDialog from "./AddFilesFormDialog";

interface Props {
  handleShow: () => void;
  open: boolean;
  files: Schemas.ProfessionalFileResponse[];
  loadingFiles?: boolean;
  loadingDownload?: boolean;
  loadingUpload?: boolean;
  onDownloadTemplate: (file: Schemas.ProfessionalFileResponse) => () => void;
  loadingDelete?: boolean;
  onDeleteTemplate: (file: Schemas.ProfessionalFileResponse) => () => void;
  uploadProfessionalFile: (value: string) => void;
  uploadLocalProfessionalFile: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  handleShowAddForm: () => void;
  openAddForm?: boolean;
  localBase64?: Schemas.ResultFileRequest;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      marginTop: 10,
    },
    search: {
      minWidth: 250,
      marginRight: 3,
    },
    full: {
      width: "100%",
    },
  }),
);
export default function SearchFilesTemplate({
  handleShow,
  open,
  files,
  loadingFiles,
  onDownloadTemplate,
  loadingDownload,
  loadingDelete,
  onDeleteTemplate,
  uploadProfessionalFile,
  uploadLocalProfessionalFile,
  handleShowAddForm,
  openAddForm,
  loadingUpload,
  localBase64,
}: Props) {
  const classes = useStyles();

  const renderRow = useCallback(
    (file: Schemas.ProfessionalFileResponse) => (
      <ListItem id="list-item-short-device" button alignItems="flex-start">
        <ListItemText primary={file.title} />
        <div>
          <BadgedButton
            iconName="openEye"
            circular
            onClick={onDownloadTemplate(file)}
            iconHeight={15}
            iconWidth={15}
          />
          <BadgedButton
            iconName="delete"
            circular
            onClick={onDeleteTemplate(file)}
            iconHeight={15}
            iconWidth={15}
          />
        </div>
      </ListItem>
    ),
    [onDeleteTemplate, onDownloadTemplate],
  );

  const renderActionPanel = useMemo(
    () => (
      <div>
        <BadgedButton
          onClick={handleShowAddForm}
          iconName="add"
          iconWidth={15}
          iconHeight={15}
        />
        <BadgedButton
          onClick={handleShow}
          fill={theme.palette.error.dark}
          iconName="closeIcon"
          iconWidth={15}
          iconHeight={15}
        />
      </div>
    ),
    [handleShow, handleShowAddForm],
  );

  return (
    <LabeledDialog
      label={STRINGS.buttonGrid.FILES}
      open={open}
      actionPanel={renderActionPanel}
      handleShow={handleShow}>
      <div className={classes.container}>
        <div>
          <InfiniteScrollList
            data={files || []}
            loading={loadingFiles || loadingDownload || loadingDelete}
            renderRow={renderRow}
          />
        </div>
      </div>
      <AddFilesFormDialog
        handleSubmitForm={uploadProfessionalFile}
        handleUploadFile={uploadLocalProfessionalFile}
        uploadingLoading={loadingUpload}
        open={openAddForm || false}
        handleShow={handleShowAddForm}
        localBase64={localBase64}
      />
    </LabeledDialog>
  );
}
