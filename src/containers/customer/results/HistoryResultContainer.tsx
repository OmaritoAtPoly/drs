import moment from "moment";
import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import HistoryResult from "../../../components/domains/customer/results/HistoryResult";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { useResultsCacheSelector } from "../../../modules/customer/result/cacheSelector";
import {
  useDeleteResultMutation,
  useExportResultPdfMutation,
  useFetchResultFileMutation,
  useSendResultByEmailMutation,
} from "../../../modules/customer/result/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import { RequestType } from "../../../utils/enums";
import STRINGS from "../../../utils/strings";
import { ValueAndLabelType } from "../../../utils/types";

interface Props {
  handleEdit: () => void;
}

export default function HistoryResultContainer({ handleEdit }: Props) {
  const { id: code } = useParams<{ id: string }>();
  const {
    items: seenResults,
    loading: loadingSeen,
    canFetchMore: hasNextPageSeen,
    isFetchingMore: isFetchingMoreSeen,
    fetchMore: fetchMoreSeen,
    setRangeDates: setRangeDatesSeen,
    setRequestType: setRequestTypeSeen,
    from,
    to,
  } = useResultsCacheSelector({
    seen: true,
  });

  const {
    items: notSeenResults,
    loading: loadingNotSeen,
    canFetchMore: hasNextPageNotSeen,
    isFetchingMore: isFetchingMoreNotSeen,
    fetchMore: fetchMoreNotSeen,
    setRangeDates: setRangeDatesNotSeen,
    setRequestType: setRequestTypeNotSeen,
  } = useResultsCacheSelector({
    seen: false,
  });
  const { currentPatient } = usePatientCacheSelector({});
  const { addLastAlerts } = useAddLastAlerts();

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const onSuccessDelete = useCallback(() => {
    queryCache.invalidateQueries(ReactQueryKeys["customer-results-key"]);
  }, []);

  const {
    loading: loadingResultPdf,
    mutate: mutateResultPdf,
  } = useExportResultPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handleOnSendByEmailSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const handleOnSendByCellSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: mutateSendEmail,
    loading: loadingSendEmail,
  } = useSendResultByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByEmailSuccess,
  });
  const {
    mutate: mutateSendByCell,
    loading: loadingSendingCell,
  } = useSendResultByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByCellSuccess,
  });

  const {
    loading: loadingDeleteResult,
    mutate: mutateDeleteResult,
  } = useDeleteResultMutation({
    showError: true,
    onSuccess: onSuccessDelete,
  });

  const handleFromDate = useCallback(
    (date?: Date) => {
      setRangeDatesSeen(date || new Date(), moment(to, "DD/MM/yyyy").toDate());
      setRangeDatesNotSeen(
        date || new Date(),
        moment(to, "DD/MM/yyyy").toDate(),
      );
    },
    [setRangeDatesNotSeen, setRangeDatesSeen, to],
  );

  const handleToDate = useCallback(
    (date?: Date) => {
      setRangeDatesSeen(
        moment(from, "DD/MM/yyyy").toDate(),
        date || new Date(),
      );
      setRangeDatesNotSeen(
        moment(from, "DD/MM/yyyy").toDate(),
        date || new Date(),
      );
    },
    [from, setRangeDatesNotSeen, setRangeDatesSeen],
  );

  const handleRequestType = useCallback(
    (valueAndLabel?: ValueAndLabelType) => {
      setRequestTypeSeen(
        valueAndLabel ? (valueAndLabel.value as RequestType) : undefined,
      );
      setRequestTypeNotSeen(
        valueAndLabel ? (valueAndLabel.value as RequestType) : undefined,
      );
      queryCache.setQueryData(
        [ReactQueryKeys["result-request-type-key"]],
        valueAndLabel?.label,
      );
    },
    [setRequestTypeNotSeen, setRequestTypeSeen],
  );
  const handleOnPrintClicked = useCallback(
    (resultCode: string) => {
      mutateResultPdf({
        code,
        resultCode,
      });
    },
    [code, mutateResultPdf],
  );
  const handleSendEmail = useCallback(
    (resultCode: string) => {
      mutateSendEmail({
        code,
        resultCode,
        sendByEmail: true,
        sendToCustomer: false,
        sendToProfessional: false,
      });
    },
    [code, mutateSendEmail],
  );

  const handleSendCell = useCallback(
    (resultCode: string) => {
      mutateSendByCell({
        code,
        resultCode,
        sendByEmail: false,
        sendToCustomer: true,
        sendToProfessional: false,
      });
    },
    [code, mutateSendByCell],
  );

  const onSuccessHandleInform = useCallback((blob: Blob) => {
    showFile(blob, STRINGS.result.RESULT_FILE, blob.type);
  }, []);

  const {
    mutate: handleInformMutate,
    loading: loadingHandleInform,
  } = useFetchResultFileMutation({
    showError: true,
    onSuccess: onSuccessHandleInform,
  });

  const handleInform = useCallback(
    (resultCode: string) => {
      handleInformMutate({ code: resultCode });
    },
    [handleInformMutate],
  );

  const handleDelete = useCallback(
    (resultCode: string) => {
      mutateDeleteResult({
        code,
        resultCode,
      });
    },
    [code, mutateDeleteResult],
  );

  return (
    <HistoryResult
      loadingSeen={loadingSeen || !!isFetchingMoreSeen}
      seenResults={seenResults}
      hasNextPageSeenResults={hasNextPageSeen}
      fetchMoreSeenResults={fetchMoreSeen}
      notLoadingSeen={loadingNotSeen || !!isFetchingMoreNotSeen}
      notSeenResults={notSeenResults}
      hasNextPageNotSeenResults={hasNextPageNotSeen}
      fetchMoreNotSeenResults={fetchMoreNotSeen}
      handleFromDate={handleFromDate}
      handleToDate={handleToDate}
      handleRequestType={handleRequestType}
      from={moment(from, "DD/MM/yyyy").toDate()}
      to={moment(to, "DD/MM/yyyy").toDate()}
      currentPatient={currentPatient}
      handleOnPrintClicked={handleOnPrintClicked}
      loadingResultPdf={loadingResultPdf}
      handleSendEmail={handleSendEmail}
      loadingSendEmail={loadingSendEmail}
      handleInform={handleInform}
      loadingHandleInform={loadingHandleInform}
      handleDeleteResult={handleDelete}
      loadingDeleteResult={loadingDeleteResult}
      handleSendByCell={handleSendCell}
      handleEdit={handleEdit}
      loadingSendingCell={loadingSendingCell}
    />
  );
}
