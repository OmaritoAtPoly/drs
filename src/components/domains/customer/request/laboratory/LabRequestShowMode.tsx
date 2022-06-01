/* eslint-disable no-confusing-arrow */
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../../../utils/strings";
import ItemDiagnosisShowMode from "../diagnosisPanel/ItemDiagnosisShowMode";
import NoItemToShow from "../NoItemToShow";
import ItemRequestShowMode from "../requestPanel/ItemRequestShowMode";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    diagnosisTitleStyle: {
      paddingBlock: theme.spacing(1),
    },
    actionSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    saveButton: {
      fontWeight: "bold",
    },
  }),
);

interface Props {
  labRequest: Schemas.LaboratoryRequestRequest;
  onEdit?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LabRequestShowMode({
  labRequest,
  onEdit = undefined,
}: Props) {
  const classes = styles();

  const renderDiagnosisList = useCallback(
    () =>
      labRequest.diagnoses ? (
        labRequest.diagnoses.map((diagnoses, index) => (
          <ItemDiagnosisShowMode
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            label={diagnoses.description || ""}
            definitive={diagnoses.definitive}
            index={index}
            internCode={diagnoses.code}
            notes={diagnoses.notes}
          />
        ))
      ) : (
        <div />
      ),
    [labRequest.diagnoses],
  );

  const renderRequestList = useCallback(
    () =>
      labRequest.items ? (
        labRequest.items.map((request, index) => (
          <ItemRequestShowMode
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            label={request.description || ""}
            index={index}
            internCode={request.examCode}
            amount={request.quantity || 0}
            notes={request.notes}
          />
        ))
      ) : (
        <div />
      ),
    [labRequest.items],
  );

  const renderNoSHowItem = useCallback(
    (label: string) => <NoItemToShow value={label} />,
    [],
  );

  return (
    <div className={classes.container}>
      <div>
        <div>
          <Typography className={classes.diagnosisTitleStyle}>
            {STRINGS.buttonGrid.DIAGNOSIS}
          </Typography>
          {labRequest.diagnoses && labRequest.diagnoses.length <= 0
            ? renderNoSHowItem("diagnóstico")
            : renderDiagnosisList()}
        </div>

        <div>
          <Typography className={classes.diagnosisTitleStyle}>
            {STRINGS.buttonGrid.REQUESTS}
          </Typography>
          {labRequest.items && labRequest.items.length <= 0
            ? renderNoSHowItem("pedidos")
            : renderRequestList()}
        </div>
      </div>
      <div className={classes.actionSection}>
        <Button
          className={classes.saveButton}
          variant="text"
          color="primary"
          onClick={onEdit}>
          {STRINGS.generals.EDIT}
        </Button>
      </div>
    </div>
  );
}
