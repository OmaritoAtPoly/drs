import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";
import LabeledButton from "../../components/buttons/LabeledButton";
import CardLayout from "../../components/cards/CardLayout";
import ConfirmModal from "../../components/modals/ConfirmModal";
import WrapperPage from "../../components/wrappers/WrapperPage";
import AppointmentActionsDialogContainer from "../../containers/appointment/AppointmentActionsDialogContainer";
import PatientAppointmentContainer from "../../containers/customer/appointment/PatientAppointmentContainer";
import BackgroundContainer from "../../containers/customer/background/BackgroundContainer";
import ActiveMedicationsContainer from "../../containers/customer/medications/ActiveMedicationsContainer";
import NewConsultDialogContainer from "../../containers/customer/newConsult/NewConsultDialogContainer";
import VitalSignsContainerCustomerHealth from "../../containers/customer/newConsult/VitalSignsContainerCustomerHealth";
import PatientActionContainer from "../../containers/customer/PatientActionContainer";
import NotesPanelContainer from "../../containers/customer/profile/info/NotesPanelContainer";
import PatientAvatarPanelContainer from "../../containers/customer/profile/info/PatientAvatarPanelContainer";
import PatientInfoContainer from "../../containers/customer/profile/info/PatientInfoContainer";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";
import STRINGS from "../../utils/strings";
import BackgroundAccordionWrapper from "./backgroundAccordionWrapper/BackgroundAccordionWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column-reverse",
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 10,
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        paddingTop: 25,
        paddingLeft: 5,
        paddingRight: 5,
      },
    },
    rightPanel: {
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "25%",
        paddingLeft: 5,
        paddingRight: 5,
      },
    },
    leftPanel: {
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "75%",
        paddingLeft: 5,
        paddingRight: 5,
      },
    },
    mainBanner: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
    },
    mainBannerWithShowInfo: {
      display: "flex",
      flexDirection: "column",
    },
    medicamentPanel: {
      width: "100%",
      marginTop: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(0),
        marginLeft: theme.spacing(1),
        width: "45%",
      },
    },
    medicamentPanelWithShowInfo: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    profilePanel: {
      height: 350,
      width: "100%",
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        marginBottom: theme.spacing(0),
        marginRight: theme.spacing(1),
        width: "55%",
      },
    },
    profilePanelWithShowInfo: {
      width: "100%",
      marginBottom: theme.spacing(1),
    },
    profilePanelContent: {
      height: 350,
    },
    patientAction: {
      marginTop: 10,
    },
    panelContainer: {
      marginTop: theme.spacing(2),
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
    infoPanel: {
      display: "flex",
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(2),
    },
    notePanel: {
      display: "flex",
      flex: 1,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #fff",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface Props {
  newConsult: (reason: string[]) => void;
  onPlayIn: (patientId: string, codeAppointment: string) => void;
  onFinish: (patientId: string, codeAppointment: string) => void;
  onCancel: (patientId: string, codeAppointment: string) => void;
  onReschedule: (codeAppointment: string) => void;
  loadingFinish?: boolean;
  loadingDelete?: boolean;
  showAppointmentItemDialog?: boolean;
  handleShowAppointmentItemDialog: () => void;
}

function PatientPage({
  newConsult,
  onPlayIn,
  onFinish,
  onCancel,
  onReschedule,
  loadingFinish,
  loadingDelete,
  showAppointmentItemDialog,
  handleShowAppointmentItemDialog,
}: Props) {
  const classes = useStyles();
  const [showInfo, setShowInfo] = useState(false);
  const [showNewConsultDialog, setShowNewConsultDialog] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string | undefined>(
    undefined,
  );
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  const handleShowInfo = useCallback(() => {
    setShowInfo(!showInfo);
  }, [showInfo]);

  const onPlayInLocal = useCallback(() => {
    customerId && appointmentId && onPlayIn(customerId, appointmentId);
  }, [appointmentId, customerId, onPlayIn]);

  const onFinishLocal = useCallback(() => {
    customerId && appointmentId && onFinish(customerId, appointmentId);
  }, [appointmentId, customerId, onFinish]);

  const onCancelLocal = useCallback(() => {
    customerId && appointmentId && onCancel(customerId, appointmentId);
    handleOpenModal();
  }, [appointmentId, customerId, handleOpenModal, onCancel]);

  const handleOnReschedule = useCallback(() => {
    appointmentId && onReschedule(appointmentId);
    handleOpenModal();
  }, [appointmentId, handleOpenModal, onReschedule]);

  const onClickIncomingItem = useCallback(
    (patientId: string, codeAppointment: string) => () => {
      setAppointmentId(codeAppointment);
      setCustomerId(patientId);
      handleShowAppointmentItemDialog();
    },
    [handleShowAppointmentItemDialog],
  );

  const onClickHistoryItem = useCallback(
    (patientId: string, codeAppointment: string) => () => {
      onPlayIn(patientId, codeAppointment);
    },
    [onPlayIn],
  );

  const handleShowNewConsultDialog = useCallback(() => {
    setShowNewConsultDialog(!showNewConsultDialog);
  }, [showNewConsultDialog]);

  const { isAssistant } = useProfileCacheSelector();
  return (
    <WrapperPage>
      <div className={classes.container}>
        <div id="patient-left-panel" className={classes.leftPanel}>
          <div
            id="patient-left-panel-main-banner"
            className={
              showInfo ? classes.mainBannerWithShowInfo : classes.mainBanner
            }>
            <div
              id="patient-left-panel-profile"
              className={
                showInfo
                  ? classes.profilePanelWithShowInfo
                  : classes.profilePanel
              }>
              <CardLayout className={classes.profilePanelContent}>
                <div className={classes.avatarPanel}>
                  <PatientAvatarPanelContainer
                    handleShowInfo={handleShowInfo}
                    showInfo={showInfo}
                  />
                </div>
                {showInfo && (
                  <div className={classes.infoPanel}>
                    <PatientInfoContainer />
                  </div>
                )}
                <div className={classes.notePanel}>
                  <NotesPanelContainer />
                </div>
              </CardLayout>
            </div>
            <div
              id="patient-left-panel-active-medicament"
              className={
                showInfo
                  ? classes.medicamentPanelWithShowInfo
                  : classes.medicamentPanel
              }>
              <ActiveMedicationsContainer />
            </div>
          </div>
          <div className={classes.panelContainer}>
            <VitalSignsContainerCustomerHealth />
          </div>
          <div className={classes.panelContainer}>
            <BackgroundContainer />
          </div>
          <div className={classes.panelContainer}>
            <BackgroundAccordionWrapper />
          </div>
        </div>
        <div id="patient-right-panel" className={classes.rightPanel}>
          <LabeledButton
            buttonLabel={STRINGS.generals.NEW_APPOINTMENT_UPPERCASE}
            iconName="chat"
            disable={isAssistant()}
            onClick={isAssistant() ? () => {} : handleShowNewConsultDialog}
          />
          <div className={classes.patientAction}>
            <PatientActionContainer />
          </div>
          <PatientAppointmentContainer
            onClickIncomingItem={onClickIncomingItem}
            onClickHistoryItem={onClickHistoryItem}
          />
        </div>
      </div>
      <NewConsultDialogContainer
        open={showNewConsultDialog}
        handleShow={handleShowNewConsultDialog}
        onBegin={newConsult}
      />
      <AppointmentActionsDialogContainer
        open={showAppointmentItemDialog || false}
        handleShow={handleShowAppointmentItemDialog}
        onPlayIn={onPlayInLocal}
        onFinish={onFinishLocal}
        onCancel={handleOpenModal}
        onReschedule={handleOnReschedule}
        loadingFinish={loadingFinish}
        loadingDelete={loadingDelete}
      />
      <ConfirmModal
        title={STRINGS.appointment.DO_YOU_WANT_TO_CANCEL_THE_APPOINTMENT}
        open={openModal}
        handleShow={handleOpenModal}
        onConfirm={onCancelLocal}
      />
    </WrapperPage>
  );
}

export default PatientPage;
