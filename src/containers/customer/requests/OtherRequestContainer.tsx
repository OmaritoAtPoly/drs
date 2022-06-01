import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import OtherRequest from "../../../components/domains/customer/request/other/OtherRequest";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useOtherRequestCacheSelector from "../../../modules/customer/request/otherRequestCacheSelector";

interface Props {
  handleShow: () => void;
  handleViewMode: () => void;
  viewMode: boolean;
}

export default function OtherRequestContainer({
  viewMode,
  handleShow,
  handleViewMode,
}: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [requestCode, setRequestCode] = useState<string>("");
  const {
    creatingRequest,
    editingRequest,
    handleOnAddRequest,
    handleOnEditRequest,
  } = useOtherRequestCacheSelector();

  const onSuccess = useCallback(
    (data: Schemas.OtherRequestResponse) => {
      queryCache.setQueryData(
        ReactQueryKeys["customer-last-other-request-key"],
        data,
      );
      if (data) {
        setRequestCode(data.code || "");
        queryCache.invalidateQueries(
          ReactQueryKeys["customer-other-requests-key"],
        );
        setEditMode(true);
        handleViewMode();
      }
    },
    [handleViewMode],
  );

  const onSubmit = useCallback(
    (otherRequest: Schemas.OtherRequestRequest) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      editMode
        ? handleOnEditRequest(requestCode, otherRequest, onSuccess)
        : handleOnAddRequest(otherRequest, onSuccess);
    },
    [editMode, handleOnAddRequest, handleOnEditRequest, onSuccess, requestCode],
  );

  return (
    <OtherRequest
      mode={viewMode}
      initialValue={{ diagnoses: [], items: [] }}
      addCustomerOtherRequest={onSubmit}
      handleShow={handleShow}
      handleViewMode={handleViewMode}
      loading={creatingRequest || editingRequest}
    />
  );
}
