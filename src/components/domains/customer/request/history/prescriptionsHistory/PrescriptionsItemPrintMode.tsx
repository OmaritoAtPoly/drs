/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import shortid from "shortid";
import {
  dateTimeObjectFormatter,
  formatDate,
} from "../../../../../../utils/date";
import STRINGS from "../../../../../../utils/strings";
import { age, fullName } from "../../../../../../utils/user";
import Avatar from "../../../../../Avatar";
import Editor from "../../../../../inputs/Editor";
import ItemIndications from "./ItemIndications";
import ItemPrescription from "./ItemPrescription";

const styles = makeStyles((theme: Theme) => ({
  boldText: {
    fontWeight: "bold",
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
  subtitle: { fontSize: 14 },
  professionalInfoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  row: { display: "flex", alignItems: "center" },
  column: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingBottom: 10,
    paddingTop: 10,
  },
  rightColumn: {
    borderLeft: `0.5px solid ${theme.palette.grey[300]}`,
    paddingLeft: theme.spacing(1),
  },
  leftColumn: {
    paddingRight: theme.spacing(1),
  },
  horizontalDividerStyle: {
    display: "flex",
    backgroundColor: theme.palette.grey[300],
    height: "1px",
    width: "100%",
    alignSelf: "center",
    marginTop: theme.spacing(1),
  },
  signature: {
    width: "100px",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  professionalInfoBottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  professionalInfoBottomContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  recommendations: {
    display: "flex",
    flexDirection: "column",
  },
  warnings: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  bottomHeaderInfo: {
    alignSelf: "flex-end",
    fontSize: 14,
  },
}));

interface Props {
  prescription: Schemas.PrescriptionResponse;
  professional: Schemas.ProfessionalData;
  customer: Schemas.CustomerData;
  allergies: Schemas.CustomerAllergies;
  currentProfessionalSpecialties: string[];
  currentProfessionalHeathCenter: Schemas.ProfessionalHealthCenterResponse;
}

export default function PrescriptionsItemPrintMode({
  prescription,
  allergies,
  professional,
  customer,
  currentProfessionalSpecialties,
  currentProfessionalHeathCenter,
}: Props) {
  const classes = styles();

  const { years, months } = age(customer);

  const prescriptionHeader = useMemo(
    () => (
      <div className={classes.column}>
        <div className={classes.row}>
          <div className={classes.column}>
            <div className={classes.professionalInfoContainer}>
              <Typography className={classes.boldText}>
                {`${
                  professional.gender === "FEMALE"
                    ? STRINGS.generals.DRA
                    : STRINGS.generals.DR
                } ${fullName(professional)}`}
              </Typography>
              <Typography className={classes.subtitle}>
                {currentProfessionalSpecialties[0]}
              </Typography>
            </div>
            <div>
              <Typography>{currentProfessionalHeathCenter.address}</Typography>
              <Typography>
                {`${STRINGS.generals.PHONE} ${
                  currentProfessionalHeathCenter.phone || ""
                }`}
              </Typography>
              <Typography>{`${STRINGS.generals.MAIL} ${professional.professionalEmail}`}</Typography>
            </div>
          </div>
          <div className={classes.column}>
            <Typography>
              {currentProfessionalHeathCenter.city?.toUpperCase()}
            </Typography>
          </div>
        </div>
        <Divider className={classes.horizontalDividerStyle} />
        <Typography className={classes.bottomHeaderInfo}>
          {`${
            currentProfessionalHeathCenter.city || ""
          }, ${dateTimeObjectFormatter(
            prescription.createdAt,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatDate["DD_MM_YYYY hh:mm"] as any,
          )}`}
        </Typography>
      </div>
    ),
    [
      classes.boldText,
      classes.bottomHeaderInfo,
      classes.column,
      classes.horizontalDividerStyle,
      classes.professionalInfoContainer,
      classes.row,
      classes.subtitle,
      currentProfessionalHeathCenter.address,
      currentProfessionalHeathCenter.city,
      currentProfessionalHeathCenter.phone,
      currentProfessionalSpecialties,
      prescription.createdAt,
      professional,
    ],
  );

  const customerInfo = useMemo(
    () => (
      <>
        <div className={classes.row}>
          <Typography className={classes.boldText}>
            {`${STRINGS.generals.PATIENT}: `}
          </Typography>
          <Typography className={classes.marginLeft}>
            {fullName(customer)}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography className={classes.boldText}>
            {`${STRINGS.generals.CI}`}
          </Typography>
          <Typography className={classes.marginLeft}>
            {customer.legalID}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography className={classes.boldText}>
            {`${STRINGS.generals.AGE}`}
          </Typography>
          <Typography className={classes.marginLeft}>
            {`${STRINGS.generals.AGE} ${years} ${STRINGS.generals.YEARS} ${
              months > 0 ? `y ${months} ${STRINGS.generals.MONTH_S}` : ""
            } `}
          </Typography>
        </div>
      </>
    ),
    [
      classes.boldText,
      classes.marginLeft,
      classes.row,
      customer,
      months,
      years,
    ],
  );

  const diagnoseList = useMemo(
    () => (
      <>
        {prescription?.diagnoses?.map((diag) => (
          <div className={classes.column}>
            <div className={classes.row}>
              <div className={`${classes.row}`}>
                <Typography className={classes.boldText}>
                  {` ${STRINGS.appointment.DG}: `}
                </Typography>
                <Typography className={classes.marginLeft}>
                  {` (${diag.code}) `}
                </Typography>
                <Typography className={classes.marginLeft}>
                  {diag.description}
                </Typography>
              </div>
              <Typography
                className={`${classes.boldText} ${classes.marginLeft}  ${classes.marginTop} `}>
                {diag.definitive
                  ? `(${STRINGS.buttonGrid.DEFINITIVE})`
                  : `(${STRINGS.buttonGrid.PRESUMPTIVE})`}
              </Typography>
            </div>
            {diag.notes !== null && (
              <div className={classes.row}>
                <Typography className={classes.boldText}>
                  {`${STRINGS.generals.NOTES}:`}
                </Typography>
                <Typography className={classes.marginLeft}>
                  {diag.notes}
                </Typography>
              </div>
            )}
          </div>
        ))}
      </>
    ),
    [
      classes.boldText,
      classes.column,
      classes.marginLeft,
      classes.marginTop,
      classes.row,
      prescription?.diagnoses,
    ],
  );

  // TODO: fix (allergies as any).disabled, dis property don't exit
  const allergiesMemo = useMemo(
    () => (
      <>
        <Typography className={classes.boldText}>
          {STRINGS.generals.PILLS_ALLERGIES}
        </Typography>
        {allergies?.medicine &&
          allergies?.medicine?.length > 0 &&
          allergies.medicine?.map((allergy) => (
            <Typography>{allergy.medicine}</Typography>
          ))}
        {allergies.hasAllergies === "FALSE" && (
          <Typography className={classes.boldText}>
            {STRINGS.allergies.NO_ALLERGIES_NO_PATIENT}
          </Typography>
        )}
        {allergies.hasAllergies === "TRUE" && !allergies?.medicine?.length && (
          <Typography className={classes.boldText}>
            {STRINGS.allergies.DON_T_ADD_ALLERGIES_YET}
          </Typography>
        )}
        {allergies.hasAllergies === "UNDEFINED" && !allergies?.medicine?.length && (
          <Typography className={classes.boldText}>
            {STRINGS.allergies.UNDEFINED_ALLERGIES}
          </Typography>
        )}
      </>
    ),
    [allergies.hasAllergies, allergies.medicine, classes.boldText],
  );

  const professionalInfoBottom = useMemo(
    () => (
      <div className={classes.professionalInfoBottomContainer}>
        {professional?.logoUrl && (
          <div className={classes.signature}>
            <Avatar src={professional?.logoUrl} alt="Logo" />
          </div>
        )}
        {professional?.digitalSignUrl && (
          <div className={classes.signature}>
            <Avatar src={professional?.digitalSignUrl} alt="Firma" />
          </div>
        )}
        {professional && (
          <div className={classes.professionalInfoBottomContent}>
            <Typography className={classes.boldText}>
              {fullName(professional)}
            </Typography>
            <Typography className={classes.subtitle}>
              {currentProfessionalSpecialties[0]}
            </Typography>
            <Typography className={classes.subtitle}>
              {professional?.professionalID}
            </Typography>
          </div>
        )}
      </div>
    ),
    [
      classes.boldText,
      classes.professionalInfoBottomContainer,
      classes.professionalInfoBottomContent,
      classes.signature,
      classes.subtitle,
      currentProfessionalSpecialties,
      professional,
    ],
  );

  return (
    <div>
      <div className={classes.row}>
        <div className={`${classes.column} ${classes.leftColumn}`}>
          {prescriptionHeader}
        </div>
        <div className={`${classes.column} ${classes.rightColumn}`}>
          {prescriptionHeader}
        </div>
      </div>
      <div className={`${classes.row}`}>
        <div className={`${classes.column} ${classes.leftColumn}`}>
          {customerInfo}
        </div>
        <div className={`${classes.column} ${classes.rightColumn}`}>
          {customerInfo}
        </div>
      </div>
      <div className={`${classes.row}`}>
        <div className={`${classes.column} ${classes.leftColumn}`}>
          {diagnoseList}
        </div>
        <div className={`${classes.column} ${classes.rightColumn}`}>
          {diagnoseList}
        </div>
      </div>
      <div className={`${classes.row}`}>
        <div className={`${classes.column} ${classes.leftColumn}`}>
          {allergiesMemo}
        </div>
        <div className={`${classes.column} ${classes.rightColumn}`}>
          {allergiesMemo}
        </div>
      </div>

      <div className={`${classes.row}`}>
        <div className={`${classes.column} ${classes.leftColumn}`}>
          {prescription.items?.map((item, index) => (
            <ItemPrescription
              key={shortid()}
              index={index + 1}
              prescription={item}
            />
          ))}
        </div>
        <div className={`${classes.column} ${classes.rightColumn}`}>
          {prescription.items?.map((item, index) => (
            <ItemIndications
              key={shortid()}
              index={index + 1}
              prescription={item}
            />
          ))}
        </div>
      </div>

      <div className={classes.row}>
        <div className={`${classes.column} ${classes.leftColumn}`} />
        <div className={`${classes.column} ${classes.rightColumn}`}>
          <div className={classes.warnings}>
            <div className={classes.recommendations}>
              <Typography className={classes.boldText}>
                {STRINGS.recipe.RECOMMENDATIONS}
              </Typography>
              <Editor
                htmlValue={
                  (prescription.recommendations &&
                    prescription.recommendations[0]) ||
                  ""
                }
                truncate
                readOnly
              />
            </div>
            <div className={classes.warnings}>
              <Typography className={classes.boldText}>
                {`${STRINGS.recipe.ALARM}:`}
              </Typography>
              <Editor
                htmlValue={
                  (prescription.warningSignals &&
                    prescription.warningSignals[0]) ||
                  ""
                }
                truncate
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={`${classes.column} ${classes.leftColumn}`}>
          {professionalInfoBottom}
        </div>
        <div className={`${classes.column} ${classes.rightColumn}`}>
          {professionalInfoBottom}
        </div>
      </div>
    </div>
  );
}
