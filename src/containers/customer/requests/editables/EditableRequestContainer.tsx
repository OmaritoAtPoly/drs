import React, { useMemo } from "react";
import LabeledDialog from "../../../../components/dialogs/LabeledDialog";
import ImageRequest from "../../../../components/domains/customer/request/image/ImageRequest";
import LabRequest from "../../../../components/domains/customer/request/laboratory/LaboratoryRequest";
import OtherRequest from "../../../../components/domains/customer/request/other/OtherRequest";
import { REQUEST_DATA_TYPE } from "../../../../utils/enums";

interface Props {
  handleShow: () => void;
  requestItem: Schemas.LaboratoryRequestRequest | Schemas.ImageRequestRequest;
  requestName?: string;
  handleOnEditCustomerRequest?: (
    imageRequest: Schemas.ImageRequestRequest,
  ) => void;
  loading: boolean;
  editableOption: boolean;
}

export default function EditableRequestContainer({
  handleShow,
  requestItem,
  requestName = "",
  handleOnEditCustomerRequest = () => {},
  loading,
  editableOption,
}: Props) {
  const renderEditorDialog = useMemo(() => {
    switch (requestName) {
      case REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST:
        return (
          <ImageRequest
            handleShow={handleShow}
            initialValue={requestItem}
            loading={loading}
            addCustomerImageRequest={handleOnEditCustomerRequest}
            handleViewMode={() => {}}
            mode={editableOption}
          />
        );
      case REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST:
        return (
          <LabRequest
            addCustomerLabRequest={handleOnEditCustomerRequest}
            handleShow={handleShow}
            handleViewMode={() => {}}
            initialValue={requestItem}
            loading={loading}
            viewMode={editableOption}
          />
        );
      case REQUEST_DATA_TYPE.REQUESTS.OTHER_REQUEST:
        return (
          <OtherRequest
            addCustomerOtherRequest={handleOnEditCustomerRequest}
            handleShow={handleShow}
            handleViewMode={() => {}}
            initialValue={requestItem}
            loading={loading}
            mode={editableOption}
          />
        );
      default:
        return <> </>;
    }
  }, [
    requestName,
    editableOption,
    handleOnEditCustomerRequest,
    handleShow,
    loading,
    requestItem,
  ]);

  return (
    <LabeledDialog
      open
      handleShow={handleShow}
      label={requestName}
      onHistoryClicked={handleShow}>
      {renderEditorDialog}
    </LabeledDialog>
  );
}
