import { useCallback, useMemo } from "react";
import { queryCache, useQuery } from "react-query";
import { CustomerProfessionalDataExtendedToCreateOrEdit } from "../../models/CustomerProfessional";
import { ReactQueryKeys, ReactQueryStaleTime } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import {
  useProfessionalMailQuery,
  useProfessionalMeQuery,
  useUserMeQuery,
} from "./query";

const userMailAndCodeValidation = {
  email: "",
  code: "",
};

type UserMailAndCodeValidation = typeof userMailAndCodeValidation;

const useProfileCacheSelector = () => {
  const { data: userMe, loading: loadingUserMe } = useUserMeQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
  });

  const { data: currentProfessionalMail } = useProfessionalMailQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
  });

  const {
    data: professionalMe,
    loading: loadingProfessionalMe,
  } = useProfessionalMeQuery({
    retry: false,
    exact: true,
  });

  const configData = useMemo(
    () =>
      userMe?.configData || {
        genders: {},
        phoneTypes: {},
        addressTypes: {},
        bloodTypes: {},
        insurancesStates: {},
        insurances: [],
        healthServices: "FACE_TO_FACE",
        languages: {},
        weekdays: {},
      },
    [userMe],
  );

  const allCustomers = useMemo(
    () => (userMe?.professional ? [userMe?.professional] : []),
    [userMe],
  );

  const userMeConfigData = useMemo<Schemas.ConfigurationData>(
    () => userMe?.configData || {},
    [userMe],
  );
  const email = useMemo(
    () => currentProfessionalMail?.email || userMe?.email || "",
    [currentProfessionalMail?.email, userMe?.email],
  );

  const currentProfessional = useMemo<Schemas.ProfessionalData>(
    () =>
      ({
        ...professionalMe,
        professionalEmail: email,
      } as Schemas.ProfessionalData),
    [email, professionalMe],
  );

  const mainPhonesOrDefault = useCallback(
    (phoneType: "HOME" | "MOBILE", firstAsDefault = false) => {
      // eslint-disable-next-line curly
      if (!currentProfessional || !currentProfessional?.phones)
        // eslint-disable-next-line nonblock-statement-body-position
        return undefined;
      const result = currentProfessional.phones.find(
        (t) => t.label === "Yo" && t.phoneType === phoneType,
      );
      const phoneOrDefault = result || currentProfessional.phones[0];
      return firstAsDefault ? phoneOrDefault : result;
    },
    [currentProfessional],
  );

  const { data: currentCustomerIdToShowProfile } = useQuery<
    { legalID: string },
    TreatedError
  >(
    [ReactQueryKeys["current-professional-id-to-show-profile"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["current-professional-id-to-show-profile"],
      ]) as unknown) as Promise<{ legalID: string }>,
    {
      staleTime: ReactQueryStaleTime.NEVER,
    },
  );

  const currentCustomerToShowProfile = useMemo(() => professionalMe, [
    professionalMe,
  ]);

  const hasActiveSubscription = useMemo(
    () =>
      !(
        currentProfessional?.subscription &&
        currentProfessional.subscription.days &&
        currentProfessional.subscription.days < 0
      ),
    [currentProfessional],
  );

  const isAssistant = useCallback(() => !!currentProfessional?.isAssistant, [
    currentProfessional?.isAssistant,
  ]);

  const currentProfessionalLanguages = useMemo(() => {
    let professionalLanguages: string[] = [];
    if (currentProfessional?.languagesList) {
      professionalLanguages = Object.values(currentProfessional.languagesList);
    }

    return professionalLanguages;
  }, [currentProfessional?.languagesList]);

  const currentProfessionalSpecialties = useMemo(() => {
    const currentSpecialties = currentProfessional?.specialties?.map(
      (l) =>
        currentProfessional.specialtiesList?.find((d) => d.code === l)?.name ||
        l,
    );
    return currentSpecialties;
  }, [currentProfessional?.specialtiesList, currentProfessional?.specialties]);

  const currentProfessionalInsurances = useMemo(() => {
    const currentInsurances = currentProfessional?.insurances?.map(
      (l) =>
        currentProfessional.insurancesList?.find((d) => d.code === l)?.name ||
        l,
    );
    return currentInsurances;
  }, [currentProfessional?.insurancesList, currentProfessional?.insurances]);

  const currentProfessionalHeathCenter = useMemo(() => {
    if (!currentProfessional || !currentProfessional?.healthCenters) {
      return undefined;
    }
    return (
      currentProfessional?.healthCenters?.find((h) => h.current === true) ||
      currentProfessional?.healthCenters[0]
    );
  }, [currentProfessional]);

  const isBasicSubscriptionPlan = useMemo(
    () => currentProfessional?.subscription?.code?.includes("basic"),
    [currentProfessional?.subscription?.code],
  );

  return {
    configData,
    loadingMainCustomer: loadingProfessionalMe,
    loadingUserMe,
    mainPhonesOrDefault,
    allCustomers,
    userMeConfigData,
    email,
    currentProfessional,
    currentCustomerToShowProfile,
    loadingCurrentCustomer: loadingProfessionalMe,
    currentCustomerIdToShowProfile,
    hasActiveSubscription,
    isAssistant,
    currentProfessionalLanguages,
    currentProfessionalSpecialties,
    currentProfessionalInsurances,
    currentProfessionalHeathCenter,
    isBasicSubscriptionPlan,
  };
};

export const useSaveCurrentProfessionalIdSelector = () => {
  const saveCurrentProfessionalId = useCallback((data: { legalID: string }) => {
    queryCache.setQueryData<{ legalID: string }>(
      ReactQueryKeys["current-professional-id-key"],
      data,
    );
  }, []);
  return { saveCurrentProfessionalId };
};

export const useSaveCurrentProfessionalIdToShowProfileSelector = () => {
  const saveCurrentProfessionalIdToShowProfile = useCallback(
    (data: { legalID: string }) => {
      queryCache.setQueryData(
        ReactQueryKeys["current-professional-id-to-show-profile"],
        data,
        { staleTime: ReactQueryStaleTime.NEVER },
      );
    },
    [],
  );
  return { saveCurrentProfessionalIdToShowProfile };
};

export const useEnableUserSelector = () => {
  const { data: enableUser } = useQuery<
    Partial<CustomerProfessionalDataExtendedToCreateOrEdit>,
    TreatedError
  >([ReactQueryKeys["enable-user"]], { staleTime: ReactQueryStaleTime.NEVER });
  const saveEnableUser = useCallback(
    (data?: Partial<CustomerProfessionalDataExtendedToCreateOrEdit>) => {
      queryCache.setQueryData(ReactQueryKeys["enable-user"], data, {
        staleTime: ReactQueryStaleTime.NEVER,
      });
    },
    [],
  );
  return { saveEnableUser, enableUser };
};

export const useEmailCodeAfterValidateSelector = () => {
  const { data: emailCodeAfterValidate } = useQuery<
    UserMailAndCodeValidation,
    TreatedError
  >([ReactQueryKeys["user-validate-email-key"]], {
    structuralSharing: false,
  } as Object);
  const saveEmailCodeAfterValidate = useCallback(
    (data: { code: string; email?: string }) => {
      queryCache.setQueryData(
        [ReactQueryKeys["user-validate-email-key"]],
        data,
      );
    },
    [],
  );
  return { emailCodeAfterValidate, saveEmailCodeAfterValidate };
};

export default useProfileCacheSelector;
