/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import { age, fullName } from "../../../../utils/user";
import PrimaryButton from "../../../buttons/PrimaryButton";

import LabeledDialog from "../../../dialogs/LabeledDialog";
import Editor from "../../../inputs/Editor";
import ItemDiagnosisShowMode from "../request/diagnosisPanel/ItemDiagnosisShowMode";
import NoItemToShow from "../request/NoItemToShow";
import ActionCertificatesResume from "./ActionCertificatesResume";

interface Props {
  handleShow: () => void;
  open: boolean;
  initialData: Schemas.CertificateResponse;
  handlePrint: (requestCode?: string) => void;
  handleMailClicked: (requestCode?: string) => void;
  handlePatientCellClicked: (requestCode?: string) => void;
  loadingSendByCell?: boolean;
  loadingSendingByEmail?: boolean;
  loadingPrint?: boolean;
  onHistoryClicked: () => void;
  handleClose?: () => void;
  withDefinitiveDiagnosis: boolean;
  showEditLabel?: boolean;
  customer: Schemas.CustomerData;
}

const styles = makeStyles({
  certificateTitleStyle: {
    paddingBottom: theme.spacing(2),
  },
  primaryButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
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
  box: {
    border: "1px solid #D6E3F3",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    minHeight: theme.spacing(15),
  },
  labelDescriptions: {
    marginTop: 20,
  },
  diagnoses: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 15,
  },
  certificateDetails: {
    marginTop: 30,
  },
});

const CertificateResumeDialog = ({
  handleMailClicked,
  handlePrint,
  handleShow,
  open,
  initialData,
  loadingSendByCell,
  loadingPrint,
  handlePatientCellClicked,
  loadingSendingByEmail,
  onHistoryClicked,
  handleClose,
  withDefinitiveDiagnosis,
  showEditLabel = true,
  customer,
}: Props) => {
  const classes = styles();

  const certificateDetails = useMemo(
    () => initialData?.details && initialData.details?.map((a) => a),
    [initialData?.details],
  );

  const certificateId = useMemo(() => initialData?.code, [initialData?.code]);

  const renderNoSHowItem = useCallback(
    (label: string) => <NoItemToShow value={label} />,
    [],
  );

  const renderDiagnosisList = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      initialData.diagnoses ? (
        initialData.diagnoses.map((diagnoses, index) => (
          <ItemDiagnosisShowMode
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            label={diagnoses.description || ""}
            definitive={diagnoses.definitive || true}
            index={index}
            internCode={diagnoses.code}
            notes={diagnoses.notes}
            withDefinitiveDiagnosis={withDefinitiveDiagnosis}
          />
        ))
      ) : (
        <div />
      ),
    [initialData.diagnoses, withDefinitiveDiagnosis],
  );
  const customerAge = useMemo(() => {
    if (
      !customer.birthdateDay ||
      !customer.birthdateMonth ||
      !customer.birthdateYear
    ) {
      return "";
    }
    const theAge = age(customer);
    return `${theAge.years} años, ${theAge.months} meses `;
  }, [customer]);
  return (
    <LabeledDialog
      open={open}
      handleShow={handleShow}
      label={STRINGS.certificates.CERTIFICATE_RESUME}
      actionPanel={
        <ActionCertificatesResume
          certificateId={certificateId}
          handlePrint={handlePrint}
          handleMailClicked={handleMailClicked}
          handlePatientCellClicked={handlePatientCellClicked}
          loadingPrint={loadingPrint}
          loadingSendByCell={loadingSendByCell}
          loadingSendingByEmail={loadingSendingByEmail}
          onHistoryClicked={onHistoryClicked}
          handleClose={handleClose}
        />
      }>
      <div className={classes.container}>
        <div>
          <div>
            <div className={classes.labelDescriptions}>
              <Typography>{`${STRINGS.generals.CERTIFICATE_THAT}${
                // eslint-disable-next-line no-nested-ternary
                customer?.gender === "FEMALE"
                  ? STRINGS.generals.HER.toLowerCase()
                  : customer?.gender === "MALE"
                  ? STRINGS.generals.HIM.toLowerCase()
                  : ""
              } ${STRINGS.order.ORDER_PATIENT.toLowerCase()} ${fullName(
                customer,
              )}  ${customerAge ? `de ${customerAge}` : ""} con C.I ${
                customer.legalID
              } con diagnóstico de:`}</Typography>
            </div>
            {initialData.diagnoses && initialData.diagnoses.length <= 0
              ? renderNoSHowItem("diagnóstico")
              : renderDiagnosisList()}
          </div>
          <div className={classes.certificateDetails}>
            <Typography className={classes.certificateTitleStyle}>
              {STRINGS.certificates.CERTIFICATE_DETAILS}
            </Typography>
            <div className={classes.box}>
              <Editor
                minEditorHeight={theme.spacing(20)}
                htmlValue={certificateDetails && certificateDetails[0]}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className={classes.primaryButton}>
          {showEditLabel && (
            <PrimaryButton
              label={STRINGS.generals.EDIT}
              onClick={handleShow}
              color="primary"
            />
          )}
        </div>
      </div>
    </LabeledDialog>
  );
};

export default CertificateResumeDialog;
