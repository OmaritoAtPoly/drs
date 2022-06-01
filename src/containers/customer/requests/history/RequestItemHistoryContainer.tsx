/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-confusing-arrow */
import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import LabeledDialog from "../../../../components/dialogs/LabeledDialog";
import RequestHistoryItemActionPanel from "../../../../components/domains/customer/request/history/RequestHistoryItemActionPanel";
import RequestItemHistory from "../../../../components/domains/customer/request/history/RequestItem";
import ImageRequestShowMode from "../../../../components/domains/customer/request/image/ImageRequestShowMode";
import LabRequestShowMode from "../../../../components/domains/customer/request/laboratory/LabRequestShowMode";
import OtherRequestShowMode from "../../../../components/domains/customer/request/other/OtherRequestShowMode";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import { useImagesRequestMailSender } from "../../../../modules/customer/request/history/imageHistoryCacheSelector";
import { useLabsRequestMailSender } from "../../../../modules/customer/request/history/labHistoryCacheSelector";
import {
  useCustomerImagePdfMutation,
  useCustomerLaboratoriesPdfMutation,
  useSendImagesRequestMutation,
  useSendLabsRequestPdfMutation,
} from "../../../../modules/customer/request/history/mutation";
import {
  useAddCustomerImageRequestMutation,
  useAddCustomerLabRequestMutation,
  useEditCustomerImageRequestMutation,
  useEditCustomerLabRequestMutation,
  useExportOtherRequestPdfMutation,
  useSendRequestMutation,
} from "../../../../modules/customer/request/mutation";
import useOtherRequestCacheSelector from "../../../../modules/customer/request/otherRequestCacheSelector";
import useHandlerError, {
  useAddLastAlerts,
} from "../../../../modules/utils/error/handleError";
import { showFile } from "../../../../utils/document";
import { REQUEST_DATA_TYPE } from "../../../../utils/enums";
import STRINGS from "../../../../utils/strings";
import DuplicateRequestContainer from "../duplicates/DuplicateRequestContainer";
import EditableRequestContainer from "../editables/EditableRequestContainer";

interface Props {
  code: string;
  index: number;
  requestType: string;
  date: string;
  time: string;
  patientName: string;
  diagnosis: string[];
  request: string[];
  requestItem: Schemas.LaboratoryRequestRequest | Schemas.ImageRequestRequest;
  deleteRequest: (code: string) => void;
  loading?: boolean;
}

