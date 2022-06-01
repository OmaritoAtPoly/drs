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
  handleOnAddCustomerImageRequest?: (
    imageRequest: Schemas.ImageRequestRequest,
  ) => void;
  loading: boolean;
  duplicateOption: boolean;
}

export default function DuplicateRequestContainer({
  handleShow,
  requestItem,
  requestName = "",
  handleOnAddCustomerImageRequest = () => {},
  loading,
  duplicateOption,
}: Props) {
  const renderDuplicatorDialog = useMemo(() => {
    switch (requestName) {
      case REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST:
        return (
          <ImageRequest
            handleShow={handleShow}
            initialValue={requestItem}
            loading={loading}
            addCustomerImageRequest={handleOnAddCustomerImageRequest}
            handleViewMode={() => {}}
            mode={duplicateOption}
          />
        );
      case REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST:
        return (
          <LabRequest
            addCustomerLabRequest={handleOnAddCustomerImageRequest}
            handleShow={handleShow}
            handleViewMode={() => {}}
            initialValue={requestItem}
            loading={loading}
            viewMode={duplicateOption}
          />
        );
      case REQUEST_DATA_TYPE.REQUESTS.OTHER_REQUEST:
        return (
          <OtherRequest
            addCustomerOtherRequest={handleOnAddCustomerImageRequest}
            handleShow={handleShow}
            handleViewMode={() => {}}
            initialValue={requestItem}
            loading={loading}
            mode={duplicateOption}
          />
        );
      default:
        return <div />;
    }
  }, [
    requestName,
    duplicateOption,
    handleOnAddCustomerImageRequest,
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
      {renderDuplicatorDialog}
    </LabeledDialog>
  );
}
