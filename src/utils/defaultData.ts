import moment from "moment";
import { RequestType } from "./enums";

export const defaultProfessionalData = {
  firstName: "-",
  lastName: "-",
  firstFamilyName: "-",
  lastFamilyName: "-",
  birthdateDay: moment().subtract(30, "year").date(),
  birthdateMonth: moment().subtract(30, "year").month() + 1,
  birthdateYear: moment().subtract(30, "year").year(),
  legalID: "-",
  professionalID: "-",
  nationality: "-",
  city: "-",
  gender: "-",
  profession: "-",
  phones: [],
  agreeToBePublic: false,
  insurances: [],
  languages: [],
  rateActivated: false,
  professionalEmail: "-",
  aboutMe: "-",
  curriculum: [],
  hospitals: [],
  acceptedTerms: false,
  declareTruth: false,
  acceptToBeContacted: false,
  healthCenters: [],
  rateAverage: 0, // double
  avatarUrl: "-",
  logoUrl: "-",
  digitalSignUrl: "-",
  review: "-", // Is not in the API,
  specialties: [],
  billingLegalID: undefined,
  billingLegalIDType: undefined,
  billingName: undefined,
  province: "-",
  billingAddress: undefined,
  billingEmail: undefined,
  prices: [],
  state: "-",
} as Schemas.ProfessionalData;

export const defaultCustomerData: Schemas.CustomerData = {
  firstName: "",
  lastName: "",
  firstFamilyName: "",
  lastFamilyName: "",
  birthdateDay: moment().subtract(30, "year").date(),
  birthdateMonth: moment().subtract(30, "year").month() + 1,
  birthdateYear: moment().subtract(30, "year").year(),
  legalID: "",
  nationality: "",
  gender: "",
  educationLevel: "",
  profession: "",
  phones: [],
  addresses: [],
  agreeToBeContacted: false,
  insurances: [],
  rateAverage: 0,
  weightInKilograms: 0,
  heightInCentimeters: 0,
  bloodType: "",
  allergies: [],
  drugAllergies: [],
  diseases: {},
  medicines: {},
  surgeries: {},
  familyDiseases: {},
  billingLegalID: undefined,
  billingLegalIDType: undefined,
  billingName: undefined,
  province: "",
  billingAddress: undefined,
  billingEmail: undefined,
  hasEmail: true,
} as Schemas.CustomerData;

export const defaultPreAppointmentData: Schemas.PreAppointmentData = {
  reason: "",
};

export const defaultHealthCenterData: Schemas.HealthCenterData = {
  code: "",
  name: "-",
  city: "",
  address: "",
  latitude: 0,
  longitude: 0,
  notes: "",
};

export const defaultAppointmentData = {
  professionalLegalID: "",
  serviceCode: "",
  healthCenterCode: "",
  code: "",
  state: "",
  totalCost: 0,
  preAppointmentData: defaultPreAppointmentData,
  isFirstTimeWithProfessional: true,
  customerData: defaultCustomerData,
  professionalData: defaultProfessionalData,
  healthCenterData: defaultHealthCenterData,
  from: {
    dateDay: 0,
    dateMonth: 0,
    dateYear: 0,
    timeHour: 0,
    timeMinute: 0,
  },
  to: {
    dateDay: 0,
    dateMonth: 0,
    dateYear: 0,
    timeHour: 0,
    timeMinute: 0,
  },
  diagnoses: [
    "J06, Infecciones agudas de las vías respiratorias superiores, de sitios múltiples o no especificados",
  ],
  treatment: ["paracetamol 500 MG"],
  specialtyCode: "",
  addToCart: false,
  paymentMethods: [],
  parentCode: "",
  stateByProfessional: false,
  record: {},
  prescriptions: [],
} as Required<Schemas.AppointmentData>;

export const defaultRecord = {
  reason: "",
  currentDiseaseHistory: [],
  weight: 0,
  height: 0,
  heartRate: 0,
  respiratoryFrequency: 0,
  systolicBloodPressure: 0,
  diastolicBloodPressure: 0,
  oxygenSaturation: 0,
  temperature: 0,
  alcoholism: "",
  allergies: [],
  analysis: [],
  diagnoses: [],
  diseases: [],
  drugAllergies: [],
  familyDiseases: [],
  medicines: [],
  other: [],
  otherDrugs: [],
  pathologicalBackground: [],
  physicalActivity: "",
  physicalExam: [],
  physicalExamByBody: {},
  physicalExamBySystem: {},
  recentVaccinations: [],
  smoking: "",
  surgeries: [],
  treatmentPlan: [],
} as Required<Schemas.AppointmentRecordResponse>;

export const defaultVaccineSchema: Schemas.CustomerVaccinationData = {
  categories: [],
};

export const appetiteLevelOptions = [
  "Excesivo",
  "Bueno",
  "Regular",
  "Poco",
  "Nulo",
];

export const authMode = {
  recovery: "recovery",
  register: "register",
};

