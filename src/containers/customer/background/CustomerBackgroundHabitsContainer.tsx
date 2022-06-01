import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import CustomerHabitBackground from "../../../components/domains/customer/background/customerHabits/CustomerHabitsBackground";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useUpdateCustomerHabitsMutation } from "../../../modules/customer/background/medications/mutation";

interface Props {
  loading: boolean;
  habits: Schemas.CustomerHabits | undefined;
  habitOptions: string[];
}

export default function CustomerBackgroundHabitsContainer({
  habits,
  loading: loadingBackground,
  habitOptions,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: code } = useParams() as any;

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["current-patient-allergies-key"],
    ]);
  }, []);

  const { mutate } = useUpdateCustomerHabitsMutation({
    onSuccess,
    showError: true,
  });

  const convertStringToArray = useCallback(
    (text: string | string[] | undefined) => {
      if (Array.isArray(text)) {
        return text;
      }
      if (text !== undefined) {
        return [`${text}`];
      }
      return [];
    },
    [],
  );

  const prepareHabitsList = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (habits: Schemas.CustomerHabitData[] | undefined) =>
      habits?.map((habit) => ({
        habit: habit.habit,
        notes: convertStringToArray(habit.notes),
      })),
    [convertStringToArray],
  );

  const prepareDataToInsert = useCallback(
    (customerHabits: Schemas.CustomerHabits) => ({
      enabled: customerHabits.enabled,
      habits: prepareHabitsList(customerHabits.habits),
    }),
    [prepareHabitsList],
  );

  const handleOnUpdateCustomerPathology = useCallback(
    (customerHabits: Schemas.CustomerHabits) => {
      const data = prepareDataToInsert(customerHabits);
      mutate({
        code,
        ...data,
      });
    },
    [code, mutate, prepareDataToInsert],
  );

  return (
    <CustomerHabitBackground
      customerHabits={habits || { enabled: false, habits: [] }}
      loadingBackground={loadingBackground}
      updateCustomerHabit={handleOnUpdateCustomerPathology}
      habitOptions={habitOptions}
    />
  );
}
