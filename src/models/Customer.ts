export type CustomerDataExtendedToCreateOrEdit = Schemas.CustomerData & {
  email?: string;
  token?: string;
  oldLegalID?: string;
  birthDay?: string;
  action?: "create" | "createMain" | "edit";
  section?:
    | "contacts"
    | "emergencyContacts"
    | "generalData"
    | "generalDataNext"
    | "insurance"
    | "medicalHistory";
};
