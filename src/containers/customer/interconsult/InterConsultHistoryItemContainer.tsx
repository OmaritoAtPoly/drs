/* eslint-disable react/no-array-index-key */
import React from "react";
import InterConsultHistoryItem from "../../../components/domains/customer/interconsult/history/InterConsultHistoryItem";

interface Props {
  index: number;
  date: string;
  time: string;
  professionalName: string;
  diagnosis: string[];
  reason: string;
  visited: boolean;
  attachment: boolean;
  deleteLoading: boolean;
  attachmentLoading: boolean;
  informActionLabel: string;
  haveReport: boolean;
  affectedInterConsultCode: string;
  currentInterConsultCode: string;
  specialty: string;
  loadingPrintClicked?: boolean;
  loadingMailClicked?: boolean;
  loadingCellClicked?: boolean;
  fromrecievedInterconsult?: boolean;
  onInterConsultSheetClicked: () => void;
  onDeleteClicked: () => void;
  onReportClicked: () => void;
  handleMailClicked?: () => void;
  handleCellClicked?: () => void;
  handlePrintClicked?: () => void;
}

export default function InterConsultHistoryItemContainer(props: Props) {
  return <InterConsultHistoryItem {...props} />;
}
