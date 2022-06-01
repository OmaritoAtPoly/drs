/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { InfiniteQueryConfig, MutateConfig, QueryConfig } from "react-query";

export interface UseMutationArgs<
  TResult,
  TError = unknown,
  TVariables = unknown,
  TSnapshot = unknown
> extends MutateConfig<any, any, any, any> {
  showError?: boolean;
}

export type UseQueryArgs<TResult, TreatedError> = QueryConfig<any, any> & {
  showError?: boolean;
  exact?: boolean;
};

export type UseInfiniteQueryArgs<TResult, TreatedError> = InfiniteQueryConfig<
  any,
  any
> & {
  showError?: boolean;
  exact?: boolean;
};

export enum ReactQueryKeys {
  "disabled-professional-key" = "disabled-professional-key", // when is disabled from admin
  "tab-index-key" = "tab-index-key",
  "tab-visible-key" = "tab-visible-key",
  "operation-data-key" = "operation-data-key",
  "appointment-operation-data-key" = "appointment-operation-data-key",
  "cities-search-key" = "cities-search-key",
  "insurances-search-key" = "insurances-search-key",
  "insurances-template-key" = "insurances-template-key",
  "token-key" = "token-key",
  "errors-key" = "errors-key",
  "current-professional-id-key" = "current-professional-id-key",
  "selected-customer-to_delete-key" = "selected-customer-to_delete-key",
  "professional-last-new-appointment-record-key" = "professional-last-new-appointment-record-key",
  "enable-user" = "enable-user",
  "current-professional-id-to-show-profile" = "current-professional-id-to-show-profile",
  "user-me-professional" = "user-me-professional",
  "user-validate-email-key" = "user-validate-email-key",
  "action-key" = "action-key",
  "professional-me" = "professional-me",
  "customer-medications-key" = "customer-medications-key",
  "current-patient" = "current-patient",
  "patients" = "patients",
  "patient-appointment-key" = "patient-appointment-key",
  "professional-last-new-appointment-key" = "professional-last-new-appointment-key",
  "current-appointment-id-to-details" = "current-appointment-id-to-details",
  "current-patient-allergies-key" = "current-patient-allergies-key",
  "customer-vaccination-key" = "customer-vaccination-key",
  "customer-signUp-key" = "customer-signUp-key",
  "email-key" = "email-key",
  "current-professional-email-password-key" = "current-professional-email-password-key",
  "customer-lab-category-key" = "customer-lab-category-key",
  "customer-image-category-key" = "customer-image-category-key",
  "customer-diagnose-key" = "customer-diagnose-key",
  "customers-requests-items" = "customers-requests-items",
  "customer-image-request-key" = "customer-image-request-key",
  "customer-last-image-request-key" = "customer-last-image-request-key",
  "customer-image-pdf-key" = "customer-image-pdf-key",
  "customer-lab-request-key" = "customer-lab-request-key",
  "customer-last-lab-request-key" = "customer-last-lab-request-key",
  "get-recipe-key" = "new-recipe-key",
  "default-dr-profession" = "default-dr-profession",
  "patient-certificates-list" = "patient-certificates-list",
  "current-certificate-to-edit" = "current-certificate-to-edit",
  "my-inter-consultation" = "my-inter-consultation",
  "inter-consultation-background" = "inter-consultation-background",
  "current-interconsultation-to-edit" = "current-interconsultation-to-edit",
  "send-patient-by-mail" = "send-patient-by-mail",
  "customer-results-key" = "customer-results-key",
  "my-received-inter-consultation" = "my-received-inter-consultation",
  "specialty-data-key" = "specialty-data-key",
  "customer-prescriptions-key" = "customer-prescriptions-key",
  "professional-assistants-list" = "professional-assistants-list",
  "editable-assistants-id" = "editable-assistants-id",
  "editable-assistants-info" = "editable-assistants-info",
  "professional-subscription" = "professional-subscription",
  "payment-card-key" = "payment-card-key",
  "plan-expired" = "plan-expired",
  "professional-subscription-key" = "professional-subscription-key",
  "professional-current-appointment-key" = "professional-current-appointment-key",
  "current-assistant-info" = "current-assistant-info",
  "customer-current-prescription-key" = "customer-current-prescription-key",
  "customer-last-other-request-key" = "customer-last-other-request-key",
  "customer-other-requests-key" = "customer-other-requests-key",
  "editable-specific-specialty" = "editable-specific-specialty",
  "customer-consent-list" = "customer-consent-list",
  "professional-files-list" = "professional-files-list",
  "availabilities-configuration-key" = "availabilities-configuration-key",
  "professional-appointment-list-key" = "professional-appointment-list-key",
  "faqs-search-key" = "faqs-search-key",
  "professional-appointment-key" = "professional-appointment-key",
  "list-appointments-key" = "list-appointments-key",
  "patient-reports-list" = "patient-reports-list",
  "current-report-to-edit" = "current-report-to-edit",
  "default-history-order" = "default-history-order",
  "professional-schedule-availabilities-key" = "professional-schedule-availabilities-key",
  "app-data-key" = "app-data-key",
  "professional-products-key" = "professional-products-key",
  "current-procedure-to-edit" = "current-procedure-to-edit",
  "patient-procedure-list" = "patient-procedure-list",
  "appointment-order-key" = "appointment-order-key",
  "customer-orders-key" = "customer-orders-key",
  "customer-avatar-request-key" = "customer-avatar-request-key",
  "current-appointment-id-key" = "current-appointment-id-key",
  "next-record-id-key" = "next-record-id-key",
  "professional-customer-background-data-key" = "professional-customer-background-data-key",
  "opened-action-panel-key" = "opened-action-panel-key",
  "action-panel-name-key" = "action-panel-name-key",
  "received-interConsult-key" = "received-interConsult-key",
  "current-customer-result" = "current-customer-result",
  "result-request-type-key" = "result-request-type-key",
}

