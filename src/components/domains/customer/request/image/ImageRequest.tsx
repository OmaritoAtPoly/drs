/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";
import ImageRequestForm from "./ImageRequestForm";
import ImageRequestShowMode from "./ImageRequestShowMode";

interface Props {
  addCustomerImageRequest: (imageRequest: Schemas.ImageRequestRequest) => void;
  handleShow: () => void;
  handleViewMode: () => void;
  mode: boolean;
  loading: boolean;
  initialValue: Schemas.ImageRequestRequest;
}

export default function ImageRequest({
  addCustomerImageRequest,
  handleShow,
  handleViewMode,
  mode,
  initialValue,
  loading,
}: Props) {
  const [imageRequest, setImageRequest] = useState<Schemas.ImageRequestRequest>(
    initialValue,
  );

  const onEditClicked = useCallback(() => {
    handleViewMode();
  }, [handleViewMode]);

  const handleAddCustomerImageRequest = useCallback(
    (request: Schemas.ImageRequestRequest) => {
      addCustomerImageRequest(request);
      setImageRequest(request);
    },
    [addCustomerImageRequest],
  );
  return mode ? (
    <ImageRequestShowMode
      imageRequest={imageRequest}
      onEdit={onEditClicked}
    />
  ) : (
    <ImageRequestForm
      addCustomerImageRequest={handleAddCustomerImageRequest}
      handleShow={handleShow}
      initialValue={imageRequest}
      loading={loading}
    />
  );
}
