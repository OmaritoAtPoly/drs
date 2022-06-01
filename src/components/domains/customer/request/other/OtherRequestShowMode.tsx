/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-confusing-arrow */
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
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
  otherRequest: Schemas.OtherRequestResponse;
  onEdit?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function OtherRequestShowMode({
  otherRequest,
  onEdit = undefined,
}: Props) {
  const classes = styles();

  const requests = useMemo<any[]>(() => {
    const tempRequest = [] as any[];
    if (otherRequest && otherRequest.items) {
      // eslint-disable-next-line array-callback-return
      otherRequest.items.map((rqt) => {
        const index = tempRequest.findIndex(
          (tmpRequest) => rqt.code === tmpRequest.code,
        );
        if (index === -1) {
          tempRequest.push({ ...rqt, quantity: rqt.quantity });
        } else {
          tempRequest[index] = {
            ...tempRequest[index],
            amount: tempRequest[index].amount + 1,
          };
        }
      });
    }
    return tempRequest;
  }, [otherRequest]);

  const renderDiagnosisList = useCallback(
    () =>
      otherRequest.diagnoses ? (
        otherRequest.diagnoses.map((diagnoses: any, index: number) => (
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
    [otherRequest.diagnoses],
  );

  const renderRequestList = useCallback(
    () =>
      requests.length > 0 ? (
        requests.map((request, index) => (
          <ItemRequestShowMode
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            label={request.description || ""}
            index={index}
            internCode={request.code}
            amount={request.quantity}
            notes={request.notes}
          />
        ))
      ) : (
        <div />
      ),
    [requests],
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
          {otherRequest.diagnoses && otherRequest.diagnoses.length <= 0
            ? renderNoSHowItem("diagnóstico")
            : renderDiagnosisList()}
        </div>

        <div>
          <Typography className={classes.diagnosisTitleStyle}>
            {STRINGS.buttonGrid.REQUESTS}
          </Typography>
          {otherRequest.items && otherRequest.items.length <= 0
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
