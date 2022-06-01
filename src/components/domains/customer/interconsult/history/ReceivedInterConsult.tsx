/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
// eslint-disable-next-line import/no-named-as-default-member
import InterConsultHistoryItemContainer from "../../../../../containers/customer/interconsult/InterConsultHistoryItemContainer";
import { formatDate, getDateTimeObjectMoment } from "../../../../../utils/date";
import STRINGS from "../../../../../utils/strings";

const styles = makeStyles((theme: Theme) => ({
  item: { margin: theme.spacing(1) },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  notResult: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface Props {
  interConsults: Schemas.InterConsultationResp[];
  deleteLoading: boolean;
  attachmentLoading: boolean;
  onInterConsultSheetClicked: (code: string) => void;
  onDeleteClicked: (code: string) => void;
  onReportClicked: (code: string) => void;
}

export default function ReceivedInterConsult({
  interConsults,
  attachmentLoading,
  deleteLoading,
  onDeleteClicked,
  onInterConsultSheetClicked,
  onReportClicked,
}: Props) {
  const classes = styles();
  const [affectedCode, setAffectedCode] = useState<string>("");

  const getTime = useCallback((createdAt?: Schemas.DateTimeObject) => {
    const momentTime = getDateTimeObjectMoment(createdAt);
    return (momentTime && momentTime.format(formatDate["hh:mm A"])) || "";
  }, []);

  const handleOnDeleteClicked = useCallback(
    (code: string) => {
      setAffectedCode(code);
      onDeleteClicked(code);
    },
    [onDeleteClicked],
  );

  const getDiagnosesAsString = useCallback(
    (interConsult: Schemas.InterConsultationResp) =>
      interConsult.diagnoses?.map((diagnose) => ` ${diagnose.description},`),
    [],
  );

  const renderInterConsultList = useCallback(
    () =>
      interConsults.length > 0 ? (
        interConsults.map((interConsult, index) => (
          <div key={index} className={classes.item}>
            <InterConsultHistoryItemContainer
              date={`${interConsult.createdAt?.dateDay}/${interConsult.createdAt?.dateMonth}/${interConsult.createdAt?.dateYear}`}
              time={getTime(interConsult.createdAt)}
              diagnosis={getDiagnosesAsString(interConsult) || []}
              visited={false}
              professionalName={`${interConsult.fromProfessional?.firstName} ${interConsult.fromProfessional?.firstFamilyName}`}
              reason={interConsult.reason || ""}
              index={index + 1}
              attachment={
                (interConsult.attachments &&
                  interConsult.attachments?.length > 0) ||
                false
              }
              attachmentLoading={attachmentLoading}
              deleteLoading={deleteLoading}
              informActionLabel={
                interConsult.report
                  ? STRINGS.interconsult.INTERCONSULT_INFORM
                  : STRINGS.interconsult.INTERCONSULT_MAKE_INFORM
              }
              haveReport={!!interConsult.report}
              affectedInterConsultCode={affectedCode}
              currentInterConsultCode={interConsult.code || ""}
              specialty={interConsult.toSpecialty?.name || ""}
              onDeleteClicked={() =>
                handleOnDeleteClicked(interConsult.code || "")
              }
              onInterConsultSheetClicked={() =>
                onInterConsultSheetClicked(interConsult.code || "")
              }
              onReportClicked={() => {
                onReportClicked(interConsult.code || "");
              }}
              fromrecievedInterconsult
            />
          </div>
        ))
      ) : (
        <div className={classes.notResult}>
          <Typography color="error" variant="h6">
            {STRINGS.interconsult.NOT_RESULTS}
          </Typography>
        </div>
      ),
    [
      affectedCode,
      attachmentLoading,
      classes.item,
      classes.notResult,
      deleteLoading,
      getDiagnosesAsString,
      getTime,
      handleOnDeleteClicked,
      interConsults,
      onInterConsultSheetClicked,
      onReportClicked,
    ],
  );

  return (
    <div>
      <Typography className={classes.title} color="primary">
        {STRINGS.interconsult.RECEIVED}
      </Typography>
      {renderInterConsultList()}
    </div>
  );
}
