import React, { useMemo } from "react";
import ImageRequestHistoryPanelContainer from "../../../../../containers/customer/requests/history/ImageRequestHistoryPanelContainer";
import LabRequestHistoryPanelContainer from "../../../../../containers/customer/requests/history/LabRequestHistoryPanelContainer";
import OtherRequestHistoryPanelContainer from "../../../../../containers/customer/requests/history/OtherRequestHistoryPanelContainer";
import { REQUEST_DATA_TYPE } from "../../../../../utils/enums";
import SwitcherDialog, {
  DialogSelectionOptionType,
} from "../../../../dialogs/SwitcherDialog";
import RequestHistoryActionPanel from "./RequestHistoryActionPanel";

interface Props {
  open: boolean;
  options: DialogSelectionOptionType[];
  selectedOption?: string;
  showAddAction?: boolean;
  handleShow: () => void;
  onAddClicked: () => void;
  onCloseClicked: () => void;
  handleOnSelectOption: (value: string) => void;
}

export default function RequestHistory({
  open,
  options,
  selectedOption,
  showAddAction = true,
  handleOnSelectOption,
  handleShow,
  onAddClicked,
  onCloseClicked,
}: Props) {
  const handleOnSelect = (value: string) => {
    handleOnSelectOption(value);
  };

  const renderOption = useMemo(() => {
    switch (selectedOption) {
      case REQUEST_DATA_TYPE.REQUESTS.IMAGE:
        return <ImageRequestHistoryPanelContainer />;
      case REQUEST_DATA_TYPE.REQUESTS.LAB:
        return <LabRequestHistoryPanelContainer />;
      default:
        return <OtherRequestHistoryPanelContainer />;
    }
  }, [selectedOption]);

  return selectedOption ? (
    <SwitcherDialog
      open={open}
      handleShow={handleShow}
      options={options}
      handleOnSelect={handleOnSelect}
      actionPanel={
        <RequestHistoryActionPanel
          showAddAction={showAddAction}
          onAddClicked={onAddClicked}
          onCloseClicked={onCloseClicked}
        />
      }
      defaultValue={selectedOption}>
      {renderOption}
    </SwitcherDialog>
  ) : (
    <div />
  );
}
