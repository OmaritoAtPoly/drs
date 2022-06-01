/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";
import OtherRequestForm from "./OtherRequestForm";
import OtherRequestShowMode from "./OtherRequestShowMode";

interface Props {
  addCustomerOtherRequest: (request: Schemas.OtherRequestRequest) => void;
  handleShow: () => void;
  handleViewMode: () => void;
  mode: boolean;
  loading: boolean;
  initialValue: Schemas.OtherRequestRequest;
}

export default function OtherRequest({
  addCustomerOtherRequest,
  handleShow,
  handleViewMode,
  mode,
  initialValue,
  loading,
}: Props) {
  const [otherRequest, setOtherRequest] = useState<Schemas.OtherRequestRequest>(
    initialValue,
  );

  const onEditClicked = useCallback(() => {
    handleViewMode();
  }, [handleViewMode]);

  const handleAddCustomerRequest = useCallback(
    (request: Schemas.OtherRequestRequest) => {
      addCustomerOtherRequest(request);
      setOtherRequest(request);
    },
    [addCustomerOtherRequest],
  );
  return mode ? (
    <OtherRequestShowMode
      otherRequest={otherRequest}
      onEdit={onEditClicked}
    />
  ) : (
    <OtherRequestForm
      initialValue={otherRequest}
      loading={loading}
      addCustomerRequest={handleAddCustomerRequest}
      handleShow={handleShow}
    />
  );
}
