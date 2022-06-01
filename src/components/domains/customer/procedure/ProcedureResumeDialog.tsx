/* eslint-disable react/jsx-one-expression-per-line */
import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CheckBox from "../../../CheckBox";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import Editor from "../../../inputs/Editor";
import ActionProcedureResume from "./ActionProcedureResume";

interface Props {
  open: boolean;
  initialData: Schemas.ProcedureResponse;
  loadingCellAction?: boolean;
  loadingSendEmail?: boolean;
  loadingPrintPdf?: boolean;
  handleShow: () => void;
  onTimeBackAction: () => void;
  onPrintPdf: (requestCode?: string) => void;
  onSendEmail: (requestCode?: string) => void;
  handleCellAction: (requestCode?: string) => void;
  onClose?: boolean;
}

const styles = makeStyles({
  olElement: {
    display: "flex",
    paddingLeft: theme.spacing(1),
    alignItems: "center",
  },
  liElement: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
  },
  optionStyle: {
    display: "flex",
    alignItems: "center",
    width: "20%",
    justifyContent: "space-between",
  },
  procedureTitleStyle: {
    paddingTop: theme.spacing(2),
  },
  procedureDetails: {
    marginTop: -25,
    marginLeft: -10,
  },
  primaryButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const ProcedureResumeDialog = ({
  onSendEmail,
  onPrintPdf,
  handleShow,
  onTimeBackAction,
  handleCellAction,
  open,
  initialData,
  loadingSendEmail,
  loadingPrintPdf,
  loadingCellAction,
  onClose = false,
}: Props) => {
  const classes = styles();

  const procedureDetails = useMemo(
    () => initialData?.details && initialData.details?.map((a) => a),
    [initialData?.details],
  );

  const procedureId = useMemo(() => initialData?.code, [initialData?.code]);

  return (
    <LabeledDialog
      open={open}
      handleShow={handleShow}
      label={STRINGS.procedure.PROCEDURE_RESUME}
      actionPanel={
        <ActionProcedureResume
          procedureId={procedureId}
          onTimeBackAction={onTimeBackAction}
          onPrintPdf={onPrintPdf}
          onSendEmail={onSendEmail}
          handleClose={handleShow}
          loadingSendEmail={loadingSendEmail}
          loadingPrintPdf={loadingPrintPdf}
          handleCellAction={handleCellAction}
          loadingCellAction={loadingCellAction}
        />
      }>
      <div>
        <Typography>{STRINGS.buttonGrid.DIAGNOSIS}</Typography>
        {initialData?.diagnoses &&
          initialData.diagnoses.map((a, ind) => {
            const key = Math.random();
            return (
              <span key={key} className={classes.olElement} id="ol-container">
                <Typography>{ind + 1}-</Typography>
                <span className={classes.liElement}>
                  {a.description}
                  <span
                    id="last-options-container"
                    className={classes.optionStyle}>
                    <Typography>
                      {a.definitive
                        ? STRINGS.buttonGrid.DEFINITIVE
                        : STRINGS.buttonGrid.PRESUMPTIVE}
                    </Typography>
                    <CheckBox checked />
                  </span>
                </span>
              </span>
            );
          })}
        <span>
          <Typography className={classes.procedureTitleStyle}>
            {STRINGS.procedure.PROCEDURE_DETAILS}
          </Typography>
          <div className={classes.procedureDetails}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={procedureDetails && procedureDetails[0]}
              readOnly
            />
          </div>
        </span>
        <span className={classes.primaryButton}>
          {onClose ? (
            <PrimaryButton
              label={STRINGS.generals.CLOSE}
              onClick={handleShow}
              color="primary"
            />
          ) : (
            <PrimaryButton
              label={STRINGS.generals.EDIT}
              onClick={handleShow}
              color="primary"
            />
          )}
        </span>
      </div>
    </LabeledDialog>
  );
};

export default ProcedureResumeDialog;