export default function RequestItemHistoryContainer(props: Props) {
  const { id: code, appointmentId } = useParams<{
    id: string;
    appointmentId: string;
  }>();
  const [open, setOpen] = useState<boolean>(false);
  const { addLastAlerts } = useAddLastAlerts();
  const { handlerError } = useHandlerError();
  const [duplicateOption, setDuplicateOption] = useState<boolean>(false);
  const [editableOption, setEditableOption] = useState<boolean>(false);

  const [
    updatedValues,
    setUpdatedValues,
  ] = useState<Schemas.ImageRequestRequest>();
  const [requestName, setRequestName] = useState<string>();

  const { id: patientCode } = useParams<{ id: string; }>();

  const {
    creatingRequest,
    handleOnAddRequest,
    handleOnEditRequest,
    editingRequest: editingOtherRequest,
  } = useOtherRequestCacheSelector();

  const handleShow = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const {
    loading: loadingImagePdf,
    mutate: mutateImagePdf,
  } = useCustomerImagePdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const {
    loading: loadingLaboratoriesPdf,
    mutate: mutateLaboratoriesPdf,
  } = useCustomerLaboratoriesPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const {
    mutate: exportOtherRequestPdfMutate,
    loading: exportingOtherRequestPdf,
  } = useExportOtherRequestPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handleOnSendSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: sendImageByCell,
    loading: sendingImageByCell,
  } = useSendImagesRequestMutation({
    showError: true,
    onSuccess: handleOnSendSuccess,
  });

  const {
    mutate: sendLabByCell,
    loading: sendingLabByCell,
  } = useSendLabsRequestPdfMutation({
    showError: true,
    onSuccess: handleOnSendSuccess,
  });

  const {
    mutate: sendOtherByCell,
    loading: sendingOtherRequestByCell,
  } = useSendRequestMutation({
    showError: true,
    onSuccess: handleOnSendSuccess,
  });
  const onSuccessSendByEmailOther = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: sendOtherByEmail,
    loading: sendingOtherRequestByEmail,
  } = useSendRequestMutation({
    showError: true,
    onSuccess: onSuccessSendByEmailOther,
  });
  const { handleSentByMail, sendingEmail } = useImagesRequestMailSender();
  const {
    handleSentLabPdfByMail,
    sendingLabEmail,
  } = useLabsRequestMailSender();

  const handleOnPrintClicked = useCallback(() => {
    if (props.requestType === REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST) {
      mutateImagePdf({
        code,
        requestCode: props.code,
      });
    } else if (props.requestType === REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST) {
      mutateLaboratoriesPdf({
        code,
        requestCode: props.code,
      });
    } else {
      exportOtherRequestPdfMutate({
        code,
        requestCode: props.code,
      });
    }
  }, [
    code,
    exportOtherRequestPdfMutate,
    mutateImagePdf,
    mutateLaboratoriesPdf,
    props.code,
    props.requestType,
  ]);

  const handleOnPatientCellClicked = useCallback(() => {
    if (props.requestType === REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST) {
      sendImageByCell({ code, requestCode: props.code, sendToCustomer: true });
    } else if (props.requestType === REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST) {
      sendLabByCell({ code, requestCode: props.code, sendToCustomer: true });
    } else {
      sendOtherByCell({
        code,
        requestCode: props.code,
        sendToCustomer: true,
      });
    }
  }, [
    code,
    props.code,
    props.requestType,
    sendImageByCell,
    sendLabByCell,
    sendOtherByCell,
  ]);

  const handleMailClicked = useCallback(() => {
    if (props.requestType === REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST) {
      handleSentByMail(props.code);
    } else if (props.requestType === REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST) {
      handleSentLabPdfByMail(props.code);
    } else {
      sendOtherByEmail({
        code,
        requestCode: props.code,
        sendByEmail: true,
        sendToCustomer: false,
        sendToProfessional: false,
      });
    }
  }, [
    code,
    handleSentByMail,
    handleSentLabPdfByMail,
    props.code,
    props.requestType,
    sendOtherByEmail,
  ]);

  const handleOnHistoryClicked = useCallback(() => {
    handleShow();
  }, [handleShow]);

  const handleEditableRequest = useCallback(() => {
    setEditableOption(true);
    setRequestName(props.requestType);
  },
  [setEditableOption, props.requestType],
);

  const renderRequest = useCallback(() => {
    if (props.requestType === REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST) {
      return (
        <ImageRequestShowMode
          imageRequest={updatedValues || props.requestItem}
          onEdit={handleEditableRequest}
        />
      );
    }
    if (props.requestType === REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST) {
      return (
        <LabRequestShowMode
          labRequest={updatedValues || props.requestItem}
          onEdit={handleEditableRequest} />
      );
    }
    return (
      <OtherRequestShowMode
        otherRequest={updatedValues || props.requestItem}
        onEdit={handleEditableRequest} />
    );
  }, [props.requestItem, props.requestType, updatedValues, handleEditableRequest]);

  const onSuccess = useCallback(
    (data) => {
      switch (requestName) {
        case REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST:
          queryCache.invalidateQueries(
            ReactQueryKeys["customer-image-request-key"],
          );
          break;
        case REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST:
          queryCache.invalidateQueries(
            ReactQueryKeys["customer-lab-request-key"],
          );
          break;
        case REQUEST_DATA_TYPE.REQUESTS.OTHER_REQUEST:
          queryCache.invalidateQueries(
            ReactQueryKeys["customer-other-requests-key"],
          );
          break;
        default:
          return;
      }
      handleShow();
      setDuplicateOption(false);
      setEditableOption(false);
      setUpdatedValues(data);
    },
    [handleShow, requestName],
  );

  const {
    mutate: mutateAdd,
    loading: adding,
  } = useAddCustomerImageRequestMutation({
    onSuccess,
    showError: true,
  });

  const handleOnAddCustomerImageRequest = useCallback(
    (imageRequest: Schemas.ImageRequestRequest) => {
      if (
        imageRequest &&
        imageRequest.diagnoses &&
        imageRequest.items &&
        imageRequest.diagnoses?.length > 0 &&
        imageRequest.items?.length > 0
      ) {
        mutateAdd({
          code,
          diagnoses: imageRequest.diagnoses,
          items: imageRequest.items,
          appointment: appointmentId,
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_MESSAGE);
      }
    },
    [appointmentId, code, handlerError, mutateAdd],
  );

  const {
    mutate: mutateAddLabReq,
    loading: addingLabReq,
  } = useAddCustomerLabRequestMutation({
    onSuccess,
    showError: true,
  });

  const handleOnAddCustomerLabRequest = useCallback(
    (labRequest: Schemas.LaboratoryRequestRequest) => {
      if (
        labRequest &&
        labRequest.diagnoses &&
        labRequest.items &&
        labRequest.diagnoses?.length > 0 &&
        labRequest.items?.length > 0
      ) {
        mutateAddLabReq({
          code,
          ...labRequest,
          appointment: appointmentId,
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_MESSAGE);
      }
    },
    [appointmentId, code, handlerError, mutateAddLabReq],
  );

  const handleDuplicateRequest = useCallback(
    (value?: string) => {
      setDuplicateOption(true);
      setRequestName(value);
    },
    [setDuplicateOption],
  );

  const handleDuplicateOption = useCallback(
    () => setDuplicateOption(!duplicateOption),
    [duplicateOption],
  );

  const handleEditableOption = useCallback(
    () => setEditableOption(!editableOption),
    [editableOption],
  );

  const handleDuplicatorMutations = useCallback(
    (
      request: Schemas.ImageRequestRequest | Schemas.LaboratoryRequestRequest,
    ) => {
      switch (requestName) {
        case REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST:
          handleOnAddCustomerImageRequest(request);
          break;
        case REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST:
          handleOnAddCustomerLabRequest(request);
          break;
        case REQUEST_DATA_TYPE.REQUESTS.OTHER_REQUEST:
          handleOnAddRequest(request, onSuccess);
          break;
        default:
          () => {};
          break;
      }
    },
    [
      requestName,
      handleOnAddCustomerImageRequest,
      handleOnAddCustomerLabRequest,
      handleOnAddRequest,
      onSuccess,
    ],
  );

  const renderDuplicateRequest = useCallback(
    () => (
      <DuplicateRequestContainer
        requestItem={updatedValues || props.requestItem}
        handleShow={handleDuplicateOption}
        requestName={requestName}
        handleOnAddCustomerImageRequest={handleDuplicatorMutations}
        loading={adding || addingLabReq || creatingRequest}
        duplicateOption={!duplicateOption}
      />
    ),
    [
      props.requestItem,
      handleDuplicatorMutations,
      handleDuplicateOption,
      requestName,
      adding,
      duplicateOption,
      updatedValues,
      addingLabReq,
      creatingRequest,
    ],
  );

  const {
    mutate: mutateEdit,
    loading: editing,
  } = useEditCustomerImageRequestMutation({
    onSuccess,
    showError: true,
  });

  const {
    mutate: mutateLabEdit,
    loading: editingLab,
  } = useEditCustomerLabRequestMutation({
    onSuccess,
    showError: true,
  });

  const handleOnEditCustomerImageRequest = useCallback(
    (imageRequest: Schemas.ImageRequestRequest) => {
      mutateEdit({
        requestCode: props.code,
        code: patientCode,
        ...imageRequest,
      });
    }, [mutateEdit, patientCode, props.code]);

  const handleOnEditCustomerLabRequest = useCallback(
    (labRequest: Schemas.LaboratoryRequestRequest) => {
      mutateLabEdit({
        requestCode: props.code,
        code: patientCode,
        ...labRequest,
      });
    }, [props.code, mutateLabEdit, patientCode]);

  const handleEditorMutation = useCallback(
    (
      request: Schemas.ImageRequestRequest | Schemas.LaboratoryRequestRequest,
    ) => {
      switch (requestName) {
        case REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST:
          handleOnEditCustomerImageRequest(request);
          break;
        case REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST:
          handleOnEditCustomerLabRequest(request);
          break;
        case REQUEST_DATA_TYPE.REQUESTS.OTHER_REQUEST:
          handleOnEditRequest(props.code, request, onSuccess);
          break;
        default:
          () => {};
          break;
      }
    },
    [
      requestName,
      handleOnEditCustomerImageRequest,
      onSuccess,
      handleOnEditCustomerLabRequest,
      props.code,
      handleOnEditRequest,
    ],
  );

  const renderEditRequest = useCallback(
    () => (
      <EditableRequestContainer
        requestItem={updatedValues || props.requestItem}
        handleShow={handleEditableOption}
        requestName={requestName}
        handleOnEditCustomerRequest={handleEditorMutation}
        loading={editing || editingLab || editingOtherRequest}
        editableOption={!editableOption}
      />
    ),
    [
      handleEditorMutation,
      handleEditableOption,
      props.requestItem,
      requestName,
      updatedValues,
      editableOption,
      editing,
      editingLab,
      editingOtherRequest,
    ],
  );

  return (
    <>
      {open ? (
        <LabeledDialog
          label={props.requestType}
          open={open}
          actionPanel={
            <RequestHistoryItemActionPanel
              loadingPdf={
                loadingImagePdf ||
                loadingLaboratoriesPdf ||
                exportingOtherRequestPdf
              }
              sendingCell={
                sendingLabByCell ||
                sendingImageByCell ||
                sendingOtherRequestByCell
              }
              onPrintClicked={handleOnPrintClicked}
              onPatientCellClicked={handleOnPatientCellClicked}
              onHistoryClicked={handleOnHistoryClicked}
              onMailClicked={handleMailClicked}
              sendingEmail={sendingEmail}
              handleClose={handleShow}
            />
          }
          handleShow={handleShow}>
          {renderRequest()}
        </LabeledDialog>
      ) : (
        <RequestItemHistory
          onRequestClick={handleShow}
          handleEditRequestClick={handleEditableRequest}
          handleDuplicateRequest={handleDuplicateRequest}
          handlePatientCellClicked={handleOnPatientCellClicked}
          handleMailClicked={handleMailClicked}
          loadingSendingByEmail={
            sendingEmail || sendingLabEmail || sendingOtherRequestByEmail
          }
          loadingSendingCell={
            sendingLabByCell || sendingImageByCell || sendingOtherRequestByCell
          }
          onPrint={handleOnPrintClicked}
          loadingPrint={
            loadingImagePdf ||
            loadingLaboratoriesPdf ||
            exportingOtherRequestPdf
          }
          {...props}
        />
      )}
      {duplicateOption && renderDuplicateRequest()}
      {editableOption && renderEditRequest()}
    </>
  );
}
