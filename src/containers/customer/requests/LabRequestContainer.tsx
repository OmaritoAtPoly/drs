import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import LaboratoryRequest from "../../../components/domains/customer/request/laboratory/LaboratoryRequest";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import {
  useAddCustomerLabRequestMutation,
  useEditCustomerLabRequestMutation,
} from "../../../modules/customer/request/mutation";
import useHandlerError from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";

interface Props {
  handleShow: () => void;
  handleViewMode: () => void;
  viewMode: boolean;
}

export default function LabRequestContainer({
  handleShow,
  handleViewMode,
  viewMode,
}: Props) {
  const { id: code, appointmentId } = useParams<{
    id: string;
    appointmentId: string;
  }>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [requestCode, setRequestCode] = useState<string>("");
  const { handlerError } = useHandlerError();

  const onSuccess = useCallback(
    (data: Schemas.LaboratoryRequestResponse) => {
      queryCache.setQueryData(
        ReactQueryKeys["customer-last-lab-request-key"],
        data,
      );
      setRequestCode(data.code || "");
      queryCache.invalidateQueries(ReactQueryKeys["customer-lab-request-key"]);
      setEditMode(true);
      handleViewMode();
    },
    [handleViewMode],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    mutate: mutateAdd,
    loading: adding,
  } = useAddCustomerLabRequestMutation({
    onSuccess,
    showError: true,
  });
  const {
    mutate: mutateEdit,
    loading: editing,
  } = useEditCustomerLabRequestMutation({
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
        mutateAdd({
          code,
          ...labRequest,
          appointment: appointmentId,
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_MESSAGE);
      }
    },
    [appointmentId, code, handlerError, mutateAdd],
  );

  const handleOnEditCustomerLabRequest = useCallback(
    (labRequest: Schemas.LaboratoryRequestRequest) => {
      if (
        labRequest &&
        labRequest.diagnoses &&
        labRequest.items &&
        labRequest.diagnoses?.length > 0 &&
        labRequest.items?.length > 0
      ) {
        mutateEdit({
          code,
          requestCode,
          ...labRequest,
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_MESSAGE);
      }
    },
    [code, handlerError, mutateEdit, requestCode],
  );

  const onSubmit = useCallback(
    (labRequest: Schemas.LaboratoryRequestRequest) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      editMode
        ? handleOnEditCustomerLabRequest(labRequest)
        : handleOnAddCustomerLabRequest(labRequest);
    },
    [editMode, handleOnAddCustomerLabRequest, handleOnEditCustomerLabRequest],
  );

  return (
    <LaboratoryRequest
      initialValue={{ diagnoses: [], items: [] }}
      viewMode={viewMode}
      loading={adding || editing}
      addCustomerLabRequest={onSubmit}
      handleShow={handleShow}
      handleViewMode={handleViewMode}
    />
  );
}
