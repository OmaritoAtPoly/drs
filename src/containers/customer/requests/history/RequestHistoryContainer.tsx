/* eslint-disable no-nested-ternary */
import React, { useCallback } from "react";
import { queryCache } from "react-query";
import RequestHistory from "../../../../components/domains/customer/request/history/RequestHistory";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import { useCustomerActionCacheSelector } from "../../../../modules/customer/customerActionCacheSelector";
import { useDefaultHistoryOrderQuery } from "../../../../modules/customer/request/history/query";
import { REQUEST_DATA_TYPE } from "../../../../utils/enums";
import STRINGS from "../../../../utils/strings";

interface Props {
  open: boolean;
  showAddAction?: boolean;
  handleShow: () => void;
}

export default function RequestHistoryContainer({
  open,
  showAddAction = true,
  handleShow,
}: Props) {
  const { setActionPanelName } = useCustomerActionCacheSelector();
  const { data: defaultHistoryOrder } = useDefaultHistoryOrderQuery();

  const handleOnSelectedOption = useCallback((value: string) => {
    queryCache.setQueryData([ReactQueryKeys["default-history-order"]], {
      value,
    });
  }, []);

  const handleAddRequest = useCallback(() => {
    switch (defaultHistoryOrder?.value) {
      case REQUEST_DATA_TYPE.REQUESTS.IMAGE:
        setActionPanelName(STRINGS.buttonGrid.RX_REQUESTS);
        break;
      case REQUEST_DATA_TYPE.REQUESTS.LAB:
        setActionPanelName(STRINGS.buttonGrid.LAB_REQUESTS);
        break;
      default:
        setActionPanelName(STRINGS.buttonGrid.OTHER_REQUEST);
        break;
    }
  }, [defaultHistoryOrder?.value, setActionPanelName]);

  return (
    <RequestHistory
      open={open}
      showAddAction={showAddAction}
      options={REQUEST_DATA_TYPE.REQUESTS.HISTORICAL_SELECTABLE_OPTIONS}
      selectedOption={defaultHistoryOrder?.value || ""}
      handleOnSelectOption={handleOnSelectedOption}
      handleShow={handleShow}
      onAddClicked={handleAddRequest}
      onCloseClicked={handleShow}
    />
  );
}
