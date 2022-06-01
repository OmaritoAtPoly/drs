import { makeStyles, Theme } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import NotesPanelContainer from "../../../containers/customer/profile/info/NotesPanelContainer";
import PatientAvatarPanelContainer from "../../../containers/customer/profile/info/PatientAvatarPanelContainer";
import PatientInfoContainer from "../../../containers/customer/profile/info/PatientInfoContainer";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import STRINGS from "../../../utils/strings";
import BadgedButton from "../../buttons/BadgedButton";
import PrimaryButton from "../../buttons/PrimaryButton";
import CardLayout from "../../cards/CardLayout";
import LabeledDialog from "../../dialogs/LabeledDialog";

interface Props {
  open: boolean;
  handleShow: () => void;
  onPlayIn: () => void;
  onFinish: () => void;
  onCancel: () => void;
  onReschedule: () => void;
  loadingFinish?: boolean;
  loadingDelete?: boolean;
  showPatient?: boolean;
  patientId?: string;
}

const styles = makeStyles((theme: Theme) => ({
  container: {
    justifyContent: "space-between",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  rootClassName: {
    height: 300,
    flexWrap: "wrap",
  },
  rootClassNamePatient: {
    height: 900,
    flexWrap: "wrap",
    minWidth: "70%",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  infoPanel: {
    display: "flex",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  avatarPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    marginTop: theme.spacing(1),
    width: "50%",
    maxWidth: 300,
    height: "100%",
  },
  profilePanelContent: {
    height: 350,
  },
  notePanel: {
    display: "flex",
    flex: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function AppointmentActionsDialog({
  open,
  handleShow,
  onPlayIn,
  onFinish,
  onCancel,
  onReschedule,
  loadingFinish = false,
  loadingDelete,
  showPatient = false,
  patientId = "",
}: Props) {
  const classes = styles();
  const [showInfo, setShowInfo] = useState(true);

  const handleShowInfo = useCallback(() => {
    setShowInfo(!showInfo);
  }, [showInfo]);

  const { isAssistant } = useProfileCacheSelector();
  return (
    <LabeledDialog
      label={STRINGS.appointment.WHAT_DO_YOU_DO_IN_APPOINTMENT}
      rootClassName={
        showPatient ? classes.rootClassNamePatient : classes.rootClassName
      }
      actionPanel={
        <div>
          <BadgedButton
            onClick={handleShow}
            iconName="closeIcon"
            iconWidth={15}
            iconHeight={15}
          />
        </div>
      }
      open={open}
      contentClassName={classes.container}
      handleShow={handleShow}>
      {showPatient && (
        <CardLayout className={classes.profilePanelContent}>
          <div className={classes.avatarPanel}>
            <PatientAvatarPanelContainer
              handleShowInfo={handleShowInfo}
              showInfo={showInfo}
              patientId={patientId}
            />
          </div>
          {showInfo && (
            <div className={classes.infoPanel}>
              <PatientInfoContainer patientId={patientId} />
            </div>
          )}
          <div className={classes.notePanel}>
            <NotesPanelContainer />
          </div>
        </CardLayout>
      )}
      <div className={classes.actionsContainer}>
        <PrimaryButton
          variant="contained"
          className={classes.button}
          label={STRINGS.appointment.PLAY_IN}
          onClick={onPlayIn}
          disabled={isAssistant()}
        />
        <PrimaryButton
          variant="contained"
          className={classes.button}
          label={STRINGS.generals.FINALIZE}
          onClick={onFinish}
          loading={loadingFinish}
          disabled={isAssistant()}
        />
        <PrimaryButton
          variant="contained"
          className={classes.button}
          label={STRINGS.generals.CANCEL}
          onClick={onCancel}
          loading={loadingDelete}
        />
        <PrimaryButton
          variant="contained"
          className={classes.button}
          label={STRINGS.generals.RESCHEDULE}
          onClick={onReschedule}
        />
      </div>
    </LabeledDialog>
  );
}
