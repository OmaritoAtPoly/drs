/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import AdjustAccountDialog from "./AdjustAccountDialog";

interface Props {
  showAdjustAccount: boolean;
  handleShow: () => void;
}
export default function AdjustAccountDialogContainer({
  showAdjustAccount,
  handleShow,
}: Props) {
  return (
    <AdjustAccountDialog open={showAdjustAccount} handleShow={handleShow} />
  );
}
