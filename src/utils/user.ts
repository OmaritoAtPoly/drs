/* eslint-disable import/prefer-default-export */
import moment from "moment";
import { ValueAndLabelType } from "./types";
import getNoReferText from "./customerBackground";

export const fullName = (
  customer?: Schemas.CustomerData | Schemas.ProfessionalData,
) => {
  if (!customer) return "";
  return `${customer.firstName} ${customer.firstFamilyName || ""}`;
};

// eslint-disable-next-line no-confusing-arrow
export const getGenderLabel = (genders: ValueAndLabelType[], sex?: string) => {
  if (!sex) return "";
  const find = genders.find((f) => f.value === sex);
  return find?.label || "";
};

export const age = (
  customer?: Schemas.CustomerData | Schemas.ProfessionalData,
) => {
  if (!customer) return { years: 0, months: 0 };
  const today = moment();
  const birthDay = moment(
    new Date(
      customer.birthdateYear,
      customer.birthdateMonth - 1,
      customer.birthdateDay,
    ),
  );
  const theAge = moment.duration(today.diff(birthDay));
  const years = theAge.years();
  const months = theAge.months();
  return { years, months };
};

export const mainPhonesOrDefault = (
  phoneType: "HOME" | "MOBILE",
  customer?: Schemas.CustomerData | Schemas.ProfessionalData,
) => {
  // eslint-disable-next-line curly
  if (!customer || !customer?.phones)
    // eslint-disable-next-line nonblock-statement-body-position
    return undefined;
  const result = customer.phones.find(
    (t) => t.label === "Yo" && t.phoneType === phoneType,
  );
  const phoneOrDefault =
    result || (customer.phones.length > 0 ? customer.phones[0] : undefined);
  return phoneOrDefault
    ? `(+${phoneOrDefault.prefix}) ${phoneOrDefault.number}`
    : "";
};

export const mainPhoneMobile = (
  customer?: Schemas.CustomerData | Schemas.ProfessionalData,
) => {
  // eslint-disable-next-line curly
  if (!customer || !customer?.phones)
    // eslint-disable-next-line nonblock-statement-body-position
    return undefined;
  return customer.phones.find(
    (t) => t.label === "Yo" && t.phoneType === "MOBILE",
  );
};

export const mainPhone = (
  customer?: Schemas.CustomerData | Schemas.ProfessionalData,
) => {
  // eslint-disable-next-line curly
  if (!customer || !customer?.phones)
    // eslint-disable-next-line nonblock-statement-body-position
    return undefined;
  return customer.phones.find(
    (t) => t.label === "Yo" && t.phoneType === "HOME",
  );
};

export const contactPhone = (
  customer?: Schemas.CustomerData | Schemas.ProfessionalData,
) => {
  // eslint-disable-next-line curly
  if (!customer || !customer?.phones)
    // eslint-disable-next-line nonblock-statement-body-position
    return undefined;
  return customer.phones.find((t) => t.phoneType === "CONTACT");
};

export const mainAddress = (
  addressType: "HOME" | "WORK",
  customer?: Schemas.CustomerData,
) => {
  if (customer && customer.addresses && customer.addresses.length) {
    return customer.addresses.find((t) => t.addressType === addressType);
  }
  return undefined;
};

export const contactAddress = (customer?: Schemas.CustomerData) => {
  if (!customer || !customer?.addresses) return undefined;
  return customer.addresses.find((t) => t.addressType === "CONTACT");
};

export const getCityName = (customer?: Schemas.CustomerData) => {
  if (!customer) return "";
  const address = mainAddress("HOME", customer) as
    | Schemas.CustomerAddressData
    | undefined;
  return address ? address.cityName : "";
};

export const maritalStatusesMemo = (
  customer: Schemas.CustomerData,
  maritalStatuses: { [name: string]: string },
) => {
  if (!customer) return "";
  let status = "";
  if (customer.maritalStatus) {
    status = maritalStatuses ? maritalStatuses[customer.maritalStatus] : "";
  }
  return status;
};

export const bloodTypesMemo = (
  customer: Schemas.CustomerData,
  bloodTypes?: { [name: string]: string },
) => {
  if (!customer) return "";
  let bloodTypeValue = "";
  if (customer.health?.bloodType && bloodTypes) {
    bloodTypeValue = bloodTypes[customer.health?.bloodType] || "";
  }
  return bloodTypeValue;
};

export const referAllergyText = (patient?: Schemas.CustomerData) => {
  if (!patient) return "";
  return getNoReferText(patient.gender || "", "ALLERGY");
};