export type AuthModeType = keyof typeof authMode;

export const dailyGlassesOfWaterOptions = ["1 ó menos", "2 a 3", "4 ó más"];

export const defaultPrescriptionRequest: Schemas.PrescriptionResponse = {
  diagnoses: [],
  recommendations: [],
  warningSignals: [],
  items: [],
  professional: defaultProfessionalData,
};
export const DefaultPrescriptionRequest2: Schemas.PrescriptionResponse[] = [
  {
    diagnoses: [],
    recommendations: [],
    warningSignals: [],
    items: [],
    createdAt: {
      dateDay: 0,
      dateMonth: 0,
      dateYear: 0,
      timeHour: 0,
      timeMinute: 0,
    },
    professional: defaultProfessionalData,
  },
];

export const defaultCertificate = {
  details: [],
  diagnoses: [],
} as Schemas.CertificateRequest;

export const defaultProcedure = {
  name: "",
  details: [],
  diagnoses: [],
} as Schemas.ProcedureRequest;

export const defaultRecipe: Schemas.PrescriptionItemRequest[] = [
  {
    medicine: "",
    genericMedicine: "",
    doseMg: 0,
    quantity: 0,
    hoursFrequency: 0,
    presentation: "",
    notes: "",
  },
];

export const familyParents = [
  "Padre",
  "Madre",
  "Abuelo materno",
  "Abuelo paterno",
  "Abuela materna",
  "Abuela paterna",
  "Hermano",
  "Hermana",
  "Tío",
  "Tía",
  "Otros",
];
export const habits = [
  "Tabaquismo",
  "Alcohol",
  "Drogas",
  "Actividad física",
  "Hábitos alimentarios",
  "Otros",
];
export const defaultPrescriptions: Schemas.PrescriptionResponse[] = [];

export const defaultAllergies: Schemas.CustomerAllergies = {};

export const defaultPlan: Schemas.SubscriptionData = {
  code: "12345",
  name: "Plan no especificado",
  days: 0,
  discount: 0,
  favorite: false,
  features: [],
  price: 0,
  tax: 0,
  total: 0,
};

export const defaultAssistantData: Schemas.AssistantResponse = {
  code: "-",
  email: "-",
  name: "-",
  password: "-",
  createdAt: {
    dateDay: moment().subtract(30, "year").date(),
    dateMonth: moment().subtract(30, "year").month() + 1,
    dateYear: moment().subtract(30, "year").year(),
    timeHour: 0,
    timeMinute: 0,
  },
};

export const defaultResultRequest: Schemas.ResultFileRequest & {
  requestType: RequestType;
} = {
  analysis: "",
  base64: "",
  description: "",
  diagnoses: [],
  name: "",
  observations: "",
  requestName: "",
  requestType: undefined as RequestType,
  title: "",
};

export const defaultPrescriptionItemRequest: Schemas.PrescriptionItemRequest = {
  genericMedicine: "",
  medicine: "",
  presentation: "",
  quantity: undefined,
  via: "",
  doseMg: undefined,
  hoursFrequency: undefined,
  duration: undefined,
  notes: "",
  concentration: "",
};

export const defaultServiceRequest: Schemas.ProfessionalProductRequest = {
  basePrice: 0,
  code: "",
  description: "",
  enabled: true,
  name: "",
  productType: "",
  taxPercent: 0,
};

export const defaultIVAPercents = [
  { value: "-1", label: "Todos los IVA" },
  { value: "0", label: "0%" },
  { value: "12", label: "12%" },
];

export const defaultOrderData: Schemas.AppointmentOrderData = {
  code: "",
  products: [],
  subtotal: 0,
  discount: 0,
};

export const defaultOrderDetail: Schemas.AppointmentOrderData = {
  code: "-",
  total: 0,
  discount: 0,
  subtotal: 0,
  subtotalTax12: 0,
  subtotalNoTax: 0,
  tax12: 0,
  state: "-",
  products: [
    {
      code: "-",
      basePrice: 0,
      name: "-",
      discount: 0,
      tax12: 0,
      subtotal: 0,
    },
  ],
  payments: [
    {
      amount: 0,
      paymentMethod: "-",
    },
  ],
  createdAt: {
    dateDay: 0,
    dateMonth: 0,
    dateYear: 0,
  },
};

export const paymentMethods = [
  { label: "EFECTIVO", value: "EFECTIVO" },
  { label: "TRANSFERENCIA BANCARIA", value: "TRANSFERENCIA BANCARIA" },
  { label: "TRANSFERENCIA TARJETA", value: "TRANSFERENCIA TARJETA" },
];

export const orderStateOptions = [
  { label: "Pagadas", value: "PAID" },
  { label: "Pendientes", value: "PENDENT" },
  { label: "Canceladas", value: "CANCELED" },
];

