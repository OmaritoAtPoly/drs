export type CustomerProfessionalDataExtendedToCreateOrEdit = Schemas.ProfessionalData & {
  email?: string;
  token?: string;
  oldLegalID?: string;
  birthDay?: string;
  action?: "create" | "createMain" | "edit";
  section?:
    | "contacts"
    | "healthCenters"
    | "generalData"
    | "generalDataNext"
    | "insurance"
    | "professionalData"
    | "additionalProfessionalData";
};
