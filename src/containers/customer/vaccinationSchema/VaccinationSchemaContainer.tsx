/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo } from "react";
import VaccinationScheme from "../../../components/domains/customer/vaccinationScheme/VaccinationScheme";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { useUpdateCustomerVaccinationMutation } from "../../../modules/customer/vaccination/mutation";
import useCustomerVaccinationQuery from "../../../modules/customer/vaccination/query";
import { defaultVaccineSchema } from "../../../utils/defaultData";

const VaccinationSchemaContainer = () => {
  const { patientLegalId } = usePatientCacheSelector({});
  const { data, loading, refetch } = useCustomerVaccinationQuery({
    code: patientLegalId,
  });

  const onSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate } = useUpdateCustomerVaccinationMutation({
    showError: true,
    onSuccess,
  });

  const onUpdate = useCallback(
    (schemas: any) => {
      mutate({ body: schemas, code: patientLegalId });
    },
    [mutate, patientLegalId],
  );

  const customVaccines = useMemo(() => {
    const vaccines: any[] = [];
    if (data) {
      data.categories?.map((category) => {
        if (category.code === "others") {
          return category.items?.map((item) => {
            vaccines.push({
              vaccine: item.name,
              checked: item.enabled,
            });
          });
        }
      });
    }
    return vaccines;
  }, [data]);

  return (
    <VaccinationScheme
      loading={loading}
      schema={data || defaultVaccineSchema}
      onUpdate={onUpdate}
      vaccines={customVaccines}
    />
  );
};

export default VaccinationSchemaContainer;