export enum ReactQueryStaleTime {
  NEVER = Number.POSITIVE_INFINITY,
}

export enum ReactQueryCacheTime {
  NEVER = Number.POSITIVE_INFINITY,
}

export type FetchCreatorArgs =
  | {
      endpoint: "/customer/me";
      method: "GET" | "PUT" | "DELETE";
      body: {};
      headers: {};
    }
  | {
      endpoint: "/user/operation-data";
      method: "GET";
      body: {};
      headers: {};
    }
  | {
      endpoint: "/user/appointment-operation-data";
      method: "GET";
      body: {};
      headers: {};
    }
  | {
      endpoint: "/professional/appointment/create";
      method: "POST";
      body: {};
      headers?: {};
    }
  | {
      endpoint: "/customer/health-data";
      body: Paths.HealthData.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/customer/avatar";
      body: Paths.AvatarData.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/customer/avatar";
      body: Paths.AvatarData.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/user/login";
      body: Paths.Login.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/user/me-professional";
      body: {};
      method: "GET" | "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/me";
      body: {};
      method: "GET" | "PUT";
      headers?: {};
    }
  | {
      endpoint: "/user/send-validation-email";
      body: Paths.SendValidation.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/user/validate-email";
      body: Schemas.EmailCodeRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/user/enable-user";
      body: Schemas.EmailPasswordRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers";
      body: {};
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/laboratories-categories";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/customer/create";
      body: Paths.CreateCustomer.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/images-categories";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "professional/customers";
      body: {};
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/user/register-email";
      body: Paths.Register.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/search-professionals";
      body: Paths.SearchProfessionals.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/create";
      body: Schemas.ProfessionalRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/{code}/certificates";
      body: Schemas.CertificateRequest;
      method: "GET" | "PUT";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/{code}/certificates/{requestCode}";
      body: Paths.DeleteCustomerCertificate.PathParameters;
      method: "DELETE";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/{code}/certificates/{requestCode}/pdf";
      body: Paths.CertificatePdf.PathParameters;
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/{code}/certificates/{requestCode}/send";
      body: Schemas.CustomerAvailabilityRequest;
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/{code}/images/{requestCode}/send";
      body: Schemas.CustomerAvailabilityRequest;
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/user/enable-assistant";
      body: Schemas.AssistantRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/invite-assistant";
      body: Schemas.EmailNameRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/subscriptions";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/assistants/{code}";
      body: {};
      method: "DELETE";
      headers?: {};
    }
  | {
      endpoint: "/user/me";
      body: {};
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional​/digitalSign";
      body: string;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/me";
      body: Schemas.ProfessionalRequest;
      method: "PUT";
      headers?: {};
    }
  | {
      endpoint: "/professional/payment/cards";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/payment/cards";
      body: {};
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/assistants/{code}";
      body: {};
      method: "DELETE";
      headers?: {};
    }
  | {
      endpoint: "/professional/logo";
      body: { base64: string; name: string };
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/digital-sign";
      body: Schemas.FileRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/import";
      body: Paths.ImportCustomers.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/avatar";
      body: Schemas.FileRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/availabilities";
      body: Schemas.ProfessionalAvailabilitiesRequest;
      method: "GET" | "PUT";
      headers?: {};
    }
  | {
      endpoint: "/professional/appointment-duration";
      body: Schemas.ProfessionalAppointmentRequest;
      method: "PUT";
      headers?: {};
    }
  | {
      endpoint: "/professional/appointment/list";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/appointment/create";
      body: Paths.CreateAppointment.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/invite-professionals";
      body: Schemas.EmailsNameRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/current-health-center";
      body: { code: string };
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/electronic-sign";
      body: Schemas.FilePasswordRequest;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/user/app-data";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/products";
      body: {};
      method: "GET" | "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/{code}/procedures/{requestCode}";
      body: {};
      method: "DELETE" | "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/code/procedures/requestCode/send";
      body: {};
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/{code}/procedures/{requestCode}/pdf";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/{code}/procedures";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/products-template";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/products/import";
      body: Paths.ImportProducts.RequestBody;
      method: "POST";
      headers?: {};
    }
  | {
      endpoint: "/professional/customers/next-record-id";
      body: {};
      method: "GET";
      headers?: {};
    }
  | {
      endpoint: "/professional/customer-background-data";
      body: {};
      method: "GET";
      headers?: {};
    };
