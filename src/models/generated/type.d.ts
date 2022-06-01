declare namespace Schemas {
  export interface AdmissionNoteRequest {
    admissionDateTime?: DateTimeObject;
    hospitalCode?: string;
    healthCenterCode?: string;
    customPlace?: string;
    admissionType?: string;
    specialtyCode?: string;
    diagnoses?: Diagnose[];
    procedure?: string[];
    procedureDateTime?: DateTimeObject;
    specialRequirements?: string[];
    instrumental?: string[];
    indications?: string[];
    notes?: string[];
  }
  export interface AdmissionNoteResponse {
    admissionDateTime?: DateTimeObject;
    hospitalCode?: string;
    healthCenterCode?: string;
    customPlace?: string;
    admissionType?: string;
    specialtyCode?: string;
    diagnoses?: Diagnose[];
    procedure?: string[];
    procedureDateTime?: DateTimeObject;
    specialRequirements?: string[];
    instrumental?: string[];
    indications?: string[];
    notes?: string[];
    createdAt?: DateTimeObject;
    code?: string;
  }
  export interface ApiResponseAdmissionNoteResponse {
    message?: string;
    data?: AdmissionNoteResponse;
  }
  export interface ApiResponseAppData {
    message?: string;
    data?: AppData;
  }
  export interface ApiResponseAppointmentData {
    message?: string;
    data?: AppointmentData;
  }
  export interface ApiResponseAppointmentOperationData {
    message?: string;
    data?: AppointmentOperationData;
  }
  export interface ApiResponseAppointmentOrderData {
    message?: string;
    data?: AppointmentOrderData;
  }
  export interface ApiResponseAppointmentRecordResponse {
    message?: string;
    data?: AppointmentRecordResponse;
  }
  export interface ApiResponseAssistantRequest {
    message?: string;
    data?: AssistantRequest;
  }
  export interface ApiResponseAssistantResponse {
    message?: string;
    data?: AssistantResponse;
  }
  export interface ApiResponseBoolean {
    message?: string;
    data?: boolean;
  }
  export interface ApiResponseCertificateResponse {
    message?: string;
    data?: CertificateResponse;
  }
  export interface ApiResponseCustomerAllergies {
    message?: string;
    data?: CustomerAllergies;
  }
  export interface ApiResponseCustomerBackground {
    message?: string;
    data?: CustomerBackground;
  }
  export interface ApiResponseCustomerBackgroundData {
    message?: string;
    data?: CustomerBackgroundData;
  }
  export interface ApiResponseCustomerData {
    message?: string;
    data?: CustomerData;
  }
  export interface ApiResponseCustomerFamilyPathologies {
    message?: string;
    data?: CustomerFamilyPathologies;
  }
  export interface ApiResponseCustomerGynecologyData {
    message?: string;
    data?: CustomerGynecologyData;
  }
  export interface ApiResponseCustomerHabits {
    message?: string;
    data?: CustomerHabits;
  }
  export interface ApiResponseCustomerHealthRequest {
    message?: string;
    data?: CustomerHealthRequest;
  }
  export interface ApiResponseCustomerNutritionData {
    message?: string;
    data?: CustomerNutritionData;
  }
  export interface ApiResponseCustomerPathologies {
    message?: string;
    data?: CustomerPathologies;
  }
  export interface ApiResponseCustomerPendentResume {
    message?: string;
    data?: CustomerPendentResume;
  }
  export interface ApiResponseCustomerPsychiatricData {
    message?: string;
    data?: CustomerPsychiatricData;
  }
  export interface ApiResponseCustomerSurgicalData {
    message?: string;
    data?: CustomerSurgicalData;
  }
  export interface ApiResponseCustomerVaccinationData {
    message?: string;
    data?: CustomerVaccinationData;
  }
  export interface ApiResponseError {
    message?: string;
  }
  export interface ApiResponseEvolutionResponse {
    message?: string;
    data?: EvolutionResponse;
  }
  export interface ApiResponseGoogleFitData {
    message?: string;
    data?: GoogleFitData;
  }
  export interface ApiResponseGuideCategoryData {
    message?: string;
    data?: GuideCategoryData;
  }
  export interface ApiResponseImageRequestResponse {
    message?: string;
    data?: ImageRequestResponse;
  }
  export interface ApiResponseImageResponse {
    message?: string;
    data?: ImageResponse;
  }
  export interface ApiResponseImageResultItem {
    message?: string;
    data?: ImageResultItem;
  }
  export interface ApiResponseImageResultResponse {
    message?: string;
    data?: ImageResultResponse;
  }
  export interface ApiResponseInformedConsentResponse {
    message?: string;
    data?: InformedConsentResponse;
  }
  export interface ApiResponseInterConsultationReq {
    message?: string;
    data?: InterConsultationReq;
  }
  export interface ApiResponseInterConsultationResp {
    message?: string;
    data?: InterConsultationResp;
  }
  export interface ApiResponseInterConsultationResponse {
    message?: string;
    data?: InterConsultationResponse;
  }
  export interface ApiResponseLaboratoryRequestResponse {
    message?: string;
    data?: LaboratoryRequestResponse;
  }
  export interface ApiResponseLaboratoryResponse {
    message?: string;
    data?: LaboratoryResponse;
  }
  export interface ApiResponseLaboratoryResultItem {
    message?: string;
    data?: LaboratoryResultItem;
  }
  export interface ApiResponseLaboratoryResultResponse {
    message?: string;
    data?: LaboratoryResultResponse;
  }
  export interface ApiResponseListAdmissionNoteResponse {
    message?: string;
    data?: AdmissionNoteResponse[];
  }
  export interface ApiResponseListAssistantResponse {
    message?: string;
    data?: AssistantResponse[];
  }
  export interface ApiResponseListAvailabilityData {
    message?: string;
    data?: AvailabilityData[];
  }
  export interface ApiResponseListAvailabilityRange {
    message?: string;
    data?: AvailabilityRange[];
  }
  export interface ApiResponseListCategoryData {
    message?: string;
    data?: CategoryData[];
  }
  export interface ApiResponseListCategoryExamData {
    message?: string;
    data?: CategoryExamData[];
  }
  export interface ApiResponseListCertificateResponse {
    message?: string;
    data?: CertificateResponse[];
  }
  export interface ApiResponseListCountryData {
    message?: string;
    data?: CountryData[];
  }
  export interface ApiResponseListCustomerMedicationData {
    message?: string;
    data?: CustomerMedicationData[];
  }
  export interface ApiResponseListDiagnose {
    message?: string;
    data?: Diagnose[];
  }
  export interface ApiResponseListEvolutionResponse {
    message?: string;
    data?: EvolutionResponse[];
  }
  export interface ApiResponseListGuideCategoryData {
    message?: string;
    data?: GuideCategoryData[];
  }
  export interface ApiResponseListImageRequestResponse {
    message?: string;
    data?: ImageRequestResponse[];
  }
  export interface ApiResponseListImageResultItem {
    message?: string;
    data?: ImageResultItem[];
  }
  export interface ApiResponseListImportResult {
    message?: string;
    data?: ImportResult[];
  }
  export interface ApiResponseListInformedConsentResponse {
    message?: string;
    data?: InformedConsentResponse[];
  }
  export interface ApiResponseListInterConsultationResponse {
    message?: string;
    data?: InterConsultationResponse[];
  }
  export interface ApiResponseListLaboratoryRequestResponse {
    message?: string;
    data?: LaboratoryRequestResponse[];
  }
  export interface ApiResponseListLaboratoryResultItem {
    message?: string;
    data?: LaboratoryResultItem[];
  }
  export interface ApiResponseListOtherRequestResponse {
    message?: string;
    data?: OtherRequestResponse[];
  }
  export interface ApiResponseListOtherResultItem {
    message?: string;
    data?: OtherResultItem[];
  }
  export interface ApiResponseListPhysicalExamData {
    message?: string;
    data?: PhysicalExamData[];
  }
  export interface ApiResponseListPrescriptionResponse {
    message?: string;
    data?: PrescriptionResponse[];
  }
  export interface ApiResponseListProcedureResponse {
    message?: string;
    data?: ProcedureResponse[];
  }
  export interface ApiResponseListProfessionalFileResponse {
    message?: string;
    data?: ProfessionalFileResponse[];
  }
  export interface ApiResponseListProfessionalScheduleData {
    message?: string;
    data?: ProfessionalScheduleData[];
  }
  export interface ApiResponseListReportResponse {
    message?: string;
    data?: ReportResponse[];
  }
  export interface ApiResponseListSpecialtyResponse {
    message?: string;
    data?: SpecialtyResponse[];
  }
  export interface ApiResponseListSubscriptionData {
    message?: string;
    data?: SubscriptionData[];
  }
  export interface ApiResponseNotificationData {
    message?: string;
    data?: NotificationData;
  }
  export interface ApiResponseOperationData {
    message?: string;
    data?: OperationData;
  }
  export interface ApiResponseOtherRequestResponse {
    message?: string;
    data?: OtherRequestResponse;
  }
  export interface ApiResponseOtherResultItem {
    message?: string;
    data?: OtherResultItem;
  }
  export interface ApiResponseOtherResultResponse {
    message?: string;
    data?: OtherResultResponse;
  }
  export interface ApiResponsePageResponseAppointmentData {
    message?: string;
    data?: PageResponseAppointmentData;
  }
  export interface ApiResponsePageResponseAppointmentOrderData {
    message?: string;
    data?: PageResponseAppointmentOrderData;
  }
  export interface ApiResponsePageResponseChatMessage {
    message?: string;
    data?: PageResponseChatMessage;
  }
  export interface ApiResponsePageResponseCustomerData {
    message?: string;
    data?: PageResponseCustomerData;
  }
  export interface ApiResponsePageResponseFaqData {
    message?: string;
    data?: PageResponseFaqData;
  }
  export interface ApiResponsePageResponseHealthInsuranceData {
    message?: string;
    data?: PageResponseHealthInsuranceData;
  }
  export interface ApiResponsePageResponseImageProviderData {
    message?: string;
    data?: PageResponseImageProviderData;
  }
  export interface ApiResponsePageResponseImageResponse {
    message?: string;
    data?: PageResponseImageResponse;
  }
  export interface ApiResponsePageResponseInterConsultationResp {
    message?: string;
    data?: PageResponseInterConsultationResp;
  }
  export interface ApiResponsePageResponseInterConsultationResponse {
    message?: string;
    data?: PageResponseInterConsultationResponse;
  }
  export interface ApiResponsePageResponseLaboratoryProviderData {
    message?: string;
    data?: PageResponseLaboratoryProviderData;
  }
  export interface ApiResponsePageResponseLaboratoryResponse {
    message?: string;
    data?: PageResponseLaboratoryResponse;
  }
  export interface ApiResponsePageResponsePaymentCardData {
    message?: string;
    data?: PageResponsePaymentCardData;
  }
  export interface ApiResponsePageResponsePrescriptionResponse {
    message?: string;
    data?: PageResponsePrescriptionResponse;
  }
  export interface ApiResponsePageResponseProfessionalData {
    message?: string;
    data?: PageResponseProfessionalData;
  }
  export interface ApiResponsePageResponseProfessionalProductData {
    message?: string;
    data?: PageResponseProfessionalProductData;
  }
  export interface ApiResponsePageResponseRequestItem {
    message?: string;
    data?: PageResponseRequestItem;
  }
  export interface ApiResponsePageResponseResultItem {
    message?: string;
    data?: PageResponseResultItem;
  }
  export interface ApiResponsePageResponseWaitingAppointmentData {
    message?: string;
    data?: PageResponseWaitingAppointmentData;
  }
  export interface ApiResponsePaymentCardData {
    message?: string;
    data?: PaymentCardData;
  }
  export interface ApiResponsePaymentCart {
    message?: string;
    data?: PaymentCart;
  }
  export interface ApiResponsePrescriptionResponse {
    message?: string;
    data?: PrescriptionResponse;
  }
  export interface ApiResponseProcedureResponse {
    message?: string;
    data?: ProcedureResponse;
  }
  export interface ApiResponseProfessionalCustomerData {
    message?: string;
    data?: ProfessionalCustomerData;
  }
  export interface ApiResponseProfessionalData {
    message?: string;
    data?: ProfessionalData;
  }
  export interface ApiResponseProfessionalFileResponse {
    message?: string;
    data?: ProfessionalFileResponse;
  }
  export interface ApiResponseProfessionalPendentResume {
    message?: string;
    data?: ProfessionalPendentResume;
  }
  export interface ApiResponseProfessionalProductData {
    message?: string;
    data?: ProfessionalProductData;
  }
  export interface ApiResponseProfessionalSubscriptionData {
    message?: string;
    data?: ProfessionalSubscriptionData;
  }
  export interface ApiResponseReportResponse {
    message?: string;
    data?: ReportResponse;
  }
  export interface ApiResponseResultItem {
    message?: string;
    data?: ResultItem;
  }
  export interface ApiResponseResultResponse {
    message?: string;
    data?: ResultResponse;
  }
  export interface ApiResponseString {
    message?: string;
    data?: string;
  }
  export interface ApiResponseTokenLegalID {
    message?: string;
    data?: TokenLegalID;
  }
  export interface ApiResponseUserData {
    message?: string;
    data?: UserData;
  }
  export interface ApiResponseVideoCallData {
    message?: string;
    data?: VideoCallData;
  }
  export interface ApiResponseVoid {
    message?: string;
    data?: unknown;
  }
  export interface ApiResponseWaitingAppointmentData {
    message?: string;
    data?: WaitingAppointmentData;
  }
  export interface AppData {
    customerLoginVideoUrl?: string;
    professionalLoginVideoUrl?: string;
    professionalWebBannerUrl?: string;
    professionalWebBannerName?: string;
  }
  export interface AppointmentCustomerRequest {
    serviceCode?: string;
    specialtyCode?: string;
    healthCenterCode?: string;
    from?: DateTimeObject;
    to?: DateTimeObject;
    professionalLegalID?: string;
    addToCart?: boolean;
  }
  export interface AppointmentData {
    serviceCode?: string;
    specialtyCode?: string;
    healthCenterCode?: string;
    from?: DateTimeObject;
    to?: DateTimeObject;
    professionalLegalID?: string;
    addToCart?: boolean;
    code?: string;
    state?: string;
    totalCost?: number; // double
    preAppointmentData?: PreAppointmentData;
    isFirstTimeWithProfessional?: boolean;
    customerData?: CustomerData;
    professionalData?: ProfessionalData;
    paymentMethods?: ("CASH" | "TRANSFER" | "CARD")[];
    healthCenterData?: HealthCenterData;
    parentCode?: string;
    stateByProfessional?: boolean;
    record?: AppointmentRecordResponse;
    prescriptions?: PrescriptionResponse[];
  }
  export interface AppointmentOperationData {
    customerTypes?: {
      [name: string]: string;
    };
    physicalExamBySystem?: {
      [name: string]: string;
    };
    physicalExamByBody?: {
      [name: string]: string;
    };
  }
  export interface AppointmentOrderData {
    code?: string;
    createdAt?: DateTimeObject;
    subtotalNoTax?: number; // double
    subtotalTax12?: number; // double
    tax12?: number; // double
    discount?: number; // double
    subtotal?: number; // double
    total?: number; // double
    paid?: number; // double
    state?: string;
    invoiceCode?: string;
    invoiceNumber?: string;
    invoiceProvider?: string;
    invoiceUrl?: string;
    products?: AppointmentOrderProductData[];
    payments?: PaymentData[];
    customer?: CustomerData;
  }
  export interface AppointmentOrderProductData {
    code?: string;
    productType?: string;
    name?: string;
    description?: string;
    basePrice?: number; // double
    taxPercent?: number; // double
    enabled?: boolean;
    createdAt?: DateTimeObject;
    quantity?: number; // double
    subtotalNoTax?: number; // double
    subtotalTax12?: number; // double
    tax12?: number; // double
    discount?: number; // double
    subtotal?: number; // double
    total?: number; // double
  }
  export interface AppointmentOrderRequest {
    discount?: number; // double
  }
  export interface AppointmentProfessionalRequest {
    serviceCode?: string;
    specialtyCode?: string;
    healthCenterCode?: string;
    from?: DateTimeObject;
    to?: DateTimeObject;
    reason?: string[];
    customerLegalID?: string;
  }
  export interface AppointmentRecordRequest {
    reason?: string;
    currentDiseaseHistory?: string[];
    allergies?: string[];
    drugAllergies?: string[];
    physicalActivity?: string;
    smoking?: string;
    alcoholism?: string;
    otherDrugs?: string[];
    recentVaccinations?: string[];
    diseases?: string[];
    pathologicalBackground?: string[];
    medicines?: string[];
    surgeries?: string[];
    familyDiseases?: string[];
    other?: string[];
    heartRate?: number; // int32
    respiratoryFrequency?: number; // int32
    systolicBloodPressure?: number; // int32
    diastolicBloodPressure?: number; // int32
    oxygenSaturation?: number; // int32
    temperature?: number; // double
    weight?: number; // double
    height?: number; // double
    physicalExam?: string[];
    physicalExamBySystem?: {
      [name: string]: string;
    };
    physicalExamByBody?: {
      [name: string]: string;
    };
    analysis?: string[];
    diagnoses?: Diagnose[];
    treatmentPlan?: string[];
  }
  export interface AppointmentRecordResponse {
    reason?: string;
    currentDiseaseHistory?: string[];
    allergies?: string[];
    drugAllergies?: string[];
    physicalActivity?: string;
    smoking?: string;
    alcoholism?: string;
    otherDrugs?: string[];
    recentVaccinations?: string[];
    diseases?: string[];
    pathologicalBackground?: string[];
    medicines?: string[];
    surgeries?: string[];
    familyDiseases?: string[];
    other?: string[];
    heartRate?: number; // int32
    respiratoryFrequency?: number; // int32
    systolicBloodPressure?: number; // int32
    diastolicBloodPressure?: number; // int32
    oxygenSaturation?: number; // int32
    temperature?: number; // double
    weight?: number; // double
    height?: number; // double
    physicalExam?: string[];
    physicalExamBySystem?: {
      [name: string]: string;
    };
    physicalExamByBody?: {
      [name: string]: string;
    };
    analysis?: string[];
    diagnoses?: Diagnose[];
    treatmentPlan?: string[];
  }
  export interface AssistantRequest {
    code: string;
    email: string;
    name: string;
    password: string;
  }
  export interface AssistantResponse {
    code: string;
    email: string;
    name: string;
    password: string;
    createdAt?: DateTimeObject;
    active?: boolean;
  }
  export interface AvailabilityData {
    startTimeHour?: number; // int32
    startTimeMinute?: number; // int32
    finishTimeHour?: number; // int32
    finishTimeMinute?: number; // int32
    serviceCode?: string;
    healthCenterCode?: string;
    weekDays?: string[];
  }
  export interface AvailabilityRange {
    startTimeHour?: number; // int32
    startTimeMinute?: number; // int32
    finishTimeHour?: number; // int32
    finishTimeMinute?: number; // int32
  }
  export interface AvailabilityRequest {
    startTimeHour?: number; // int32
    startTimeMinute?: number; // int32
    finishTimeHour?: number; // int32
    finishTimeMinute?: number; // int32
    serviceCode?: string;
    healthCenterCode?: string;
    weekDays?: string[];
  }
  export interface CategoryData {
    code?: string;
    name?: string;
    exams?: CategoryExamData[];
  }
  export interface CategoryExamData {
    code?: string;
    name?: string;
    categoryCode?: string;
    categoryName?: string;
  }
  export interface CategoryExamDataPrice {
    code?: string;
    name?: string;
    categoryCode?: string;
    categoryName?: string;
    mode?: string;
    price?: number; // double
  }
  export interface CertificateRequest {
    details?: string[];
    diagnoses?: Diagnose[];
  }
  export interface CertificateResponse {
    details?: string[];
    diagnoses?: Diagnose[];
    createdAt?: DateTimeObject;
    code?: string;
  }
  export interface ChatMessage {
    dateDay?: number; // int32
    dateMonth?: number; // int32
    dateYear?: number; // int32
    timeHour?: number; // int32
    timeMinute?: number; // int32
    key?: string;
    type?: "CHAT" | "JOIN" | "LEAVE";
    sender?: string;
    senderLegalID?: string;
    senderAvatarUrl?: string;
    content?: string;
    fileBase64?: string;
    fileUrl?: string;
    fileName?: string;
    fileType?: string;
  }
  export interface City {
    code: string;
    id?: number; // int64
    name: string;
    province?: Province;
  }
  export interface CityData {
    code?: string;
    name?: string;
    province?: string;
    country?: string;
  }
  export interface CodesSeenRequest {
    codes?: string[];
    seen?: boolean;
  }
  export interface ConfigurationData {
    genders?: {
      [name: string]: string;
    };
    phoneTypes?: {
      [name: string]: string;
    };
    addressTypes?: {
      [name: string]: string;
    };
    bloodTypes?: {
      [name: string]: string;
    };
    insurancesStates?: {
      [name: string]: string;
    };
    insurances?: HealthInsuranceData[];
    healthServices?: ("FACE_TO_FACE" | "REMOTE" | "REMOTE_EMERGENCY")[];
    languages?: {
      [name: string]: string;
    };
    weekdays?: {
      [name: string]: string;
    };
    googlePlacesApiKey?: string;
    paymentClientCode?: string;
    paymentClientSecret?: string;
    paymentIsTestMode?: boolean;
  }
  export interface Country {
    code: string;
    id?: number; // int64
    name: string;
    nationality?: string;
  }
  export interface CountryData {
    code?: string;
    name?: string;
    nationality?: string;
    provinces?: ProvinceData[];
  }
  export interface Customer {
    createdAt?: string; // date-time
    updatedAt?: string; // date-time
    createdBy?: User;
    updatedBy?: User;
    id?: number; // int64
    firstName: string;
    lastName?: string;
    firstFamilyName: string;
    lastFamilyName?: string;
    birthday?: string; // date
    legalID: string;
    nationality?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    maritalStatus?:
      | "SINGLE"
      | "MARRIED"
      | "FREE_UNION"
      | "DE_FACTO_UNION"
      | "SEPARATED"
      | "DIVORCED"
      | "WIDOWER"
      | "OTHER";
    educationLevel?: string;
    profession?: string;
    agreeToBeContacted?: boolean;
    user?: User;
    rateAverage?: number; // double
    enabled?: boolean;
    avatarName?: string;
    phones?: CustomerPhone[];
    addresses?: CustomerAddress[];
    insurances?: CustomerHealthInsurance[];
    billingLegalID?: string;
    billingLegalIDType?: "PASSPORT" | "EC_CEDULA" | "EC_RUC";
    billingName?: string;
    billingAddress?: string;
    billingEmail?: string;
    billingPhone?: string;
    billingCity?: City;
    lastPaymentCardsSync?: string; // date-time
    hasEmail?: boolean;
    fullName?: string;
    notValid?: boolean;
    avatarStorageID?: string;
    ageYears?: number; // int32
    ageMonths?: number; // int32
    isFemale?: boolean;
    email?: string;
    age?: number; // int32
    createdAtFormatted?: string;
  }
  export interface CustomerAddress {
    createdAt?: string; // date-time
    updatedAt?: string; // date-time
    createdBy?: User;
    updatedBy?: User;
    code: string;
    id?: number; // int64
    city?: City;
    address: string;
    addressType: "HOME" | "WORK";
    label?: string;
    customer?: Customer;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
    notValid?: boolean;
    clone?: CustomerAddress;
    createdAtFormatted?: string;
  }
  export interface CustomerAddressData {
    city?: string;
    province?: string;
    country?: string;
    address: string;
    addressType: string;
    label?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
    cityName?: string;
  }
  export interface CustomerAddressRequest {
    city?: string;
    province?: string;
    country?: string;
    address: string;
    addressType: string;
    label?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
  }
  export interface CustomerAllergies {
    hasAllergies?: string;
    medicine?: CustomerAllergyData[];
    other?: string[];
  }
  export interface CustomerAllergyData {
    code?: string;
    medicine?: string;
  }
  export interface CustomerAvailabilityRequest {
    sendToCustomer?: boolean;
    sendToProfessional?: boolean;
    sendByEmail?: boolean;
  }
  export interface CustomerBackground {
    allergies?: CustomerAllergies;
    familyPathologies?: CustomerFamilyPathologies;
    pathologies?: CustomerPathologies;
    surgical?: CustomerSurgicalData;
    habits?: CustomerHabits;
    psychiatric?: CustomerPsychiatricData;
    gynecology?: CustomerGynecologyData;
    nutrition?: CustomerNutritionData;
  }
  export interface CustomerBackgroundData {
    backgroundFamilyPathologies?: string[];
    backgroundPersonalPathologies?: string[];
    backgroundPsychiatry?: string[];
    customerHabits?: string[];
    customerNutrition?: string[];
  }
  export interface CustomerData {
    email?: string;
    firstName: string;
    lastName?: string;
    firstFamilyName: string;
    lastFamilyName: string;
    birthdateDay: number; // int32
    birthdateMonth: number; // int32
    birthdateYear: number; // int32
    legalID: string;
    nationality?: string;
    gender?: string;
    maritalStatus?: string;
    educationLevel?: string;
    profession?: string;
    phones?: PhoneRequest[];
    addresses?: CustomerAddressRequest[];
    agreeToBeContacted?: boolean;
    insurances?: CustomerInsurance[];
    billingFromData?: boolean;
    billingLegalID?: string;
    billingLegalIDType?: string;
    billingName?: string;
    billingAddress?: string;
    billingEmail?: string;
    billingPhone?: string;
    billingCity?: CityData;
    favorite?: boolean;
    professionalRecordID?: string;
    hasEmail?: boolean;
    health?: CustomerHealthRequest;
    rateAverage?: number; // double
    allergies?: string[];
    drugAllergies?: string[];
    diseases?: {
      [name: string]: string;
    };
    medicines?: {
      [name: string]: string;
    };
    surgeries?: {
      [name: string]: string;
    };
    familyDiseases?: {
      [name: string]: string;
    };
    avatarUrl?: string;
    imported?: boolean;
    canEdit?: boolean;
    notes?: string[];
    customerHealth?: CustomerHealth;
  }
  export interface CustomerFamilyPathologies {
    enabled?: boolean;
    pathologies?: CustomerFamilyPathologiesData[];
  }
  export interface CustomerFamilyPathologiesData {
    familyMember?: string;
    pathologies?: string[];
  }
  export interface CustomerGynecologyData {
    menarche?: number; // int32
    thelarche?: number; // int32
    lastMenstruation?: DateObject;
    sexualInitiation?: number; // int32
    pregnancies?: number; // int32
    childbirths?: number; // int32
    caesareans?: number; // int32
    abortions?: number; // int32
    livingChildren?: number; // int32
    menstruationType?: string;
    menstruationInfo?: string;
    sexualActivityType?: string;
    sexualActivity?: string;
    contraceptiveType?: string;
    contraceptiveMethod?: string;
    ets?: string[];
    tests?: DateTestsData[];
  }
  export interface CustomerHabitData {
    habit?: string;
    notes?: string[];
  }
  export interface CustomerHabits {
    enabled?: boolean;
    habits?: CustomerHabitData[];
  }
  export interface CustomerHealth {
    createdAt?: string; // date-time
    updatedAt?: string; // date-time
    createdBy?: User;
    updatedBy?: User;
    id?: number; // int64
    weightInKilograms?: number; // double
    heightInCentimeters?: number; // double
    bloodType?: "O_NEG" | "O" | "A_NEG" | "A" | "B_NEG" | "B" | "AB_NEG" | "AB";
    allergies?: string[];
    drugAllergies?: string[];
    diseases?: {
      [name: string]: string;
    };
    medicines?: {
      [name: string]: string;
    };
    surgeries?: {
      [name: string]: string;
    };
    familyDiseases?: {
      [name: string]: string;
    };
    customer?: Customer;
    heartRate?: number; // int32
    respiratoryFrequency?: number; // int32
    systolicBloodPressure?: number; // int32
    diastolicBloodPressure?: number; // int32
    oxygenSaturation?: number; // int32
    temperature?: number; // double
    createdAtFormatted?: string;
  }
  export interface CustomerHealthInsurance {
    createdAt?: string; // date-time
    updatedAt?: string; // date-time
    createdBy?: User;
    updatedBy?: User;
    id?: number; // int64
    insurance?: HealthInsurance;
    customer?: Customer;
    code: string;
    state:
      | "PENDENT"
      | "VALIDATING"
      | "VALIDATED"
      | "CANCELED"
      | "ENABLED"
      | "PAID"
      | "READY"
      | "BUSY"
      | "REFUNDED"
      | "COMPLETED"
      | "REJECTED"
      | "DISABLED"
      | "IN_PROGRESS"
      | "AUTHORIZED"
      | "ERROR"
      | "INVOICED";
    notValid?: boolean;
    createdAtFormatted?: string;
  }
  export interface CustomerHealthRequest {
    weightInKilograms?: number; // double
    heightInCentimeters?: number; // double
    bloodType?: string;
    allergies?: string[];
    drugAllergies?: string[];
    diseases?: {
      [name: string]: string;
    };
    medicines?: {
      [name: string]: string;
    };
    surgeries?: {
      [name: string]: string;
    };
    familyDiseases?: {
      [name: string]: string;
    };
    heartRate?: number; // int32
    respiratoryFrequency?: number; // int32
    systolicBloodPressure?: number; // int32
    diastolicBloodPressure?: number; // int32
    oxygenSaturation?: number; // int32
    temperature?: number; // double
  }
  export interface CustomerInsurance {
    code?: string;
    name?: string;
    state?: string;
    customerID?: string;
  }
  export interface CustomerMedicationData {
    diagnoses?: string[];
    fromDate?: DateObject;
    currentIllness?: string[];
    medicine?: string;
    code?: string;
    canEdit?: boolean;
  }
  export interface CustomerMedicationRequest {
    diagnoses?: string[];
    fromDate?: DateObject;
    currentIllness?: string[];
    medicine?: string;
  }
  export interface CustomerMedicationsRequest {
    medications?: CustomerMedicationRequest[];
  }
  export interface CustomerNutritionData {
    appetiteLevel?: string;
    dailyGlassesOfWater?: number; // int32
    meal1?: string;
    meal1Description?: string;
    meal2?: string;
    meal2Description?: string;
    meal3?: string;
    meal3Description?: string;
    meal4?: string;
    meal4Description?: string;
    meal5?: string;
    meal5Description?: string;
    meal6?: string;
    meal6Description?: string;
  }
  export interface CustomerPathologies {
    enabled?: boolean;
    pathologies?: CustomerPathologyData[];
  }
  export interface CustomerPathologyData {
    pathology?: string;
    notes?: string[];
  }
  export interface CustomerPendentResume {
    interConsultations?: number; // int64
    laboratories?: number; // int64
    images?: number; // int64
    prescriptions?: number; // int64
  }
  export interface CustomerPhone {
    createdAt?: string; // date-time
    updatedAt?: string; // date-time
    createdBy?: User;
    updatedBy?: User;
    id?: number; // int64
    prefix: string;
    number: string;
    phoneType: "MOBILE" | "HOME" | "WORK" | "CONTACT";
    label?: string;
    customer?: Customer;
    address?: string;
    name?: string;
    notes?: string;
    notValid?: boolean;
    clone?: CustomerPhone;
    fullNumber?: string;
    createdAtFormatted?: string;
  }
  export interface CustomerPsychiatricData {
    enabled?: boolean;
    items?: CustomerPsychiatricItem[];
  }
  export interface CustomerPsychiatricItem {
    disorder?: string;
    notes?: string[];
  }
  export interface CustomerRequest {
    email?: string;
    firstName: string;
    lastName?: string;
    firstFamilyName: string;
    lastFamilyName: string;
    birthdateDay: number; // int32
    birthdateMonth: number; // int32
    birthdateYear: number; // int32
    legalID: string;
    nationality?: string;
    gender?: string;
    maritalStatus?: string;
    educationLevel?: string;
    profession?: string;
    phones?: PhoneRequest[];
    addresses?: CustomerAddressRequest[];
    agreeToBeContacted?: boolean;
    insurances?: CustomerInsurance[];
    billingFromData?: boolean;
    billingLegalID?: string;
    billingLegalIDType?: string;
    billingName?: string;
    billingAddress?: string;
    billingEmail?: string;
    billingPhone?: string;
    billingCity?: CityData;
    favorite?: boolean;
    professionalRecordID?: string;
    hasEmail?: boolean;
    health?: CustomerHealthRequest;
    customerHealth?: CustomerHealth;
  }
  export interface CustomerSurgicalData {
    enabled?: boolean;
    items?: CustomerSurgicalItem[];
  }
  export interface CustomerSurgicalItem {
    surgical?: string;
    dateTime?: DateTimeObject;
    notes?: string[];
  }
  export interface CustomerVaccinationData {
    categories?: VaccinationCategoryData[];
  }
  export interface DateObject {
    dateDay?: number; // int32
    dateMonth?: number; // int32
    dateYear?: number; // int32
  }
  export interface DateTestsData {
    name?: string;
    date?: DateObject;
    description?: string;
  }
  export interface DateTimeObject {
    dateDay?: number; // int32
    dateMonth?: number; // int32
    dateYear?: number; // int32
    timeHour?: number; // int32
    timeMinute?: number; // int32
  }
  export interface DeviceRequest {
    platform?: string;
    previous?: string;
    code?: string;
    description?: string;
  }
  export interface Diagnose {
    code?: string;
    description?: string;
    notes?: string;
    definitive?: boolean;
  }
  export interface EmailCodeRequest {
    email: string;
    forCustomer?: boolean;
    code: string;
  }
  export interface EmailNameRequest {
    email: string;
    forCustomer?: boolean;
    name: string;
  }
  export interface EmailPasswordRequest {
    email: string;
    forCustomer?: boolean;
    code: string;
    password: string;
  }
  export interface EmailRequest {
    email: string;
    forCustomer?: boolean;
  }
  export interface EmailsNameRequest {
    names?: string;
    emails?: string;
  }
  export interface EnableDisableRequest {
    code?: string;
    enabled?: boolean;
  }
  export interface ErrorRequest {
    code?: string;
    description?: string;
    valid?: boolean;
  }
  export interface EvolutionRequest {
    heartRate?: number; // int32
    respiratoryFrequency?: number; // int32
    systolicBloodPressure?: number; // int32
    diastolicBloodPressure?: number; // int32
    oxygenSaturation?: number; // int32
    temperature?: number; // double
    weightInKilograms?: number; // double
    heightInCentimeters?: number; // double
    details?: string[];
    diagnoses?: Diagnose[];
  }
  export interface EvolutionResponse {
    heartRate?: number; // int32
    respiratoryFrequency?: number; // int32
    systolicBloodPressure?: number; // int32
    diastolicBloodPressure?: number; // int32
    oxygenSaturation?: number; // int32
    temperature?: number; // double
    weightInKilograms?: number; // double
    heightInCentimeters?: number; // double
    details?: string[];
    diagnoses?: Diagnose[];
    code?: string;
    createdAt?: DateTimeObject;
    availableForCustomer?: boolean;
  }
  export interface FaqData {
    question?: string;
    answer?: string;
  }
  export interface FilePasswordRequest {
    name?: string;
    base64?: string;
    password?: string;
  }
  export interface FileRequest {
    name?: string;
    base64?: string;
  }
  export interface FileRequestTypeName {
    name?: string;
    base64?: string;
    requestName?: string;
    requestType?: string;
  }
  export interface GoogleFitData {
    heartPoints?: {
      [name: string]: number; // int32
    };
    sleepMinutes?: {
      [name: string]: number; // int64
    };
    heartRates?: {
      [name: string]: number; // int32
    };
    bloodPressures?: {
      [name: string]: MinMaxInteger;
    };
  }
  export interface GrantedAuthority {
    authority?: string;
  }
  export interface GuideCategoryData {
    code?: string;
    name?: string;
    items?: GuideItemData[];
  }
  export interface GuideItemData {
    title?: string;
    description?: string;
    link?: string;
  }
  export interface HealthCenterData {
    code?: string;
    name?: string;
    city?: string;
    province?: string;
    country?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
  }
  export interface HealthCenterResponse {
    code?: string;
    name?: string;
    city?: string;
    province?: string;
    country?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
  }
  export interface HealthInsurance {
    createdAt?: string; // date-time
    updatedAt?: string; // date-time
    code: string;
    id?: number; // int64
    name: string;
    siteUrl: string;
    hasTemplate?: boolean;
    notValid?: boolean;
    createdAtFormatted?: string;
  }
  export interface HealthInsuranceData {
    code?: string;
    name?: string;
    siteUrl?: string;
    hasTemplate?: boolean;
    templateUrl?: string;
  }
  export interface HospitalData {
    code?: string;
    name?: string;
    city?: string;
    province?: string;
    country?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
  }
  export interface ImageItemResponse {
    exam?: CategoryExamData;
    provider?: ImageProviderData;
    providerDatetime?: DateTimeObject;
    customerAddress?: CustomerAddressData;
    code?: string;
    state?: string;
  }
  export interface ImageProviderData {
    code?: string;
    name?: string;
    siteUrl?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    prices?: CategoryExamDataPrice[];
  }
  export interface ImageRequestItemRequest {
    code?: string;
    description?: string;
    notes?: string;
    examCode?: string;
    quantity?: number; // int32
  }
  export interface ImageRequestRequest {
    diagnoses?: Diagnose[];
    items?: ImageRequestItemRequest[];
  }
  export interface ImageRequestResponse {
    diagnoses?: Diagnose[];
    items?: ImageRequestItemRequest[];
    code?: string;
    createdAt?: DateTimeObject;
  }
  export interface ImageResponse {
    createdAt?: DateTimeObject;
    code?: string;
    appointmentCode?: string;
    professional?: ProfessionalData;
    customer?: CustomerData;
    diagnoses?: Diagnose[];
    notes?: string[];
    state?: string;
    items?: ImageItemResponse[];
  }
  export interface ImageResultItem {
    code?: string;
    requestDescription?: string;
    notes?: string;
    seenByProfessional?: boolean;
    requestCode?: string;
    requestCreatedAt?: DateTimeObject;
    requestDiagnoses?: Diagnose[];
    requestItemCode?: string;
    imageCategoryCode?: string;
    imageCategoryName?: string;
    imageCustomExam?: string;
    imageCategoryExamCode?: string;
    imageCategoryExamName?: string;
    title?: string;
    diagnoses?: Diagnose[];
    description?: string;
    analysis?: string;
    observations?: string;
    fileUrl?: string;
    categoryCode?: string;
    categoryName?: string;
    categoryExamCode?: string;
    categoryExamName?: string;
    customExam?: string;
    requestType?: string;
  }
  export interface ImageResultResponse {
    code?: string;
    createdAt?: DateTimeObject;
    diagnoses?: Diagnose[];
    items?: ImageResultItem[];
    requestType?: string;
  }
  export interface ImportResult {
    line?: number; // int32
    success?: boolean;
    error?: string;
  }
  export interface InformedConsentResponse {
    procedureName?: string;
    hospitalName?: string;
    hospitalService?: string;
    kindOfAttention?: string;
    procedureDescription?: string;
    procedureDuration?: string;
    procedureBenefits?: string;
    frequentRisks?: string;
    rareRisks?: string;
    patientSpecificRisks?: string;
    procedureAlternatives?: string;
    postProcedureManagement?: string;
    procedureNotPerformedConsequences?: string;
    diagnoses?: Diagnose[];
    code?: string;
    requestName?: string;
    fileName?: string;
    createdAt?: DateTimeObject;
    availableForCustomer?: boolean;
    fileUrl?: string;
  }
  export interface InterConsultationReport {
    seenByReference?: boolean;
    clinicalCriteria?: string[];
    examsProcedures?: string[];
    analysis?: string[];
    diagnoses?: Diagnose[];
    treatment?: string[];
    results?: string[];
    observations?: string[];
    attachments?: string[];
  }
  export interface InterConsultationReq {
    targetProfessionalLegalID?: string;
    targetProfessionalName?: string;
    targetProfessionalEmail?: string;
    targetSpecialtyCode?: string;
    reason?: string;
    emergency?: boolean;
    fillWithCustomerData?: boolean;
    clinicalProfile?: string[];
    medicineAllergies?: string[];
    hasAllergies?: string;
    allergies?: string[];
    physicalExam?: string[];
    analysis?: string[];
    diagnoses?: Diagnose[];
    treatment?: string[];
    examsProcedures?: string[];
    background?: string[];
    results?: string[];
    observations?: string[];
    sendToProfessional?: boolean;
  }
  export interface InterConsultationRequest {
    targetProfessionalLegalID?: string;
    targetSpecialtyCode?: string;
    reason?: string;
    background?: string[];
    allergies?: string[];
    pathologicalBackground?: string[];
    surgeries?: string[];
    familyDiseases?: string[];
    diagnoses?: string[];
  }
  export interface InterConsultationResp {
    targetProfessionalLegalID?: string;
    targetProfessionalName?: string;
    targetProfessionalEmail?: string;
    targetSpecialtyCode?: string;
    reason?: string;
    emergency?: boolean;
    fillWithCustomerData?: boolean;
    clinicalProfile?: string[];
    medicineAllergies?: string[];
    hasAllergies?: string;
    allergies?: string[];
    physicalExam?: string[];
    analysis?: string[];
    diagnoses?: Diagnose[];
    treatment?: string[];
    examsProcedures?: string[];
    background?: string[];
    results?: string[];
    observations?: string[];
    sendToProfessional?: boolean;
    code?: string;
    createdAt?: DateTimeObject;
    fromProfessional?: ProfessionalData;
    toProfessional?: ProfessionalData;
    toSpecialty?: SpecialtyResponse;
    seenByTarget?: boolean;
    report?: InterConsultationReport;
    attachments?: string[];
  }
  export interface InterConsultationResponse {
    targetProfessionalLegalID?: string;
    targetSpecialtyCode?: string;
    reason?: string;
    background?: string[];
    allergies?: string[];
    pathologicalBackground?: string[];
    surgeries?: string[];
    familyDiseases?: string[];
    diagnoses?: string[];
    createdAt?: DateTimeObject;
    fromProfessional?: ProfessionalData;
    toProfessional?: ProfessionalData;
    toSpecialty?: SpecialtyResponse;
  }
  export interface LaboratoryItemResponse {
    exam?: CategoryExamData;
    provider?: LaboratoryProviderData;
    providerDatetime?: DateTimeObject;
    customerAddress?: CustomerAddressData;
    code?: string;
    state?: string;
  }
  export interface LaboratoryProviderData {
    code?: string;
    name?: string;
    siteUrl?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    prices?: CategoryExamDataPrice[];
  }
  export interface LaboratoryRequestItemRequest {
    code?: string;
    description?: string;
    notes?: string;
    examCode?: string;
    quantity?: number; // int32
  }
  export interface LaboratoryRequestRequest {
    diagnoses?: Diagnose[];
    items?: LaboratoryRequestItemRequest[];
  }
  export interface LaboratoryRequestResponse {
    diagnoses?: Diagnose[];
    items?: LaboratoryRequestItemRequest[];
    code?: string;
    createdAt?: DateTimeObject;
  }
  export interface LaboratoryResponse {
    createdAt?: DateTimeObject;
    code?: string;
    appointmentCode?: string;
    professional?: ProfessionalData;
    customer?: CustomerData;
    diagnoses?: Diagnose[];
    notes?: string[];
    state?: string;
    items?: LaboratoryItemResponse[];
  }
  export interface LaboratoryResultItem {
    code?: string;
    requestDescription?: string;
    notes?: string;
    seenByProfessional?: boolean;
    requestCode?: string;
    requestCreatedAt?: DateTimeObject;
    requestDiagnoses?: Diagnose[];
    requestItemCode?: string;
    laboratoryCategoryCode?: string;
    laboratoryCategoryName?: string;
    laboratoryCustomExam?: string;
    laboratoryCategoryExamCode?: string;
    laboratoryCategoryExamName?: string;
    title?: string;
    diagnoses?: Diagnose[];
    description?: string;
    analysis?: string;
    observations?: string;
    fileUrl?: string;
    categoryCode?: string;
    categoryName?: string;
    categoryExamCode?: string;
    categoryExamName?: string;
    customExam?: string;
    requestType?: string;
  }
  export interface LaboratoryResultResponse {
    code?: string;
    createdAt?: DateTimeObject;
    diagnoses?: Diagnose[];
    items?: LaboratoryResultItem[];
    requestType?: string;
  }
  export interface LocationSearch {
    latitude?: number; // double
    longitude?: number; // double
    distanceRatio?: number; // int32
  }
  export interface MinMaxInteger {
    min?: number; // int32
    max?: number; // int32
  }
  export interface NotesRequest {
    notes?: string[];
  }
  export interface NotificationData {
    items?: NotificationItem[];
  }
  export interface NotificationItem {
    notificationType?: "WAITING_APPOINTMENT";
    data?: {
      [name: string]: string;
    };
  }
  export interface OperationData {
    genders?: {
      [name: string]: string;
    };
    maritalStatuses?: {
      [name: string]: string;
    };
    phoneTypes?: {
      [name: string]: string;
    };
    addressTypes?: {
      [name: string]: string;
    };
    bloodTypes?: {
      [name: string]: string;
    };
    insurancesStates?: {
      [name: string]: string;
    };
    admissionTypes?: {
      [name: string]: string;
    };
    paymentTypes?: {
      [name: string]: string;
    };
    insurances?: HealthInsuranceData[];
    healthServices?: ("FACE_TO_FACE" | "REMOTE" | "REMOTE_EMERGENCY")[];
    languages?: {
      [name: string]: string;
    };
    weekdays?: {
      [name: string]: string;
    };
    professions?: ProfessionResponse[];
    healthCenters?: HealthCenterResponse[];
    countries?: CountryData[];
    hospitals?: HospitalData[];
    googlePlacesApiKey?: string;
    paymentClientCode?: string;
    paymentClientSecret?: string;
    paymentIsTestMode?: boolean;
  }
  export interface OrderProductRequest {
    code?: string;
    productType?: string;
    name?: string;
    description?: string;
    basePrice?: number; // double
    taxPercent?: number; // double
    enabled?: boolean;
    quantity?: number; // double
  }
  export interface OtherRequestItemRequest {
    code?: string;
    description?: string;
    notes?: string;
    examCode?: string;
    quantity?: number; // int32
  }
  export interface OtherRequestItemResponse {
    exam?: CategoryExamData;
    provider?: OtherRequestProviderData;
    providerDatetime?: DateTimeObject;
    customerAddress?: CustomerAddressData;
    code?: string;
    state?: string;
    description?: string;
    quantity?: number; // int32
    notes?: string;
  }
  export interface OtherRequestProviderData {
    code?: string;
    name?: string;
    siteUrl?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    prices?: CategoryExamDataPrice[];
  }
  export interface OtherRequestRequest {
    diagnoses?: Diagnose[];
    items?: OtherRequestItemRequest[];
  }
  export interface OtherRequestResponse {
    createdAt?: DateTimeObject;
    code?: string;
    appointmentCode?: string;
    professional?: ProfessionalData;
    customer?: CustomerData;
    diagnoses?: Diagnose[];
    notes?: string[];
    state?: string;
    items?: OtherRequestItemResponse[];
  }
  export interface OtherResultItem {
    code?: string;
    requestDescription?: string;
    notes?: string;
    seenByProfessional?: boolean;
    requestCode?: string;
    requestCreatedAt?: DateTimeObject;
    requestDiagnoses?: Diagnose[];
    requestItemCode?: string;
    categoryCode?: string;
    categoryName?: string;
    customExam?: string;
    categoryExamCode?: string;
    categoryExamName?: string;
    title?: string;
    diagnoses?: Diagnose[];
    description?: string;
    analysis?: string;
    observations?: string;
    fileUrl?: string;
    requestType?: string;
  }
  export interface OtherResultResponse {
    code?: string;
    createdAt?: DateTimeObject;
    diagnoses?: Diagnose[];
    items?: OtherResultItem[];
    requestType?: string;
  }
  export interface PageResponseAppointmentData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: AppointmentData[];
  }
  export interface PageResponseAppointmentOrderData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: AppointmentOrderData[];
  }
  export interface PageResponseChatMessage {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: ChatMessage[];
  }
  export interface PageResponseCustomerData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: CustomerData[];
  }
  export interface PageResponseFaqData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: FaqData[];
  }
  export interface PageResponseHealthInsuranceData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: HealthInsuranceData[];
  }
  export interface PageResponseImageProviderData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: ImageProviderData[];
  }
  export interface PageResponseImageResponse {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: ImageResponse[];
  }
  export interface PageResponseInterConsultationResp {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: InterConsultationResp[];
  }
  export interface PageResponseInterConsultationResponse {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: InterConsultationResponse[];
  }
  export interface PageResponseLaboratoryProviderData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: LaboratoryProviderData[];
  }
  export interface PageResponseLaboratoryResponse {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: LaboratoryResponse[];
  }
  export interface PageResponsePaymentCardData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: PaymentCardData[];
  }
  export interface PageResponsePrescriptionResponse {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: PrescriptionResponse[];
  }
  export interface PageResponseProfessionalData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: ProfessionalData[];
  }
  export interface PageResponseProfessionalProductData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: ProfessionalProductData[];
  }
  export interface PageResponseRequestItem {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: RequestItem[];
  }
  export interface PageResponseResultItem {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: ResultItem[];
  }
  export interface PageResponseWaitingAppointmentData {
    page?: number; // int32
    pageSize?: number; // int32
    totalItems?: number; // int64
    totalPages?: number; // int64
    items?: WaitingAppointmentData[];
  }
  export interface PaymentCardData {
    holder?: string;
    number?: string;
    bin?: string;
    expiryMonth?: number; // int32
    expiryYear?: number; // int32
    code?: string;
    token?: string;
    type?: string;
    status?: string;
    transactionReference?: string;
    origin?: string;
    message?: string;
  }
  export interface PaymentCardRequest {
    holder?: string;
    number?: string;
    bin?: string;
    expiryMonth?: number; // int32
    expiryYear?: number; // int32
    code?: string;
    token?: string;
    type?: string;
    status?: string;
    transactionReference?: string;
    origin?: string;
    message?: string;
  }
  export interface PaymentCart {
    paymentMethods?: ("CASH" | "TRANSFER" | "CARD")[];
    items?: PaymentCartItem[];
    subtotal?: number; // double
    tax?: number; // double
    shipping?: number; // double
  }
  export interface PaymentCartItem {
    code?: string;
    state?: string;
    itemType?: string;
    subtotal?: number; // double
    tax?: number; // double
    description?: string;
    dateTime?: DateTimeObject;
    quantity?: number; // double
    unitPrice?: number; // double
    unitTax?: number; // double
  }
  export interface PaymentData {
    createdAt?: DateTimeObject;
    amount?: number; // double
    paymentMethod?: string;
    state?: string;
  }
  export interface PaymentFileRequest {
    name?: string;
    base64?: string;
    paymentMethod?: string;
    amount?: number; // double
  }
  export interface PhoneData {
    prefix: string;
    number: string;
    phoneType: string;
    label?: string;
    address?: string;
    name?: string;
    notes?: string;
  }
  export interface PhoneRequest {
    prefix: string;
    number: string;
    phoneType: string;
    label?: string;
    address?: string;
    name?: string;
    notes?: string;
  }
  export interface PhysicalExamData {
    code?: string;
    name?: string;
    examType?: string;
  }
  export interface PreAppointmentData {
    reason?: string;
    currentDiseaseHistory?: string[];
    allergies?: string[];
    drugAllergies?: string[];
    diseases?: {
      [name: string]: string;
    };
    medicines?: {
      [name: string]: string;
    };
    appointmentMedicines?: {
      [name: string]: string;
    };
    surgeries?: {
      [name: string]: string;
    };
    familyDiseases?: {
      [name: string]: string;
    };
    heartRate?: number; // int32
    oxygenSaturation?: number; // int32
    systolicBloodPressure?: number; // int32
    diastolicBloodPressure?: number; // int32
    temperature?: number; // double
  }
  export interface PreAppointmentRequest {
    reason?: string;
    currentDiseaseHistory?: string[];
    allergies?: string[];
    drugAllergies?: string[];
    diseases?: {
      [name: string]: string;
    };
    medicines?: {
      [name: string]: string;
    };
    appointmentMedicines?: {
      [name: string]: string;
    };
    surgeries?: {
      [name: string]: string;
    };
    familyDiseases?: {
      [name: string]: string;
    };
    heartRate?: number; // int32
    oxygenSaturation?: number; // int32
    systolicBloodPressure?: number; // int32
    diastolicBloodPressure?: number; // int32
    temperature?: number; // double
  }
  export interface PrescriptionItemRequest {
    medicine?: string;
    genericMedicine?: string;
    doseMg?: number; // int32
    quantity?: number; // int32
    hoursFrequency?: number; // int32
    duration?: number; // int32
    via?: string;
    presentation?: string;
    concentration?: string;
    notes?: string;
  }
  export interface PrescriptionRequest {
    diagnoses?: Diagnose[];
    recommendations?: string[];
    warningSignals?: string[];
    items?: PrescriptionItemRequest[];
  }
  export interface PrescriptionResponse {
    diagnoses?: Diagnose[];
    recommendations?: string[];
    warningSignals?: string[];
    items?: PrescriptionItemRequest[];
    code?: string;
    createdAt?: DateTimeObject;
    professional?: ProfessionalData;
  }
  export interface ProcedureRequest {
    name?: string;
    details?: string[];
    diagnoses?: Diagnose[];
  }
  export interface ProcedureResponse {
    name?: string;
    details?: string[];
    diagnoses?: Diagnose[];
    code?: string;
    createdAt?: DateTimeObject;
  }
  export interface ProfessionResponse {
    code?: string;
    name?: string;
    specialties?: SpecialtyResponse[];
  }
  export interface ProfessionalAppointmentRequest {
    appointmentDurationInMinutes?: number; // int32
  }
  export interface ProfessionalAvailabilitiesRequest {
    availabilities?: AvailabilityRequest[];
  }
  export interface ProfessionalCustomerData {
    email?: string;
    firstName: string;
    lastName?: string;
    firstFamilyName: string;
    lastFamilyName: string;
    birthdateDay: number; // int32
    birthdateMonth: number; // int32
    birthdateYear: number; // int32
    legalID: string;
    nationality?: string;
    gender?: string;
    maritalStatus?: string;
    educationLevel?: string;
    profession?: string;
    phones?: PhoneRequest[];
    addresses?: CustomerAddressRequest[];
    agreeToBeContacted?: boolean;
    insurances?: CustomerInsurance[];
    billingFromData?: boolean;
    billingLegalID?: string;
    billingLegalIDType?: string;
    billingName?: string;
    billingAddress?: string;
    billingEmail?: string;
    billingPhone?: string;
    billingCity?: CityData;
    favorite?: boolean;
    professionalRecordID?: string;
    hasEmail?: boolean;
    health?: CustomerHealthRequest;
    rateAverage?: number; // double
    allergies?: string[];
    drugAllergies?: string[];
    diseases?: {
      [name: string]: string;
    };
    medicines?: {
      [name: string]: string;
    };
    surgeries?: {
      [name: string]: string;
    };
    familyDiseases?: {
      [name: string]: string;
    };
    avatarUrl?: string;
    imported?: boolean;
    canEdit?: boolean;
    notes?: string[];
    interConsultations?: number; // int64
    interConsultationsReports?: number; // int64
    imageResults?: number; // int64
    laboratoryResults?: number; // int64
    customerHealth?: CustomerHealth;
  }
  export interface ProfessionalData {
    firstName: string;
    lastName?: string;
    firstFamilyName: string;
    lastFamilyName: string;
    birthdateDay: number; // int32
    birthdateMonth: number; // int32
    birthdateYear: number; // int32
    legalID: string;
    professionalID: string;
    nationality?: string;
    city?: string;
    province?: string;
    country?: string;
    gender?: string;
    profession?: string;
    specialties?: string[];
    agreeToBePublic?: boolean;
    insurances?: string[];
    languages?: string[];
    rateActivated?: boolean;
    professionalEmail?: string;
    aboutMe?: string;
    curriculum?: string[];
    acceptedTerms?: boolean;
    declareTruth?: boolean;
    acceptToBeContacted?: boolean;
    billingLegalID?: string;
    billingLegalIDType?: string;
    billingName?: string;
    billingAddress?: string;
    billingEmail?: string;
    url?: string;
    digitalSignEnabled?: boolean;
    rateAverage?: number; // double
    avatarUrl?: string;
    logoUrl?: string;
    digitalSignUrl?: string;
    electronicSignExpires?: DateTimeObject;
    phones?: PhoneData[];
    healthCenters?: ProfessionalHealthCenterResponse[];
    prices?: ProfessionalPriceResponse[];
    schedules?: ProfessionalScheduleData[];
    state?: string;
    isFavorite?: boolean;
    appointmentDurationInMinutes?: number; // int32
    customersInQueue?: number; // int64
    lastAppointmentsReasons?: string[];
    subscription?: SubscriptionData;
    subscriptionStarted?: DateTimeObject;
    subscriptionExpires?: DateTimeObject;
    hospitals?: ProfessionalHospitalData[];
    insurancesList?: HealthInsuranceData[];
    languagesList?: {
      [name: string]: string;
    };
    nextSubscription?: SubscriptionData;
    subscriptionCard?: PaymentCardData;
    isAssistant?: boolean;
    assistantCode?: string;
    assistantName?: string;
    assistantEmail?: string;
    specialtiesList?: SpecialtyResponse[];
  }
  export interface ProfessionalFileResponse {
    code?: string;
    createdAt?: DateTimeObject;
    title?: string;
    fileName?: string;
    fileUrl?: string;
  }
  export interface ProfessionalHealthCenterRequest {
    code?: string;
    name?: string;
    city?: string;
    province?: string;
    country?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
    floor?: string;
    consultingRoom?: string;
    prefix?: string;
    phone?: string;
  }
  export interface ProfessionalHealthCenterResponse {
    code?: string;
    name?: string;
    city?: string;
    province?: string;
    country?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
    floor?: string;
    consultingRoom?: string;
    prefix?: string;
    phone?: string;
    current?: boolean;
  }
  export interface ProfessionalHospitalData {
    code?: string;
    name?: string;
    city?: string;
    province?: string;
    country?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
  }
  export interface ProfessionalHospitalRequest {
    code?: string;
    name?: string;
    city?: string;
    province?: string;
    country?: string;
    address?: string;
    latitude?: number; // double
    longitude?: number; // double
    notes?: string;
    floor?: string;
    consultingRoom?: string;
    phone?: string;
    siteUrl?: string;
  }
  export interface ProfessionalPendentResume {
    interConsultations?: number; // int64
    interConsultationsReports?: number; // int64
    imageResults?: number; // int64
    laboratoryResults?: number; // int64
  }
  export interface ProfessionalPriceRequest {
    serviceCode?: string;
    price?: number; // double
  }
  export interface ProfessionalPriceResponse {
    serviceCode?: string;
    price?: number; // double
  }
  export interface ProfessionalPricesRequest {
    prices?: ProfessionalPriceRequest[];
  }
  export interface ProfessionalProductData {
    code?: string;
    productType?: string;
    name?: string;
    description?: string;
    basePrice?: number; // double
    taxPercent?: number; // double
    enabled?: boolean;
    createdAt?: DateTimeObject;
  }
  export interface ProfessionalProductRequest {
    code?: string;
    productType?: string;
    name?: string;
    description?: string;
    basePrice?: number; // double
    taxPercent?: number; // double
    enabled?: boolean;
  }
  export interface ProfessionalRequest {
    firstName: string;
    lastName?: string;
    firstFamilyName: string;
    lastFamilyName: string;
    birthdateDay: number; // int32
    birthdateMonth: number; // int32
    birthdateYear: number; // int32
    legalID: string;
    professionalID: string;
    nationality?: string;
    city?: string;
    province?: string;
    country?: string;
    gender?: string;
    profession?: string;
    specialties?: string[];
    agreeToBePublic?: boolean;
    insurances?: string[];
    languages?: string[];
    rateActivated?: boolean;
    professionalEmail?: string;
    aboutMe?: string;
    curriculum?: string[];
    acceptedTerms?: boolean;
    declareTruth?: boolean;
    acceptToBeContacted?: boolean;
    billingLegalID?: string;
    billingLegalIDType?: string;
    billingName?: string;
    billingAddress?: string;
    billingEmail?: string;
    url?: string;
    digitalSignEnabled?: boolean;
    phones?: PhoneRequest[];
    healthCenters?: ProfessionalHealthCenterRequest[];
    hospitals?: ProfessionalHospitalRequest[];
    hospitalsRequests?: ProfessionalHospitalRequest[];
  }
  export interface ProfessionalScheduleData {
    service?: string;
    from?: DateTimeObject;
    to?: DateTimeObject;
    state?: string;
    healthCenter?: HealthCenterData;
  }
  export interface ProfessionalSearchRequest {
    page?: number; // int32
    pageSize?: number; // int32
    search?: string;
    byDoctorName?: boolean;
    bySpecialtySymptom?: boolean;
    onlyWithVirtualConsultation?: boolean;
    onlyWithVirtualWaitingRoomConsultation?: boolean;
    onlyWithInSiteConsultation?: boolean;
    fromDate?: string;
    toDate?: string;
    byCustomerInsurances?: boolean;
    byHospital?: string;
    byLanguage?: string;
    byCity?: string;
    byLocationLatitude?: number; // double
    byLocationLongitude?: number; // double
    byDistanceRatio?: number; // int32
    byMyFavorites?: boolean;
    byPriceAsc?: boolean;
    byRateDesc?: boolean;
    byNearLocation?: boolean;
    locationSearch?: LocationSearch;
  }
  export interface ProfessionalSubscriptionData {
    code?: string;
    name?: string;
    price?: number; // double
    tax?: number; // double
    discount?: number; // double
    total?: number; // double
    days?: number; // int32
    favorite?: boolean;
    features?: string[];
    noFeatures?: string[];
    featuresExtra?: string[];
    noFeaturesExtra?: string[];
    active?: boolean;
    expires?: DateTimeObject;
    changeCredit?: number; // double
    changeTotal?: number; // double
    changeStart?: DateObject;
    changeExpires?: DateObject;
  }
  export interface ProviderRequest {
    itemCode?: string;
    mode?: string;
    dateTime?: DateTimeObject;
    price?: number; // double
    customerAddressCode?: string;
    customerLatitude?: number; // double
    customerLongitude?: number; // double
    addToCart?: boolean;
  }
  export interface ProviderSearchRequest {
    page?: number; // int32
    pageSize?: number; // int32
    exam?: string;
    mode?: string;
    byCity?: string;
    byLocationLatitude?: number; // double
    byLocationLongitude?: number; // double
    byDistanceRatio?: number; // int32
    byPriceAsc?: boolean;
    byNearLocation?: boolean;
  }
  export interface Province {
    code: string;
    id?: number; // int64
    name: string;
    country?: Country;
  }
  export interface ProvinceData {
    code?: string;
    name?: string;
    cities?: CityData[];
  }
  export interface RateAppointmentRequest {
    rate?: number; // int32
    message?: string;
  }
  export interface ReportRequest {
    city?: string;
    details?: string[];
  }
  export interface ReportResponse {
    city?: string;
    details?: string[];
    code?: string;
    createdAt?: DateTimeObject;
  }
  export interface RequestItem {
    exam?: CategoryExamData;
    createdAt?: DateTimeObject;
    requestType?: string;
    requestCode?: string;
    code?: string;
    description?: string;
    quantity?: number; // int32
    diagnoses?: Diagnose[];
  }
  export interface ResultFileRequest {
    name?: string;
    base64?: string;
    requestName?: string;
    requestType?: string;
    title?: string;
    diagnoses?: Diagnose[];
    description?: string;
    analysis?: string;
    observations?: string;
  }
  export interface ResultItem {
    requestDescription?: string;
    requestCode?: string;
    requestCreatedAt?: DateTimeObject;
    categoryCode?: string;
    categoryName?: string;
    categoryExamCode?: string;
    categoryExamName?: string;
    requestDiagnoses?: Diagnose[];
    description?: string;
    notes?: string;
    title?: string;
    code?: string;
    customExam?: string;
    analysis?: string;
    observations?: string;
    diagnoses?: Diagnose[];
    requestType?: string;
    seenByProfessional?: boolean;
    requestItemCode?: string;
    fileUrl?: string;
  }
  export interface ResultResponse {
    createdAt?: DateTimeObject;
    items?: ResultItem[];
    code?: string;
    diagnoses?: Diagnose[];
    requestType?: string;
  }
  export interface SpecialtyResponse {
    code?: string;
    name?: string;
  }
  export interface SubscriptionData {
    code?: string;
    name?: string;
    price?: number; // double
    tax?: number; // double
    discount?: number; // double
    total?: number; // double
    days?: number; // int32
    favorite?: boolean;
    features?: string[];
    noFeatures?: string[];
    featuresExtra?: string[];
    noFeaturesExtra?: string[];
  }
  export interface TokenLegalID {
    token?: string;
    legalID?: string;
    assistantCode?: string;
  }
  export interface TokenPeriodRequest {
    token?: string;
    from?: DateTimeObject;
    to?: DateTimeObject;
  }
  export interface TokenRequest {
    token?: string;
  }
  export interface User {
    createdAt?: string; // date-time
    updatedAt?: string; // date-time
    id?: number; // int64
    email: string;
    password: string;
    encryptKey: string;
    recoverKey?: string;
    enabled?: boolean;
    username?: string;
    authorities?: GrantedAuthority[];
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    createdAtFormatted?: string;
  }
  export interface UserData {
    email: string;
    customers?: CustomerData[];
    professional?: ProfessionalData;
    configData?: ConfigurationData;
    forCustomer?: boolean;
  }
  export interface VaccinationCategoryData {
    code?: string;
    name?: string;
    fromMonth?: number; // int32
    toMonth?: number; // int32
    items?: VaccinationData[];
  }
  export interface VaccinationData {
    code?: string;
    name?: string;
    enabled?: boolean;
  }
  export interface VideoCallData {
    vendor?: string;
    roomName?: string;
    accessToken?: string;
  }
  export interface WaitingAppointmentData {
    professionalLegalID?: string;
    code?: string;
    state?: string;
    totalCost?: number; // double
    preAppointmentData?: PreAppointmentData;
    isFirstTimeWithProfessional?: boolean;
    customerData?: CustomerData;
    professionalData?: ProfessionalData;
    positionInQueue?: number; // int64
    inAppointment?: boolean;
  }
  export interface WaitingAppointmentRequest {
    professionalLegalID?: string;
  }
}
declare namespace Paths {
  namespace AcceptAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddAttachment {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCard {
    export type RequestBody = Schemas.PaymentCardRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponsePaymentCardData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCard1 {
    export type RequestBody = Schemas.PaymentCardRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponsePaymentCardData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCertificate {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CertificateRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseCertificateResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddConsent {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.FileRequestTypeName;
    namespace Responses {
      export type $201 = Schemas.ApiResponseInformedConsentResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomer {
    export type RequestBody = Schemas.CustomerRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseProfessionalCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomer1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomerAdmissionNote {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.AdmissionNoteRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseAdmissionNoteResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomerCertificate {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
    }
    export type RequestBody = Schemas.CertificateRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseCertificateResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomerImageRequest {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
    }
    export type RequestBody = Schemas.ImageRequestRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseImageRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomerInterConsultation {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.InterConsultationReq;
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomerLabRequest {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
    }
    export type RequestBody = Schemas.LaboratoryRequestRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseLaboratoryRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomerOtherRequest {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
    }
    export type RequestBody = Schemas.OtherRequestRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseOtherRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomerPrescription {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
    }
    export type RequestBody = Schemas.PrescriptionRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponsePrescriptionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddCustomerProcedure {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
    }
    export type RequestBody = Schemas.ProcedureRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseProcedureResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddEvolution {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.EvolutionRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseEvolutionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddFile {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseProfessionalFileResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddImageRequest {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ImageRequestRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseImageRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddInterconsultation {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.InterConsultationRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddLaboratoryRequest {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.LaboratoryRequestRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseLaboratoryRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddPrescription {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.PrescriptionRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponsePrescriptionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddProduct {
    namespace Parameters {
      export type OrderCode = string;
    }
    export interface PathParameters {
      orderCode: Parameters.OrderCode;
    }
    export type RequestBody = Schemas.OrderProductRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddProduct1 {
    namespace Parameters {
      export type Code = string;
      export type OrderCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      orderCode: Parameters.OrderCode;
    }
    export type RequestBody = Schemas.OrderProductRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddProduct2 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.OrderProductRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddProfessionalReport {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ReportRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseReportResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddReportAttachment {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddResult {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseResultResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AddToCart {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AppData {
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Appointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Appointment1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AppointmentDuration {
    export type RequestBody = Schemas.ProfessionalAppointmentRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Appointments {
    namespace Parameters {
      export type Code = string;
      export type From = string;
      export type HealthCenterCode = string;
      export type HealthServiceCode = string;
      export type LightData = boolean;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type States = string[];
      export type To = string;
      export type WithPrescriptions = boolean;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
      from?: Parameters.From;
      to?: Parameters.To;
      withPrescriptions?: Parameters.WithPrescriptions;
      lightData?: Parameters.LightData;
      healthServiceCode?: Parameters.HealthServiceCode;
      healthCenterCode?: Parameters.HealthCenterCode;
      states?: Parameters.States;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseAppointmentData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Appointments1 {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseChatMessage;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Appointments2 {
    namespace Parameters {
      export type From = string;
      export type HealthCenterCode = string;
      export type HealthServiceCode = string;
      export type LightData = boolean;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type To = string;
      export type WithPrescriptions = boolean;
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
      from?: Parameters.From;
      to?: Parameters.To;
      healthServiceCode?: Parameters.HealthServiceCode;
      healthCenterCode?: Parameters.HealthCenterCode;
      lightData?: Parameters.LightData;
      withPrescriptions?: Parameters.WithPrescriptions;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Appointments3 {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseChatMessage;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Appointments4 {
    namespace Parameters {
      export type From = string;
      export type HealthCenterCode = string;
      export type HealthServiceCode = string;
      export type LightData = boolean;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type To = string;
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
      from?: Parameters.From;
      to?: Parameters.To;
      healthServiceCode?: Parameters.HealthServiceCode;
      healthCenterCode?: Parameters.HealthCenterCode;
      lightData?: Parameters.LightData;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AttachmentData {
    namespace Parameters {
      export type Code = string;
      export type Filename = string;
      export type Id = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      id: Parameters.Id;
      filename: Parameters.Filename;
    }
  }
  namespace Availabilities {
    export type RequestBody = Schemas.ProfessionalAvailabilitiesRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseListAvailabilityData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Availabilities1 {
    namespace Responses {
      export type $200 = Schemas.ApiResponseListAvailabilityData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AvatarData {
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace AvatarData1 {
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace BlockSchedule {
    namespace Parameters {
      export type From = string;
      export type HealthCenterCode = string;
      export type ServiceCode = string;
      export type To = string;
    }
    export interface QueryParameters {
      from: Parameters.From;
      to: Parameters.To;
      healthCenterCode?: Parameters.HealthCenterCode;
      serviceCode?: Parameters.ServiceCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseVoid;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CancelAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CancelAppointment1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CancelOrder {
    namespace Parameters {
      export type OrderCode = string;
    }
    export interface PathParameters {
      orderCode: Parameters.OrderCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CancelOrder1 {
    namespace Parameters {
      export type Code = string;
      export type OrderCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      orderCode: Parameters.OrderCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CancelWaitingAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseWaitingAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CancelWaitingAppointment1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseWaitingAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Cards {
    namespace Parameters {
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponsePaymentCardData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Cards1 {
    namespace Parameters {
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponsePaymentCardData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CertificatePdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace CheckAssistant {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAssistantRequest;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CompleteAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CreateAppointment {
    export type RequestBody = Schemas.AppointmentProfessionalRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CreateAppointment1 {
    export type RequestBody = Schemas.AppointmentCustomerRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CreateCustomer {
    export type RequestBody = Schemas.CustomerRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CreateOrder {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CreateProduct {
    export type RequestBody = Schemas.ProfessionalProductRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseProfessionalProductData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CreateProfessional {
    export type RequestBody = Schemas.ProfessionalRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CreateWaitingAppointment {
    export type RequestBody = Schemas.WaitingAppointmentRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseWaitingAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CurrentHealthCenter {
    export type RequestBody = Schemas.EmailCodeRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CustomerAvatar {
    namespace Parameters {
      export type Filename = string;
      export type LegalID = string;
    }
    export interface PathParameters {
      legalID: Parameters.LegalID;
      filename: Parameters.Filename;
    }
  }
  namespace CustomerDevice {
    export type RequestBody = Schemas.DeviceRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseVoid;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CustomerHealth {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerHealthRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerHealthRequest;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CustomerNotificationData {
    namespace Responses {
      export type $200 = Schemas.ApiResponseNotificationData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CustomersNextRecordID {
    namespace Responses {
      export type $200 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace CustomersTemplate {
    namespace Parameters {
      export type Index = string;
    }
    export interface PathParameters {
      index: Parameters.Index;
    }
  }
  namespace DelAttachment {
    namespace Parameters {
      export type Code = string;
      export type Name = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      name: Parameters.Name;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseInterConsultationResp;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DelCustomerInterConsultation {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResp;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DelProduct {
    namespace Parameters {
      export type OrderCode = string;
      export type ProductCode = string;
    }
    export interface PathParameters {
      orderCode: Parameters.OrderCode;
      productCode: Parameters.ProductCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DelProduct1 {
    namespace Parameters {
      export type Code = string;
      export type OrderCode = string;
      export type ProductCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      orderCode: Parameters.OrderCode;
      productCode: Parameters.ProductCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DelProduct2 {
    namespace Parameters {
      export type Code = string;
      export type ProductCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      productCode: Parameters.ProductCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteAdmissionNote {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseAdmissionNoteResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteAssistant {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseAssistantResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteConsent {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseInformedConsentResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteCustomer {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteCustomerCertificate {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseCertificateResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteCustomerImageRequest {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseImageRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteCustomerLabRequest {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseLaboratoryRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteCustomerOtherRequest {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseOtherRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteCustomerPrescription {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponsePrescriptionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteCustomerProcedure {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseProcedureResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteEvolution {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseEvolutionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteFile {
    namespace Parameters {
      export type Code = string;
      export type FileCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      fileCode: Parameters.FileCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseProfessionalFileResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteProduct {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseProfessionalProductData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteProfessionalReport {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseReportResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteReportAttachment {
    namespace Parameters {
      export type Code = string;
      export type Name = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      name: Parameters.Name;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseInterConsultationResp;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DeleteResult {
    namespace Parameters {
      export type Code = string;
      export type ResultCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      resultCode: Parameters.ResultCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseResultItem;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace DigitalSignData {
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditAdmissionNote {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.AdmissionNoteRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseAdmissionNoteResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditCustomerCertificate {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
    }
    export type RequestBody = Schemas.CertificateRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseCertificateResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditCustomerImageRequest {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.ImageRequestRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseImageRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditCustomerInterConsultation {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.InterConsultationReq;
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditCustomerLabRequest {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.LaboratoryRequestRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseLaboratoryRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditCustomerOtherRequest {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.OtherRequestRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseOtherRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditCustomerPrescription {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.PrescriptionRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponsePrescriptionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditCustomerProcedure {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.ProcedureRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseProcedureResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditEvolution {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.EvolutionRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseEvolutionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditOrder {
    namespace Parameters {
      export type OrderCode = string;
    }
    export interface PathParameters {
      orderCode: Parameters.OrderCode;
    }
    export type RequestBody = Schemas.AppointmentOrderRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditOrder1 {
    namespace Parameters {
      export type Code = string;
      export type OrderCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      orderCode: Parameters.OrderCode;
    }
    export type RequestBody = Schemas.AppointmentOrderRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditOrder2 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.AppointmentOrderRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditProduct {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ProfessionalProductRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseProfessionalProductData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditProfessionalReport {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.ReportRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseReportResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EditResult {
    namespace Parameters {
      export type Code = string;
      export type ResultCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      resultCode: Parameters.ResultCode;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseResultItem;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ElectronicSignData {
    export type RequestBody = Schemas.FilePasswordRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Enable {
    export type RequestBody = Schemas.EmailPasswordRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EnableAssistant {
    export type RequestBody = Schemas.AssistantRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace EnableSchedule {
    namespace Parameters {
      export type From = string;
      export type HealthCenterCode = string;
      export type ServiceCode = string;
      export type To = string;
    }
    export interface QueryParameters {
      from: Parameters.From;
      to: Parameters.To;
      healthCenterCode?: Parameters.HealthCenterCode;
      serviceCode?: Parameters.ServiceCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseVoid;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace File {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
  }
  namespace FindCities {
    namespace Parameters {
      export type Filter = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
      filter: Parameters.Filter;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListCountryData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace FindFaqs {
    namespace Parameters {
      export type Filter = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
      filter?: Parameters.Filter;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseFaqData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace FindInsurances {
    namespace Parameters {
      export type Filter = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
      filter?: Parameters.Filter;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseHealthInsuranceData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace FindSpecialties {
    namespace Parameters {
      export type Filter = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type Profession = string;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
      profession?: Parameters.Profession;
      filter?: Parameters.Filter;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListSpecialtyResponse;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetAdmissionNotes {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListAdmissionNoteResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetAppointmentOperationData {
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOperationData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetAssistant {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseAssistantResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetAssistants {
    namespace Parameters {
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListAssistantResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetBackgroundData {
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerBackgroundData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCertificates {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListCertificateResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetConsents {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListInformedConsentResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomer {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalCustomerData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomer1 {
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerBackground {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerBackground;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerCertificates {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListCertificateResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerImages {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListImageRequestResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerInterConsultation {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResp;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerInterConsultationData {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationReq;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerLabs {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListLaboratoryRequestResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerMedications {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListCustomerMedicationData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerOthers {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListOtherRequestResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerPrescriptions {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListPrescriptionResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerProcedures {
    namespace Parameters {
      export type Appointment = string;
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      appointment?: Parameters.Appointment;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListProcedureResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomerVaccination {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerVaccinationData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetCustomers {
    namespace Parameters {
      export type AgeFrom = number; // int32
      export type AgeTo = number; // int32
      export type City = string;
      export type Gender = string;
      export type Insurance = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type Search = string;
      export type SortBy = string;
      export type Year = number; // int32
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
      search?: Parameters.Search;
      city?: Parameters.City;
      gender?: Parameters.Gender;
      ageFrom?: Parameters.AgeFrom /* int32 */;
      ageTo?: Parameters.AgeTo /* int32 */;
      year?: Parameters.Year /* int32 */;
      insurance?: Parameters.Insurance;
      sortBy?: Parameters.SortBy;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetDiagnoses {
    namespace Parameters {
      export type Search = string;
    }
    export interface QueryParameters {
      search?: Parameters.Search;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListDiagnose;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetEvolutions {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListEvolutionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetFile {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListProfessionalFileResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetGoogleFitData {
    export type RequestBody = Schemas.TokenPeriodRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseGoogleFitData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetGoogleFitHeartPoints {
    export type RequestBody = Schemas.TokenPeriodRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseGoogleFitData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetImage {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseImageResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetImageAvailability {
    namespace Parameters {
      export type Code = string;
      export type Date = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      date: Parameters.Date;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListAvailabilityRange;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetImages {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListImageRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetImages1 {
    namespace Parameters {
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseImageResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetImagesCategories {
    namespace Parameters {
      export type Search = string;
    }
    export interface QueryParameters {
      search?: Parameters.Search;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListCategoryData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetImagesExams {
    namespace Responses {
      export type $200 = Schemas.ApiResponseListCategoryExamData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetInterConsultations {
    namespace Responses {
      export type $200 = Schemas.ApiResponseListInterConsultationResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetInterConsultations1 {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetInterConsultations2 {
    namespace Parameters {
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseInterConsultationResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetInterconsultations {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListInterConsultationResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetLabAvailability {
    namespace Parameters {
      export type Code = string;
      export type Date = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      date: Parameters.Date;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListAvailabilityRange;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetLaboratories {
    namespace Parameters {
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseLaboratoryResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetLaboratoriesCategories {
    namespace Parameters {
      export type Search = string;
    }
    export interface QueryParameters {
      search?: Parameters.Search;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListCategoryData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetLaboratoriesExams {
    namespace Responses {
      export type $200 = Schemas.ApiResponseListCategoryExamData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetLaboratoriesRequests {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListLaboratoryRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetLaboratory {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseLaboratoryResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetMyInterConsultations {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetOperationData {
    namespace Responses {
      export type $200 = Schemas.ApiResponseOperationData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetOrder {
    namespace Parameters {
      export type OrderCode = string;
    }
    export interface PathParameters {
      orderCode: Parameters.OrderCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetOrder1 {
    namespace Parameters {
      export type Code = string;
      export type OrderCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      orderCode: Parameters.OrderCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetOrder2 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetPendentResume {
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalPendentResume;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetPendentResume1 {
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerPendentResume;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetPrescriptions {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListPrescriptionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetPrescriptions1 {
    namespace Parameters {
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponsePrescriptionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetProducts {
    namespace Parameters {
      export type Enabled = boolean;
      export type Filter = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type TaxPercent = number; // double
    }
    export interface QueryParameters {
      filter?: Parameters.Filter;
      enabled?: Parameters.Enabled;
      taxPercent?: Parameters.TaxPercent /* double */;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseProfessionalProductData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetProfessional {
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetProfessional1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetProfessionalReports {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListReportResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetProfessionalUser {
    namespace Responses {
      export type $200 = Schemas.ApiResponseUserData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetReceivedInterConsultation {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResp;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetRecord {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentRecordResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetSubscription {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalSubscriptionData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetSubscriptions {
    namespace Responses {
      export type $200 = Schemas.ApiResponseListSubscriptionData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetUser {
    namespace Responses {
      export type $200 = Schemas.ApiResponseUserData;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetVideoCallData {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseVideoCallData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GetVideoCallData1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseVideoCallData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GuidesCategories {
    namespace Responses {
      export type $200 = Schemas.ApiResponseListGuideCategoryData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace GuidesCategories1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseGuideCategoryData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace HealthData {
    export type RequestBody = Schemas.CustomerHealthRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ImageAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ProviderRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseImageResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ImagePdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace ImageResult {
    namespace Parameters {
      export type Code = string;
      export type ItemCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      itemCode: Parameters.ItemCode;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseImageResultItem;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ImageResult1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseImageResultResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ImageResults {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseImageResultResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ImgResults {
    namespace Parameters {
      export type Code = string;
      export type From = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type Seen = boolean;
      export type To = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      from?: Parameters.From;
      to?: Parameters.To;
      seen?: Parameters.Seen;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseListImageResultItem;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ImportCustomers {
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseListImportResult;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ImportProducts {
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseListImportResult;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace InformedConsent {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
  }
  namespace InsuranceTemplate {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
  }
  namespace InterConsultationAttachment {
    namespace Parameters {
      export type Code = string;
      export type Name = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      name: Parameters.Name;
    }
    namespace Responses {
      export type $200 = string; // binary
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace InterConsultationPdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace InterConsultationReportAttachment {
    namespace Parameters {
      export type Code = string;
      export type Name = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      name: Parameters.Name;
    }
    namespace Responses {
      export type $200 = string; // binary
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace InterConsultationReportPdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace InviteAssistant {
    export type RequestBody = Schemas.EmailNameRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace InviteProfessionals {
    export type RequestBody = Schemas.EmailsNameRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace InvoiceOrder {
    namespace Parameters {
      export type OrderCode = string;
    }
    export interface PathParameters {
      orderCode: Parameters.OrderCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace InvoiceOrder1 {
    namespace Parameters {
      export type Code = string;
      export type OrderCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      orderCode: Parameters.OrderCode;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace LabResult {
    namespace Parameters {
      export type Code = string;
      export type ItemCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      itemCode: Parameters.ItemCode;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseLaboratoryResultItem;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace LabResult1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseLaboratoryResultResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace LabResults {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseLaboratoryResultResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace LabResults1 {
    namespace Parameters {
      export type Code = string;
      export type From = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type Seen = boolean;
      export type To = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      from?: Parameters.From;
      to?: Parameters.To;
      seen?: Parameters.Seen;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseListLaboratoryResultItem;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace LaboratoriesPdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace LaboratoryAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ProviderRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseLaboratoryResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ListOrders {
    namespace Parameters {
      export type CustomerCode = string;
      export type From = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type PaymentMethod = string;
      export type State = string;
      export type To = string;
    }
    export interface QueryParameters {
      from?: Parameters.From;
      to?: Parameters.To;
      customerCode?: Parameters.CustomerCode;
      state?: Parameters.State;
      paymentMethod?: Parameters.PaymentMethod;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseAppointmentOrderData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ListOrders1 {
    namespace Parameters {
      export type Code = string;
      export type From = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type PaymentMethod = string;
      export type State = string;
      export type To = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      from?: Parameters.From;
      to?: Parameters.To;
      state?: Parameters.State;
      paymentMethod?: Parameters.PaymentMethod;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseAppointmentOrderData;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Login {
    export type RequestBody = Schemas.EmailPasswordRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseTokenLegalID;
      export type $401 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace LogoData {
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace MarkSeenResults {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CodesSeenRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseBoolean;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace MediaData {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
  }
  namespace OauthCallback {
    namespace Parameters {
      export interface Params {
        [name: string]: string;
      }
    }
    export interface QueryParameters {
      params: Parameters.Params;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace OtherPdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace OtherResult {
    namespace Parameters {
      export type Code = string;
      export type ItemCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      itemCode: Parameters.ItemCode;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseOtherResultItem;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace OtherResult1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ResultFileRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseOtherResultResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace OtherResults {
    namespace Parameters {
      export type Code = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseOtherResultResponse;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace OtherResults1 {
    namespace Parameters {
      export type Code = string;
      export type From = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type Seen = boolean;
      export type To = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      from?: Parameters.From;
      to?: Parameters.To;
      seen?: Parameters.Seen;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponseListOtherResultItem;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PayAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.PaymentCardRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PayAppointment1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PayCartItems {
    export type RequestBody = Schemas.PaymentCardRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponsePaymentCart;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PayOrder {
    namespace Parameters {
      export type OrderCode = string;
    }
    export interface PathParameters {
      orderCode: Parameters.OrderCode;
    }
    export type RequestBody = Schemas.PaymentFileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PayOrder1 {
    namespace Parameters {
      export type Code = string;
      export type OrderCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      orderCode: Parameters.OrderCode;
    }
    export type RequestBody = Schemas.PaymentFileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PayOrder2 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.PaymentFileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentOrderData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PaySubscription {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.PaymentCardRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PayWaitingAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.PaymentCardRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseWaitingAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PayWaitingAppointment1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseWaitingAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PaymentCart {
    namespace Responses {
      export type $200 = Schemas.ApiResponsePaymentCart;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PaymentCartItems {
    export type RequestBody = Schemas.EnableDisableRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponsePaymentCart;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PhysicalExams {
    namespace Parameters {
      export type ExamType = string;
      export type Search = string;
    }
    export interface PathParameters {
      examType: Parameters.ExamType;
    }
    export interface QueryParameters {
      search?: Parameters.Search;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListPhysicalExamData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PreAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.PreAppointmentRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace PrescriptionPdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace ProcedurePdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace ProfessionalAvailability {
    namespace Parameters {
      export type Code = string;
      export type From = string;
      export type To = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      from: Parameters.From;
      to?: Parameters.To;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListProfessionalScheduleData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ProfessionalAvatar {
    namespace Parameters {
      export type Asset = string;
      export type Filename = string;
      export type LegalID = string;
    }
    export interface PathParameters {
      asset: Parameters.Asset;
      legalID: Parameters.LegalID;
      filename: Parameters.Filename;
    }
  }
  namespace ProfessionalDevice {
    export type RequestBody = Schemas.DeviceRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseVoid;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ProfessionalPrices {
    export type RequestBody = Schemas.ProfessionalPricesRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace RateAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.RateAppointmentRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Record {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.AppointmentRecordRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentRecordResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Register {
    export type RequestBody = Schemas.EmailRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace RemoveCard {
    namespace Parameters {
      export type Token = string;
    }
    export interface PathParameters {
      token: Parameters.Token;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePaymentCardData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace RemoveCard1 {
    namespace Parameters {
      export type Token = string;
    }
    export interface PathParameters {
      token: Parameters.Token;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePaymentCardData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace RemoveCustomer {
    namespace Responses {
      export type $200 = Schemas.ApiResponseUserData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace RemovePaymentCartItem {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePaymentCart;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ReportError {
    export type RequestBody = Schemas.ErrorRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ReportPdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace Requests {
    namespace Parameters {
      export type Code = string;
      export type From = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type RequestType = string;
      export type To = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      from?: Parameters.From;
      to?: Parameters.To;
      requestType?: Parameters.RequestType;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponsePageResponseRequestItem;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace RescheduleAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.AppointmentCustomerRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace RescheduleAppointment1 {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.AppointmentCustomerRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Result {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
  }
  namespace ResultContent {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
      export type ResultCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      resultCode: Parameters.ResultCode;
    }
    namespace Responses {
      export type $201 = string; // binary
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ResultContent1 {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
      export type ResultCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      resultCode: Parameters.ResultCode;
    }
    namespace Responses {
      export type $201 = string; // binary
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ResultContent2 {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
      export type ResultCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
      resultCode: Parameters.ResultCode;
    }
    namespace Responses {
      export type $201 = string; // binary
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ResultPdf {
    namespace Parameters {
      export type Code = string;
      export type HealthCenterCode = string;
      export type ResultCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      resultCode: Parameters.ResultCode;
    }
    export interface QueryParameters {
      healthCenterCode?: Parameters.HealthCenterCode;
    }
  }
  namespace Results {
    namespace Parameters {
      export type Code = string;
      export type From = string;
      export type Page = number; // int32
      export type PageSize = number; // int32
      export type RequestType = string;
      export type Seen = boolean;
      export type To = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export interface QueryParameters {
      from?: Parameters.From;
      to?: Parameters.To;
      requestType?: Parameters.RequestType;
      seen?: Parameters.Seen;
      page?: Parameters.Page /* int32 */;
      pageSize?: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $201 = Schemas.ApiResponsePageResponseResultItem;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SaveGoogleAuth {
    export type RequestBody = Schemas.TokenRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseVoid;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SaveInterConsultationReport {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.InterConsultationReport;
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SaveNutrition {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerNutritionData;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerNutritionData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SaveVaccination {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerVaccinationData;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerVaccinationData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Schedule {
    namespace Parameters {
      export type From = string;
      export type HealthCenter = string;
      export type To = string;
    }
    export interface QueryParameters {
      healthCenter?: Parameters.HealthCenter;
      from: Parameters.From;
      to?: Parameters.To;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseListProfessionalScheduleData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SearchImages {
    export type RequestBody = Schemas.ProviderSearchRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseImageProviderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SearchLabs {
    export type RequestBody = Schemas.ProviderSearchRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseLaboratoryProviderData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SearchProfessionals {
    export type RequestBody = Schemas.ProfessionalSearchRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SearchProfessionals1 {
    export type RequestBody = Schemas.ProfessionalSearchRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendAdmissionNote {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseAdmissionNoteResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomer {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseReportResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomer1 {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseProcedureResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomer2 {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponsePrescriptionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomer3 {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseInformedConsentResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomer4 {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseCertificateResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomerImage {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseImageRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomerInterConsultation {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomerLab {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseLaboratoryRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomerOther {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseOtherRequestResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendCustomerResult {
    namespace Parameters {
      export type Code = string;
      export type ResultCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      resultCode: Parameters.ResultCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseResultItem;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendInterConsultationReport {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseInterConsultationResp;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendMessage {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.ChatMessage;
  }
  namespace SendToCustomer {
    namespace Parameters {
      export type Code = string;
      export type RequestCode = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
      requestCode: Parameters.RequestCode;
    }
    export type RequestBody = Schemas.CustomerAvailabilityRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseEvolutionResponse;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SendValidation {
    export type RequestBody = Schemas.EmailRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SetAvatar {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.FileRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace SetInProgress {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace StartWaitingAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace ToggleFavorite {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateAllergies {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerAllergies;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerAllergies;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateCustomer {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateCustomer1 {
    export type RequestBody = Schemas.CustomerRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateCustomerHabits {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerHabits;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerHabits;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateCustomerMedications {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerMedicationsRequest;
    namespace Responses {
      export type $201 = Schemas.ApiResponseListCustomerMedicationData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateCustomerNotes {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.NotesRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateCustomerPathologies {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerPathologies;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerPathologies;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateCustomerSurgical {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerSurgicalData;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerSurgicalData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateFamilyPathologies {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerFamilyPathologies;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerFamilyPathologies;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateGynecology {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerGynecologyData;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerGynecologyData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateProfessional {
    export type RequestBody = Schemas.ProfessionalRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseProfessionalData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdatePsychiatric {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.CustomerPsychiatricData;
    namespace Responses {
      export type $200 = Schemas.ApiResponseCustomerPsychiatricData;
      export type $400 = Schemas.ApiResponseError;
      export type $404 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace UpdateUser {
    export type RequestBody = Schemas.EmailPasswordRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseUserData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace Validate {
    export type RequestBody = Schemas.EmailCodeRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseString;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace VendorAuth {
    namespace Parameters {
      export type Vendor = string;
    }
    export interface PathParameters {
      vendor: Parameters.Vendor;
    }
    export interface RequestBody {
      [name: string]: unknown;
    }
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace WaitingAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponseWaitingAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace WaitingAppointments {
    namespace Parameters {
      export type Page = number; // int32
      export type PageSize = number; // int32
    }
    export interface QueryParameters {
      page: Parameters.Page /* int32 */;
      pageSize: Parameters.PageSize /* int32 */;
    }
    namespace Responses {
      export type $200 = Schemas.ApiResponsePageResponseWaitingAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
  namespace WaitingPreAppointment {
    namespace Parameters {
      export type Code = string;
    }
    export interface PathParameters {
      code: Parameters.Code;
    }
    export type RequestBody = Schemas.PreAppointmentRequest;
    namespace Responses {
      export type $200 = Schemas.ApiResponseWaitingAppointmentData;
      export type $400 = Schemas.ApiResponseError;
      export type $500 = Schemas.ApiResponseError;
    }
  }
}
