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
import AddConsentFormDialog from "./AddConsentFormDialog";

interface Props {
  handleShow: () => void;
  open: boolean;
  consents: Schemas.InformedConsentResponse[];
  loadingConsents?: boolean;
  loadingDownload?: boolean;
  loadingUpload?: boolean;
  onDownloadTemplate: (consent: Schemas.InformedConsentResponse) => () => void;
  loadingDelete?: boolean;
  onDeleteTemplate: (consent: Schemas.InformedConsentResponse) => () => void;
  uploadConsentFile: (value: string) => void;
  uploadLocalConsentFile: (
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
export default function SearchConsentTemplate({
  handleShow,
  open,
  consents,
  loadingConsents,
  onDownloadTemplate,
  loadingDownload,
  loadingDelete,
  onDeleteTemplate,
  uploadConsentFile,
  uploadLocalConsentFile,
  handleShowAddForm,
  openAddForm,
  loadingUpload,
  localBase64,
}: Props) {
  const classes = useStyles();

  const renderRow = useCallback(
    (consent: Schemas.InformedConsentResponse) => (
      <ListItem id="list-item-short-device" button alignItems="flex-start">
        <ListItemText primary={consent.procedureName} />
        <div>
          <BadgedButton
            iconName="print"
            circular
            onClick={onDownloadTemplate(consent)}
            loading={loadingDownload}
            iconHeight={15}
            iconWidth={15}
          />
          <BadgedButton
            iconName="delete"
            circular
            onClick={onDeleteTemplate(consent)}
            loading={loadingDelete}
            iconHeight={15}
            iconWidth={15}
          />
        </div>
      </ListItem>
    ),
    [loadingDelete, loadingDownload, onDeleteTemplate, onDownloadTemplate],
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
      label={STRINGS.buttonGrid.INFORM_CONSENTS}
      open={open}
      actionPanel={renderActionPanel}
      handleShow={handleShow}>
      <div className={classes.container}>
        <div>
          <InfiniteScrollList
            data={consents || []}
            loading={loadingConsents}
            renderRow={renderRow}
          />
        </div>
      </div>
      <AddConsentFormDialog
        handleSubmitForm={uploadConsentFile}
        handleUploadConsentFile={uploadLocalConsentFile}
        uploadingLoading={loadingUpload}
        open={openAddForm || false}
        handleShow={handleShowAddForm}
        localBase64={localBase64}
      />
    </LabeledDialog>
  );
}
