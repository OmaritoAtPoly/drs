import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useMemo } from "react";
import ScrollableTabs from "../../components/tabs/ScrollableTabs";
import ActionPanelNewAppointmentContainer from "../../containers/customer/appointment/ActionPanelNewAppointmentContainer";
import BackgroundContainer from "../../containers/customer/background/BackgroundContainer";
import ActualIllnessContainer from "../../containers/customer/newConsult/ActualIllnessContainer";
import AnalysisDiagnosePanelContainer from "../../containers/customer/newConsult/AnalysisDiagnosePanelContainer";
import OrderPaymentContainer from "../../containers/customer/newConsult/OrderPaymentContainer";
import PatientAppointmentPanelContainer from "../../containers/customer/newConsult/PatientAppointmentPanelContainer";
import PhysicalExamContainer from "../../containers/customer/newConsult/PhysicalExamContainer";
import TreatmentPlanContainer from "../../containers/customer/newConsult/TreatmentPlanContainer";
import VitalSignsContainer from "../../containers/customer/newConsult/VitalSignsContainer";
import PatientAvatarRowPanelContainer from "../../containers/customer/profile/info/PatientAvatarRowPanelContainer";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";
import STRINGS from "../../utils/strings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    panelContainer: {
      marginTop: theme.spacing(2),
    },
    endPanelContainer: {
      paddingBottom: theme.spacing(2),
    },
    tabsContainer: {
      top: 190,
      left: 48,
    },
    panelsContainer: {
      marginTop: 210,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      backgroundColor: "white",
      position: "fixed",
      marginTop: "-210px",
      height: 140,
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      marginLeft: "-8px",
      zIndex: 100,
    },
    max: {
      maxHeight: 50,
    },
  }),
);

function NewConsultPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const onIndexChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const { isBasicSubscriptionPlan } = useProfileCacheSelector();
  const hiddenPanel = useMemo(() => value === 5 || value === 6, [value]);
  const hiddenPanelBackground = useMemo(() => value !== 5, [value]);
  const hiddenPanelHistoryAppointment = useMemo(() => value !== 6, [value]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <PatientAvatarRowPanelContainer />
        <ActionPanelNewAppointmentContainer />
      </div>
      <ScrollableTabs
        tabs={[
          {
            label: "ENFERMEDAD ACTUAL",
            hidden: hiddenPanel,
            panel: (
              <div key="scroll-1" className={classes.panelContainer}>
                <ActualIllnessContainer />
              </div>
            ),
          },
          {
            label: "SIGNOS VITALES",
            hidden: hiddenPanel,
            panel: (
              <div key="scroll-2" className={classes.panelContainer}>
                <VitalSignsContainer />
              </div>
            ),
          },
          {
            label: "EXAMEN FÍSICO",
            hidden: hiddenPanel,
            panel: (
              <div key="scroll-3" className={classes.panelContainer}>
                <PhysicalExamContainer />
              </div>
            ),
          },
          {
            label: "ANÁLISIS - DIAGNÓSTICO",
            hidden: hiddenPanel,
            panel: (
              <div key="scroll-4" className={classes.panelContainer}>
                <AnalysisDiagnosePanelContainer />
              </div>
            ),
          },
          {
            label: "PLAN-TRATAMIENTO",
            hidden: hiddenPanel,
            panel: (
              <div key="scroll-5" className={classes.panelContainer}>
                <TreatmentPlanContainer />
              </div>
            ),
          },
          {
            label: STRINGS.background.BACKGROUND,
            hidden: hiddenPanelBackground,
            panel: (
              <div key="scroll-6" className={classes.panelContainer}>
                <BackgroundContainer />
              </div>
            ),
          },
          {
            label: STRINGS.appointment.APPOINTMENT_HISTORY,
            hidden: hiddenPanelHistoryAppointment,
            panel: (
              <div key="scroll-7" className={classes.panelContainer}>
                <PatientAppointmentPanelContainer />
              </div>
            ),
          },
          {
            label: STRINGS.appointment.PAYMENTS,
            hidden: hiddenPanel || isBasicSubscriptionPlan,
            hiddenTab: isBasicSubscriptionPlan,
            panel: (
              <div
                key="scroll-8"
                className={`${classes.panelContainer} ${classes.endPanelContainer}`}>
                <OrderPaymentContainer />
              </div>
            ),
          },
        ]}
        index={value}
        onIndexChange={onIndexChange}
        scrollWidthOffset={-255}
        position="fixed"
        tabsContainerClassName={classes.tabsContainer}
        panelsContainerClassName={classes.panelsContainer}
      />
    </div>
  );
}

export default NewConsultPage;
