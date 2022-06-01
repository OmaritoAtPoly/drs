import React, { useCallback, useMemo, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import Allergies from "../../../components/domains/customer/background/allergies/Allergies";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useUpdateCustomerAllergiesMutation } from "../../../modules/customer/background/allergies/mutation";

interface Props {
  loading: boolean;
  allergies: Schemas.CustomerAllergies | undefined;
}

const AllergiesContainer = ({ loading, allergies }: Props) => {
  const { id } = useParams<{ id: string }>();

  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleOpenForm = useCallback(() => setOpenForm(!openForm), [
    openForm,
    setOpenForm,
  ]);

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["current-patient-allergies-key"],
    ]);
    queryCache.invalidateQueries(
      [ReactQueryKeys["inter-consultation-background"], { code: id }]);
    setOpenForm(!openForm);
  }, [openForm, id]);

  const {
    mutate,
    loading: loadingMutation,
  } = useUpdateCustomerAllergiesMutation({
    onSuccess,
    showError: true,
  });

  const pillAllergies = useMemo(() => allergies?.medicine, [
    allergies?.medicine,
  ]);

  const otherAllergies = useMemo(() => allergies?.other, [allergies?.other]);

  const noAllergies = useMemo(() => (allergies?.hasAllergies ? allergies.hasAllergies : ""),
    [allergies],
  );

  const handleNewAllergies = useCallback(
    (value: {
      enabled: string;
      medicine: Schemas.CustomerAllergyData[];
      other: string;
    }) => {
      const otherAllergiesValues = value.other
        ?.split("\n")
        .filter((a) => a.trim() !== "");

      // TODO: fix remove disabled prop in mutation
      mutate({
        code: id,
        hasAllergies: value.enabled,
        medicine: value.medicine,
        other: otherAllergiesValues,
      });
    },
    [mutate, id],
  );

  return (
    <Allergies
      loading={loading}
      otherAllergies={otherAllergies}
      pillAllergies={pillAllergies}
      openForm={openForm}
      handleOpenForm={handleOpenForm}
      noAllergies={noAllergies}
      handleNewAllergies={handleNewAllergies}
      loadingMutation={loadingMutation}
    />
  );
};

export default AllergiesContainer;