export const presentationData = [
  { label: "Acondicionador", value: "Acondicionador" },
  { label: "Ampolla", value: "Ampolla" },
  { label: "Caja", value: "Caja" },
  { label: "Cápsula", value: "Cápsula" },
  { label: "Comprimido (s)", value: "Comprimido (s)" },
  { label: "Crema", value: "Crema" },
  { label: "Emulsión", value: "Emulsión" },
  { label: "Frasco (s)", value: "Frasco (s)" },
  { label: "Gel", value: "Gel" },
  { label: "Gotas", value: "Gotas" },
  { label: "Gragea (s))", value: "Gragea (s)" },
  { label: "Inhalador", value: "Inhalador" },
  { label: "Jabón", value: "Jabón" },
  { label: "Jalea", value: "Jalea" },
  { label: "Jarabe", value: "Jarabe" },
  { label: "Loción", value: "Loción" },
  { label: "Microenema", value: "Microenema" },
  { label: "Parche (s)", value: "Parche (s)" },
  { label: "Óvulos (s)", value: "Óvulos (s)" },
  { label: "Pomada", value: "Pomada" },
  { label: "Sachet", value: "Sachet" },
  { label: "Shampoo", value: "Shampoo" },
  { label: "Sobre (s)", value: "Sobre (s)" },
  { label: "Spray", value: "Spray" },
  { label: "Supositorio (s)", value: "Supositorio (s)" },
  { label: "Suspensión", value: "Suspensión" },
  { label: "Tableta masticable", value: "Tableta masticable" },
  { label: "Tableta (s)", value: "Tableta (s)" },
  { label: "Tarro (s)", value: "Tarro (s)" },
  { label: "Vial", value: "Vial" },
];

export const viaData = [
  { label: "Inhalador", value: "Inhalador" },
  { label: "Intraarterial", value: "Intraarterial" },
  { label: "Intraarticular", value: "Intraarticular" },
  { label: "Intramuscular", value: "Intramuscular" },
  { label: "Intranasal", value: "Intranasal" },
  { label: "Intraoseo", value: "Intraoseo" },
  { label: "Intraotico", value: "Intraotico" },
  { label: "Intratecal", value: "Intratecal" },
  { label: "Intravenoso", value: "Intravenoso" },
  { label: "Ocular", value: "Ocular" },
  { label: "Oral", value: "Oral" },
  { label: "Rectal", value: "Rectal" },
  { label: "Subcutánea", value: "Subcutánea" },
  { label: "Sublingual", value: "Sublingual" },
  { label: "Tópico", value: "Tópico" },
  { label: "Transdérmico", value: "Transdérmico" },
  { label: "Vaginal", value: "Vaginal" },
];

export const defaultBackgroundData = {
  backgroundFamilyPathologies: [],
  backgroundPersonalPathologies: [],
  backgroundPsychiatry: [],
  customerHabits: [],
  customerNutrition: [],
};

export const defaultGynecologyObject: Schemas.CustomerGynecologyData = {
  menarche: 0,
  thelarche: 0,
  sexualInitiation: 0,
  caesareans: 0,
  pregnancies: 0,
  abortions: 0,
  childbirths: 0,
  livingChildren: 0,
  sexualActivity: "",
  ets: [],
  tests: [],
  lastMenstruation: {},
};

export const defaultMedicineResults = [{ code: "", medicine: "" }];

export const defaultProfessionalAppointmentDurationInMinutes = 30;
export const defaultStyleTextArea = { height: 45, width: 200, maxWidth: 500 };

export const defaultPrescriptionsItem = {} as Schemas.PrescriptionResponse;

export const hoursFrequency = [
  { label: "CADA 1 HORA", value: 1 },
  { label: "CADA 2 HORAS", value: 2 },
  { label: "CADA 3 HORAS", value: 3 },
  { label: "CADA 4 HORAS", value: 4 },
  { label: "CADA 5 HORAS", value: 5 },
  { label: "CADA 6 HORAS", value: 6 },
  { label: "CADA 8 HORAS", value: 8 },
  { label: "CADA 12 HORAS", value: 12 },
  { label: "CADA 24 HORAS", value: 24 },
  { label: "CADA 48 HORAS", value: 48 },
  { label: "CADA 72 HORAS", value: 72 },
  { label: "CADA 96 HORAS", value: 96 },
];

export const duration = [
  { label: "POR 1 DÍA", value: 1 },
  { label: "POR 2 DÍAS", value: 2 },
  { label: "POR 3 DÍAS", value: 3 },
  { label: "POR 4 DÍAS", value: 4 },
  { label: "POR 5 DÍAS", value: 5 },
  { label: "POR 6 DÍAS", value: 6 },
  { label: "POR 1 SEMANA", value: 7 },
  { label: "POR 2 SEMANAS", value: 14 },
  { label: "POR 3 SEMANAS", value: 21 },
  { label: "POR 1 MES", value: 30 },
  { label: "POR 2 MESES", value: 60 },
  { label: "POR 3 MESES", value: 90 },
  { label: "POR 4 MESES", value: 120 },
];

export const defaultResult = {} as Schemas.ResultResponse;
