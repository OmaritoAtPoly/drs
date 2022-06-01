import React, { useMemo } from "react";
import { queryCache } from "react-query";
import ImageRequestContainer from "../../../../containers/customer/requests/ImageRequestContainer";
import LabRequestContainer from "../../../../containers/customer/requests/LabRequestContainer";
import OtherRequestContainer from "../../../../containers/customer/requests/OtherRequestContainer";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import { useDefaultHistoryOrderQuery } from "../../../../modules/customer/request/history/query";
import { REQUEST_DATA_TYPE } from "../../../../utils/enums";
import SwitcherDialog, {
  DialogSelectionOptionType,
} from "../../../dialogs/SwitcherDialog";
import ViewModeActionPanel from "./ViewModeActionPanel";

interface Props {
  handleShow: () => void;
  handleViewMode: () => void;
  onHistoryClicked?: () => void;
  onPatientCellClicked: () => void;
  onPrintClicked: () => void;
  onViewModeHistoryClicked: () => void;
  onMailClicked: () => void;
  open: boolean;
  options: DialogSelectionOptionType[];
  viewMode: boolean;
  loadingPdf?: boolean;
  sendingEmail?: boolean;
  sendingCell?: boolean;
  handleClose?: () => void;
}

export default function Request({
  handleShow,
  handleViewMode,
  onHistoryClicked,
  onPatientCellClicked,
  onPrintClicked,
  onViewModeHistoryClicked,
  onMailClicked,
  handleClose,
  open,
  options,
  viewMode,
  loadingPdf = false,
  sendingEmail = false,
  sendingCell = false,
}: Props) {
  const { data: defaultHistoryOrder } = useDefaultHistoryOrderQuery();

  const handleOnSelect = (value: string) => {
    queryCache.setQueryData([ReactQueryKeys["default-history-order"]], {
      value,
    });
  };

  const renderOption = useMemo(() => {
    switch (defaultHistoryOrder?.value) {
      case REQUEST_DATA_TYPE.REQUESTS.IMAGE:
        return (
          <ImageRequestContainer
            viewMode={viewMode}
            handleShow={handleShow}
            handleViewMode={handleViewMode}
          />
        );
      case REQUEST_DATA_TYPE.REQUESTS.LAB:
        return (
          <LabRequestContainer
            viewMode={viewMode}
            handleShow={handleShow}
            handleViewMode={handleViewMode}
          />
        );
      default:
        return (
          <OtherRequestContainer
            viewMode={viewMode}
            handleShow={handleShow}
            handleViewMode={handleViewMode}
          />
        );
    }
  }, [defaultHistoryOrder?.value, handleShow, handleViewMode, viewMode]);

  return (
    <SwitcherDialog
      open={open}
      defaultValue={defaultHistoryOrder?.value}
      options={options}
      handleShow={handleShow}
      actionPanel={
        viewMode ? (
          <ViewModeActionPanel
            onHistoryClicked={onViewModeHistoryClicked}
            onPatientCellClicked={onPatientCellClicked}
            onPrintClicked={onPrintClicked}
            loadingPdf={loadingPdf}
            onMailClicked={onMailClicked}
            sendingEmail={sendingEmail}
            sendingCell={sendingCell}
            handleClose={handleClose}
          />
        ) : (
          <ViewModeActionPanel
            onHistoryClicked={onViewModeHistoryClicked}
            handleClose={handleShow}
          />
        )
      }
      handleOnSelect={handleOnSelect}
      onHistoryClicked={onHistoryClicked}>
      {renderOption}
    </SwitcherDialog>
  );
}
