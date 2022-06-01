import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import ImageRequest from "../../../components/domains/customer/request/image/ImageRequest";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import {
  useAddCustomerImageRequestMutation,
  useEditCustomerImageRequestMutation,
} from "../../../modules/customer/request/mutation";
import useHandlerError from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";

interface Props {
  handleShow: () => void;
  handleViewMode: () => void;
  viewMode: boolean;
}

export default function ImageRequestContainer({
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
    (data: Schemas.ImageRequestResponse) => {
      queryCache.setQueryData(
        ReactQueryKeys["customer-last-image-request-key"],
        data,
      );
      setRequestCode(data.code || "");
      queryCache.invalidateQueries(
        ReactQueryKeys["customer-image-request-key"],
      );
      setEditMode(true);
      handleViewMode();
    },
    [handleViewMode],
  );

  const {
    mutate: mutateAdd,
    loading: adding,
  } = useAddCustomerImageRequestMutation({
    onSuccess,
    showError: true,
  });

  const {
    mutate: mutateEdit,
    loading: editing,
  } = useEditCustomerImageRequestMutation({
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
          ...imageRequest,
          appointment: appointmentId,
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_MESSAGE);
      }
    },
    [appointmentId, code, handlerError, mutateAdd],
  );

  const handleOnEditCustomerImageRequest = useCallback(
    (imageRequest: Schemas.ImageRequestRequest) => {
      if (
        imageRequest &&
        imageRequest.diagnoses &&
        imageRequest.items &&
        imageRequest.diagnoses?.length > 0 &&
        imageRequest.items?.length > 0
      ) {
        mutateEdit({
          code,
          requestCode,
          ...imageRequest,
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_MESSAGE);
      }
    },
    [code, handlerError, mutateEdit, requestCode],
  );

  const onSubmit = useCallback(
    (imageRequest: Schemas.ImageRequestRequest) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      editMode
        ? handleOnEditCustomerImageRequest(imageRequest)
        : handleOnAddCustomerImageRequest(imageRequest);
    },
    [
      editMode,
      handleOnAddCustomerImageRequest,
      handleOnEditCustomerImageRequest,
    ],
  );

  return (
    <ImageRequest
      addCustomerImageRequest={onSubmit}
      handleShow={handleShow}
      initialValue={{ diagnoses: [], items: [] }}
      handleViewMode={handleViewMode}
      loading={adding || editing}
      mode={viewMode}
    />
  );
}
