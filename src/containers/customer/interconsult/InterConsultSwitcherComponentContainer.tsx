import React, { useCallback, useState } from "react";
import STRINGS from "../../../utils/strings";
import HistoricalInterConsultContainer from "./HistoricalInterConsultContainer";
import InterConsultContainer from "./InterConsultContainer";

interface Props {
  componentName: string;
  open: boolean;
  handleShow: () => void;
}
export default function InterConsultSwitcherComponentContainer({
  componentName,
  open,
  handleShow,
}: Props) {
  const [name, setName] = useState<string>(componentName);

  const handleSwitchComponent = useCallback((component: string) => {
    setName(component);
  }, []);

  const handleOnHistoricalActionClicked = useCallback(() => {
    handleSwitchComponent(STRINGS.buttonGrid.HISTORICAL_INTER_CONSULT);
  }, [handleSwitchComponent]);

  const handleAddOrEditInterConsult = useCallback(() => {
    handleSwitchComponent(STRINGS.buttonGrid.NEW_INTER_CONSULT);
  }, [handleSwitchComponent]);

  const renderComponent = useCallback(() => {
    switch (name) {
      case STRINGS.buttonGrid.NEW_INTER_CONSULT:
        return (
          <InterConsultContainer
            open={open}
            handleShow={handleShow}
            onHistoricalActionClicked={handleOnHistoricalActionClicked}
          />
        );
      case STRINGS.buttonGrid.HISTORICAL_INTER_CONSULT:
        return (
          <HistoricalInterConsultContainer
            open={open}
            handleShow={handleShow}
            onAddNewInterConsult={handleAddOrEditInterConsult}
          />
        );
      default:
        return <div />;
    }
  }, [
    handleAddOrEditInterConsult,
    handleOnHistoricalActionClicked,
    handleShow,
    name,
    open,
  ]);

  return renderComponent();
}
