import React from "react";
import BadgedButton from "../../../../buttons/BadgedButton";

interface Props {
  onPatientCellClicked?: () => void;
  onPrintClicked?: () => void;
  onHistoryClicked: () => void;
  onMailClicked?: () => void;
  loadingPdf?: boolean;
  sendingEmail: boolean;
  sendingCell: boolean;
}

const ActionPanel = ({
  onPatientCellClicked,
  onPrintClicked,
  onHistoryClicked,
  onMailClicked,
  loadingPdf = false,
  sendingEmail,
  sendingCell,
}: Props) => (
  <div>
    {onPatientCellClicked && (
      <BadgedButton
        onClick={onPatientCellClicked}
        iconName="cellLogo"
        iconWidth={15}
        iconHeight={15}
        loading={sendingCell}
      />
    )}
    {onMailClicked && (
      <BadgedButton
        onClick={onMailClicked}
        iconName="mail"
        iconWidth={15}
        iconHeight={15}
        loading={sendingEmail}
      />
    )}
    {onPrintClicked && (
      <BadgedButton
        onClick={onPrintClicked}
        iconName="print"
        iconWidth={15}
        iconHeight={15}
        loading={loadingPdf}
      />
    )}
    <BadgedButton
      onClick={onHistoryClicked}
      iconName="timeBack"
      iconWidth={15}
      iconHeight={15}
    />
  </div>
);

export default ActionPanel;
