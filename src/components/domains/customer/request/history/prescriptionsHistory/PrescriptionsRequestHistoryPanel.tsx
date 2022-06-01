/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PrescriptionsHistoryContainer from "../../../../../../containers/customer/requests/history/PrescriptionsHistoryContainer";
import RequestHistoryItemSkeleton from "../../../../../skeletons/RequestHistoryItemSkeleton";
import RowSkeleton from "../../../../../skeletons/RowSkeleton";

interface Props {
  professional: Schemas.ProfessionalData;
  customer: Schemas.CustomerData;
  currentProfessionalSpecialties: string[];
  currentProfessionalHeathCenter: Schemas.ProfessionalHealthCenterResponse;
  historicalPrescriptions: Schemas.PrescriptionResponse[];
  loadingPrescriptionsRequestHistory: boolean;
  allergies: Schemas.CustomerAllergies;
  deleteRequest: (code: string) => void;
  loadingDelete?: boolean;
  handleShow: () => void;
}

export default function PrescriptionsRequestHistoryPanel({
  historicalPrescriptions,
  loadingPrescriptionsRequestHistory,
  allergies,
  currentProfessionalSpecialties,
  currentProfessionalHeathCenter,
  deleteRequest,
  loadingDelete = false,
  professional,
  customer,
  handleShow,
}: Props) {
  return loadingPrescriptionsRequestHistory ? (
    <RowSkeleton>
      <>
        <RequestHistoryItemSkeleton />
        <RequestHistoryItemSkeleton />
        <RequestHistoryItemSkeleton />
        <RequestHistoryItemSkeleton />
      </>
    </RowSkeleton>
  ) : (
    <div>
      {historicalPrescriptions.map((prescription) => (
        <PrescriptionsHistoryContainer
          key={prescription.code}
          prescription={prescription}
          deleteRequest={deleteRequest}
          allergies={allergies}
          loadingDelete={loadingDelete}
          professional={professional}
          customer={customer}
          currentProfessionalSpecialties={currentProfessionalSpecialties}
          currentProfessionalHeathCenter={currentProfessionalHeathCenter}
          handleShow={handleShow}
        />
      ))}
    </div>
  );
}
