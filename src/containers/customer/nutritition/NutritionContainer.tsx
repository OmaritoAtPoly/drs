/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import NutritionCustomer from "../../../components/domains/customer/nutrittion/NutritionCustomer";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useBackgroundPatientCacheSelector } from "../../../modules/customer/background/cacheSelector";
import { useUpdateCustomerNutrition } from "../../../modules/customer/background/nutrition/mutation";
import { useFetchPatientBackgroundDataQuery } from "../../../modules/customer/background/query";
import { defaultBackgroundData } from "../../../utils/defaultData";
import { CustomerNutritionItem } from "../../../utils/types";

export default function NutritionContainer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: code } = useParams() as any;
  const {
    nutrition,
    loading: loadingBackground,
  } = useBackgroundPatientCacheSelector();
  const {
    loading: loadingBackgroundData,
    data,
  } = useFetchPatientBackgroundDataQuery({ showError: true });

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["current-patient-allergies-key"],
    ]);
  }, []);

  const { mutate } = useUpdateCustomerNutrition({
    onSuccess,
    showError: true,
  });

  const covertArrayToObject = useCallback(
    (customerNutritionItems: CustomerNutritionItem[]) => {
      const nutritionObject = {} as Record<string, string>;
      // eslint-disable-next-line array-callback-return
      customerNutritionItems.map((nutritionItem, index) => {
        nutritionObject[`meal${index + 1}`] = nutritionItem.name;
        nutritionObject[`meal${index + 1}Description`] =
          nutritionItem.description;
      });
      return nutritionObject;
    },
    [],
  );

  const handleOnUpdateCustomerNutrition = useCallback(
    (
      appetiteLevel: string,
      dailyGlassesOfWater: number,
      customerNutritionItems: CustomerNutritionItem[],
    ) => {
      mutate({
        code,
        appetiteLevel,
        dailyGlassesOfWater,
        ...covertArrayToObject(customerNutritionItems),
      });
    },
    [code, covertArrayToObject, mutate],
  );

  const getItems = useCallback(() => {
    const items = Object.values(nutrition || []);
    const nutritionItemResult: CustomerNutritionItem[] = [];
    for (let i = 2; i < items.length; i += 2) {
      if (items[i]) {
        nutritionItemResult.push({ name: items[i], description: items[i + 1] });
      }
    }
    return nutritionItemResult;
  }, [nutrition]);

  const nutritionItems: CustomerNutritionItem[] = useMemo(
    () => (loadingBackground ? [] : getItems()),
    [getItems, loadingBackground],
  );

  return (
    <NutritionCustomer
      appetiteLevel={nutrition?.appetiteLevel || ""}
      dailyGlassesOfWater={nutrition?.dailyGlassesOfWater || 0}
      customerNutritionItems={nutritionItems}
      loadingBackground={loadingBackground}
      customerBackgroundData={data || defaultBackgroundData}
      updateCustomerNutrition={handleOnUpdateCustomerNutrition}
    />
  );
}
