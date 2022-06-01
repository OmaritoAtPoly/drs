import { makeStyles, Theme } from "@material-ui/core";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useSaveCurrentResultSelectorCacheSelector } from "../../../../../modules/customer/result/cacheSelector";
import { fullName } from "../../../../../utils/user";
import InfiniteScrollList from "../../../../lists/InfiniteScrollList";
import ResultItem from "../item/ResultItem";
import ColumnHeader from "./ColumnHeader";

const styles = makeStyles((theme: Theme) => ({
  col: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: theme.spacing(0.5),
  },
  ul: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
}));

interface Props {
  headerLabel: string;
  results: Schemas.LaboratoryResultItem[];
  amount?: number;
  currentPatient?: Schemas.CustomerData;
  loading?: boolean;
  fetchMore: () => void;
  hasNextPage?: boolean;
  handleResultPrintClicked: (code: string) => void;
  loadingResultPdf?: boolean;
  handleSendEmail: (code: string) => void;
  handleSendByCell: (code: string) => void;
  loadingSendEmail?: boolean;
  handleInform?: (endpoint: string) => void;
  loadingHandleInform?: boolean;
  handleDeleteResult: (code: string) => void;
  handleEdit: () => void;
  loadingDeleteResult: boolean;
  loadingSendingCell: boolean;
}

export default function Column({
  headerLabel,
  results,
  amount,
  currentPatient,
  loading,
  fetchMore,
  hasNextPage,
  handleResultPrintClicked,
  loadingResultPdf = false,
  handleSendEmail,
  handleInform,
  loadingSendEmail = false,
  loadingHandleInform = false,
  handleDeleteResult,
  loadingDeleteResult = false,
  handleSendByCell,
  handleEdit,
  loadingSendingCell,
}: Props) {
  const classes = styles();
  const [currentValue, setCurrentValue] = useState<string | undefined>();
  const { saveCurrentResult } = useSaveCurrentResultSelectorCacheSelector();

  const handlePrintClicked = useCallback(
    (requestCode?: string) => () => {
      setCurrentValue(requestCode);
      requestCode && handleResultPrintClicked(requestCode);
    },
    [handleResultPrintClicked],
  );

  const handleOnShareByEmail = useCallback(
    (requestCode?: string) => () => {
      setCurrentValue(requestCode);
      requestCode && handleSendEmail(requestCode);
    },
    [handleSendEmail],
  );
  const handleOnShareByCell = useCallback(
    (requestCode?: string) => () => {
      setCurrentValue(requestCode);
      requestCode && handleSendByCell(requestCode);
    },
    [handleSendByCell],
  );

  const handleInformCallBack = useCallback(
    (code?: string) => () => {
      setCurrentValue(code);
      code && handleInform && handleInform(code);
    },
    [handleInform],
  );

  const handleOnDeleteResult = useCallback(
    (code: string) => () => {
      setCurrentValue(code);
      handleDeleteResult(code);
    },
    [handleDeleteResult],
  );

  const handleEditResult = useCallback(
    (result: Schemas.ResultItem) => () => {
      saveCurrentResult({
        code: result.requestCode || "",
        createdAt: result.requestCreatedAt,
        diagnoses: result.diagnoses,
        items: [{ ...result }],
        requestType: result.requestType,
      });
      handleEdit();
    },
    [handleEdit, saveCurrentResult],
  );

  return (
    <div className={classes.col}>
      <ColumnHeader title={headerLabel} amount={amount} />
      <InfiniteScrollList
        data={results || []}
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
        renderRow={(result: Schemas.ResultItem, index) => (
          <ResultItem
            title={(result as { title: string }).title}
            requestType={result.requestType}
            index={index + 1}
            date={`${result.requestCreatedAt?.dateDay}/${result.requestCreatedAt?.dateMonth}/${result.requestCreatedAt?.dateYear}`}
            diagnosis={[]}
            patientName={fullName(currentPatient)}
            request={[]}
            time={moment(
              `${result.requestCreatedAt?.timeHour}:${
                result.requestCreatedAt?.timeMinute || 0
              }`,
              "hh:mm",
            ).format("hh:mm A")}
            visited={result.seenByProfessional}
            handleOnPrintClicked={handlePrintClicked(result.code)}
            handleDeleteResult={handleOnDeleteResult(result.code || "")}
            loadingResultPdf={currentValue === result.code && loadingResultPdf}
            handleSendEmail={handleOnShareByEmail(result.code)}
            loadingSendEmail={currentValue === result.code && loadingSendEmail}
            handleInform={
              result.fileUrl ? handleInformCallBack(result.code) : undefined
            }
            loadingHandleInform={
              currentValue === result.code && loadingHandleInform
            }
            loadingDeleteResult={
              currentValue === result.code && loadingDeleteResult
            }
            handlePatientCellClicked={handleOnShareByCell(result.code)}
            loadingSendingCell={
              currentValue === result.code && loadingSendingCell
            }
            handleEditResult={handleEditResult(result)}
            editable={!result.fileUrl}
          />
        )}
      />
    </div>
  );
}
