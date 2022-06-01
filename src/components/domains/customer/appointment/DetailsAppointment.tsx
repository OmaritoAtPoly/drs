import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import ActualIllnessContainer from "../../../../containers/customer/newConsult/ActualIllnessContainer";
import AnalysisDiagnosePanelContainer from "../../../../containers/customer/newConsult/AnalysisDiagnosePanelContainer";
import PhysicalExamContainer from "../../../../containers/customer/newConsult/PhysicalExamContainer";
import TreatmentPlanContainer from "../../../../containers/customer/newConsult/TreatmentPlanContainer";
import VitalSignsContainer from "../../../../containers/customer/newConsult/VitalSignsContainer";

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
      top: 180,
      left: 48,
    },
    panelsContainer: {
      marginTop: 160,
    },
    profileInfo: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      backgroundColor: "white",
      position: "fixed",
      marginTop: "-170px",
      height: 100,
      padding: "10px",
      zIndex: 100,
    },
    max: {
      maxHeight: 50,
    },
  }),
);

interface Props {
  appointmentId?: string;
}

function DetailsAppointment({ appointmentId }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {appointmentId && (
        <>
          <ActualIllnessContainer readOnly appointmentId={appointmentId} />
          <VitalSignsContainer readOnly appointmentId={appointmentId} />
          <PhysicalExamContainer readOnly appointmentId={appointmentId} />
          <AnalysisDiagnosePanelContainer
            readOnly
            appointmentId={appointmentId}
          />
          <TreatmentPlanContainer readOnly appointmentId={appointmentId} />
        </>
      )}
    </div>
  );
}

export default DetailsAppointment;
