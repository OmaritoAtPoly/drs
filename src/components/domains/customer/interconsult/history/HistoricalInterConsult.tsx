/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles, Theme } from "@material-ui/core";
import React, { useCallback } from "react";
import HistoricalReceivedInterConsultationContainer from "../../../../../containers/customer/interconsult/HisotricaReceivedInterConsultationContainer";
import HistoricalInterConsultActionPanel from "../../../../../containers/customer/interconsult/HistoricalInterConsultActionPanel";
import HistoricalMadeInterConsultationContainer from "../../../../../containers/customer/interconsult/HistoricalMadeInterConsultationContainer";
import { useCurrentInterconsultationToEditCacheSelector } from "../../../../../modules/customer/interconsult/madeInterConsultationCacheSelector";
import STRINGS from "../../../../../utils/strings";
import LabeledDialog from "../../../../dialogs/LabeledDialog";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = makeStyles((theme: Theme) => ({
  row: { display: "flex", justifyContent: "space-between" },
  col: { display: "flex", flex: 1 },
}));

interface Props {
  open: boolean;
  onAdd: () => void;
  handleShow: () => void;
  onInterConsultSheetClicked: (
    interConsult: Schemas.InterConsultationResp,
  ) => void;
  onMakeReportClicked: (interConsult: Schemas.InterConsultationResp) => void;
  handleOnMadeByMeReportClicked: (
    interConsult: Schemas.InterConsultationResp,
  ) => void;
}

export default function HistoricalInterConsult({
  open,
  onAdd,
  handleShow,
  onInterConsultSheetClicked,
  onMakeReportClicked,
  handleOnMadeByMeReportClicked,
}: Props) {
  const classes = styles();
  const {
    saveCurrentInterconsultationToEdit,
  } = useCurrentInterconsultationToEditCacheSelector();

  const handleCreateNewInterConsult = useCallback(() => {
    saveCurrentInterconsultationToEdit(undefined);
    onAdd();
  }, [onAdd, saveCurrentInterconsultationToEdit]);

  return (
    <LabeledDialog
      label={STRINGS.interconsult.HISTORICAL_INTERCONSULT}
      open={open}
      handleShow={handleShow}
      actionPanel={
        <HistoricalInterConsultActionPanel
          onAdd={handleCreateNewInterConsult}
          onClose={handleShow}
        />
      }>
      <div className={classes.row}>
        <div className={classes.col}>
          <HistoricalReceivedInterConsultationContainer
            handleOnInterConsultSheetClicked={onInterConsultSheetClicked}
            onMakeReportClicked={onMakeReportClicked}
          />
        </div>
        <div className={classes.col}>
          <HistoricalMadeInterConsultationContainer
            handleOnInterConsultSheetClicked={onInterConsultSheetClicked}
            handleOnMadeByMeReportClicked={handleOnMadeByMeReportClicked}
            onAdd={onAdd}
          />
        </div>
      </div>
    </LabeledDialog>
  );
}
