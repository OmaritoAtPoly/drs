import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../utils/strings";
import { ValueAndLabelType } from "../../../../utils/types";
import FilterPanel from "./FilterPanel";
import Column from "./panel/Column";

const styles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  col: {
    display: "flex",
    flex: 1,
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
  },
}));
interface Props {
  loadingSeen?: boolean;
  seenResults: Schemas.ResultItem[];
  fetchMoreSeenResults: () => void;
  hasNextPageSeenResults?: boolean;
  notSeenResults: Schemas.ResultItem[];
  notLoadingSeen?: boolean;
  fetchMoreNotSeenResults: () => void;
  hasNextPageNotSeenResults?: boolean;
  handleFromDate: (date?: Date) => void;
  handleToDate: (date?: Date) => void;
  handleRequestType: (value: ValueAndLabelType) => void;
  currentPatient?: Schemas.CustomerData;
  from: Date;
  to: Date;
  handleOnPrintClicked: (code: string) => void;
  loadingResultPdf?: boolean;
  handleSendEmail: (code: string) => void;
  loadingSendEmail?: boolean;
  handleInform: (code: string) => void;
  loadingHandleInform?: boolean;
  handleDeleteResult: (code: string) => void;
  loadingDeleteResult?: boolean;
  handleSendByCell: (code: string) => void;
  handleEdit: () => void;
  loadingSendingCell: boolean;
}

export default function HistoryResult({
  loadingSeen,
  seenResults,
  fetchMoreSeenResults,
  hasNextPageSeenResults,
  notSeenResults,
  notLoadingSeen,
  fetchMoreNotSeenResults,
  hasNextPageNotSeenResults,
  handleFromDate,
  handleToDate,
  handleRequestType,
  from,
  to,
  currentPatient,
  handleOnPrintClicked,
  loadingResultPdf = false,
  handleSendEmail,
  loadingSendEmail = false,
  handleInform,
  loadingHandleInform,
  loadingDeleteResult = false,
  handleDeleteResult,
  handleSendByCell,
  handleEdit,
  loadingSendingCell,
}: Props) {
  const classes = styles();
  return (
    <>
      <FilterPanel
        handleFromDate={handleFromDate}
        handleToDate={handleToDate}
        handleRequestType={handleRequestType}
        from={from}
        to={to}
      />
      <div className={classes.content}>
        <Column
          results={notSeenResults}
          headerLabel="No vistos"
          amount={notSeenResults.length}
          currentPatient={currentPatient}
          loading={notLoadingSeen}
          fetchMore={fetchMoreNotSeenResults}
          hasNextPage={hasNextPageNotSeenResults}
          handleResultPrintClicked={handleOnPrintClicked}
          loadingResultPdf={loadingResultPdf}
          handleSendEmail={handleSendEmail}
          loadingSendEmail={loadingSendEmail}
          handleInform={handleInform}
          loadingHandleInform={loadingHandleInform}
          handleDeleteResult={handleDeleteResult}
          loadingDeleteResult={loadingDeleteResult}
          handleSendByCell={handleSendByCell}
          handleEdit={handleEdit}
          loadingSendingCell={loadingSendingCell}
        />
        <Column
          results={seenResults}
          currentPatient={currentPatient}
          headerLabel={STRINGS.generals.HISTORY}
          loading={loadingSeen}
          fetchMore={fetchMoreSeenResults}
          hasNextPage={hasNextPageSeenResults}
          handleResultPrintClicked={handleOnPrintClicked}
          loadingResultPdf={loadingResultPdf}
          handleSendEmail={handleSendEmail}
          loadingSendEmail={loadingSendEmail}
          handleInform={handleInform}
          loadingHandleInform={loadingHandleInform}
          handleDeleteResult={handleDeleteResult}
          loadingDeleteResult={loadingDeleteResult}
          handleSendByCell={handleSendByCell}
          handleEdit={handleEdit}
          loadingSendingCell={loadingSendingCell}
        />
      </div>
    </>
  );
}
