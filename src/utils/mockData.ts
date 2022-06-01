import shortid from "shortid";

export type MockResultType = {
  index: number;
  code: string;
  date: string;
  time: string;
  patientName: string;
  diagnosis: string[];
  request: string[];
  visited: boolean;
};

export const mockResults: MockResultType[] = [
  {
    index: 1,
    code: shortid(),
    date: "2020/12/20",
    time: "20:00",
    diagnosis: ["Diagnoses 1", "Dignoses 2"],
    patientName: "Asiel Alonso",
    request: ["Request 1", "Request 2"],
    visited: false,
  },
  {
    index: 2,
    code: shortid(),
    date: "2020/12/20",
    time: "20:00",
    diagnosis: ["Diagnoses 12", "Dignoses 22"],
    patientName: "Asiel Alonso 1",
    request: ["Request 12", "Request 22"],
    visited: true,
  },
  {
    index: 3,
    code: shortid(),
    date: "2020/12/20",
    time: "20:00",
    diagnosis: ["Diagnoses 13", "Dignoses 23"],
    patientName: "Asiel Alonso 2",
    request: ["Request 13", "Request 23"],
    visited: false,
  },
  {
    index: 4,
    code: shortid(),
    date: "2020/12/20",
    time: "20:00",
    diagnosis: ["Diagnoses 14", "Dignoses 24"],
    patientName: "Asiel Alonso 3",
    request: ["Request 14", "Request 24"],
    visited: true,
  },
];

export const historicalInterConsultItemsReceivedByMe = [
  {
    createdAt: {
      dateDay: 4,
      dateMonth: 1,
      dateYear: 2021,
      timeHour: 14,
      timeMinute: 30,
    },
    diagnoses: [],
    seenByTarget: true,
    fromProfessional: {
      legalID: "12345567865433",
      professionalID: "12345567865433",

      firstName: "First Name 1",
      firstFamilyName: " Last Name 1",
      lastFamilyName: " Last Name 1",
      birthdateDay: 25,
      birthdateMonth: 6,
      birthdateYear: 2021,
    },
    reason: "Reason 1, Reason 2",
    report: undefined,
    attachments: ["attachment 1", "attachment 2"],
  },
  {
    createdAt: {
      dateDay: 4,
      dateMonth: 1,
      dateYear: 2021,
      timeHour: 14,
      timeMinute: 30,
    },
    diagnoses: [],
    seenByTarget: true,
    fromProfessional: {
      legalID: "12345567865433",
      professionalID: "12345567865433",

      firstName: " First Name 2",
      firstFamilyName: " Last Name 2",
      lastFamilyName: " Last Name 1",
      birthdateDay: 25,
      birthdateMonth: 6,
      birthdateYear: 2021,
    },
    reason: "Reason 1, Reason 2",
    report: {},
    attachments: ["attachment 1", "attachment 2"],
  },
];

export const historicalInterConsultItemsMadeByMe = [
  {
    createdAt: {
      dateDay: 4,
      dateMonth: 1,
      dateYear: 2021,
      timeHour: 14,
      timeMinute: 30,
    },
    diagnoses: [],
    seenByTarget: true,
    fromProfessional: {
      legalID: "12345567865433",
      professionalID: "12345567865433",

      firstName: " First Name 3",
      firstFamilyName: " Last Name 3",
      lastFamilyName: " Last Name 1",
      birthdateDay: 25,
      birthdateMonth: 6,
      birthdateYear: 2021,
    },
    reason: "Reason 1, Reason 2",

    report: undefined,
    attachments: ["attachment 1", "attachment 2"],
  },
  {
    createdAt: {
      dateDay: 4,
      dateMonth: 1,
      dateYear: 2021,
      timeHour: 14,
      timeMinute: 30,
    },
    diagnoses: [],
    seenByTarget: true,
    fromProfessional: {
      legalID: "12345567865433",
      professionalID: "12345567865433",

      firstName: " First Name 3",
      firstFamilyName: " Last Name 3",
      lastFamilyName: " Last Name 1",
      birthdateDay: 25,
      birthdateMonth: 6,
      birthdateYear: 2021,
    },
    reason: "Reason 1, Reason 2",
    report: {},
    attachments: ["attachment 1", "attachment 2"],
  },
];

export const healthCenters: Schemas.ProfessionalHealthCenterResponse[] = [
  { code: "1", name: "Consultorio #1", address: "Dirección Consultorio #1" },
  { code: "2", name: "Consultorio #2", address: "Dirección Consultorio #2" },
  { code: "3", name: "Consultorio #3", address: "Dirección Consultorio #3" },
  { code: "4", name: "Consultorio #4", address: "Dirección Consultorio #4" },
  { code: "5", name: "Consultorio #5", address: "Dirección Consultorio #5" },
];

export const mockAppointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2021, 1, 3, 9, 35),
    endDate: new Date(2021, 1, 3, 11, 30),
    id: 0,
    location: "Room 1",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2018, 5, 25, 12, 11),
    endDate: new Date(2018, 5, 25, 13, 0),
    id: 1,
    location: "Room 1",
  },
  {
    title: "Install New Router in Dev Room",
    startDate: new Date(2018, 5, 25, 14, 30),
    endDate: new Date(2018, 5, 25, 15, 35),
    id: 2,
    location: "Room 2",
  },
  {
    title: "Approve Personal Computer Upgrade Plan",
    startDate: new Date(2018, 5, 26, 10, 0),
    endDate: new Date(2018, 5, 26, 11, 0),
    id: 3,
    location: "Room 2",
  },
  {
    title: "Final Budget Review",
    startDate: new Date(2018, 5, 26, 12, 0),
    endDate: new Date(2018, 5, 26, 13, 35),
    id: 4,
    location: "Room 2",
  },
  {
    title: "New Brochures",
    startDate: new Date(2018, 5, 26, 14, 30),
    endDate: new Date(2018, 5, 26, 15, 45),
    id: 5,
    location: "Room 2",
  },
  {
    title: "Install New Database",
    startDate: new Date(2018, 5, 27, 9, 45),
    endDate: new Date(2018, 5, 27, 11, 15),
    id: 6,
    location: "Room 1",
  },
  {
    title: "Approve New Online Marketing Strategy",
    startDate: new Date(2018, 5, 27, 12, 0),
    endDate: new Date(2018, 5, 27, 14, 0),
    id: 7,
    location: "Room 3",
  },
  {
    title: "Upgrade Personal Computers",
    startDate: new Date(2018, 5, 27, 15, 15),
    endDate: new Date(2018, 5, 27, 16, 30),
    id: 8,
    location: "Room 3",
  },
  {
    title: "Customer Workshop",
    startDate: new Date(2018, 5, 28, 11, 0),
    endDate: new Date(2018, 5, 28, 12, 0),
    id: 9,
    location: "Room 3",
  },
  {
    title: "Prepare 2015 Marketing Plan",
    startDate: new Date(2018, 5, 28, 11, 0),
    endDate: new Date(2018, 5, 28, 13, 30),
    id: 10,
    location: "Room 1",
  },
  {
    title: "Brochure Design Review",
    startDate: new Date(2018, 5, 28, 14, 0),
    endDate: new Date(2018, 5, 28, 15, 30),
    id: 11,
    location: "Room 2",
  },
  {
    title: "Create Icons for Website",
    startDate: new Date(2018, 5, 29, 10, 0),
    endDate: new Date(2018, 5, 29, 11, 30),
    id: 12,
    location: "Room 2",
  },
  {
    title: "Upgrade Server Hardware",
    startDate: new Date(2018, 5, 29, 14, 30),
    endDate: new Date(2018, 5, 29, 16, 0),
    id: 13,
    location: "Room 3",
  },
  {
    title: "Submit New Website Design",
    startDate: new Date(2018, 5, 29, 16, 30),
    endDate: new Date(2018, 5, 29, 18, 0),
    id: 14,
    location: "Room 3",
  },
  {
    title: "Launch New Website",
    startDate: new Date(2018, 5, 29, 12, 20),
    endDate: new Date(2018, 5, 29, 14, 0),
    id: 15,
    location: "Room 2",
  },
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2018, 6, 2, 9, 30),
    endDate: new Date(2018, 6, 2, 15, 30),
    id: 16,
    location: "Room 1",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2018, 6, 2, 12, 0),
    endDate: new Date(2018, 6, 2, 13, 0),
    id: 17,
    location: "Room 3",
  },
  {
    title: "Install New Router in Dev Room",
    startDate: new Date(2018, 6, 2, 14, 30),
    endDate: new Date(2018, 6, 2, 17, 30),
    id: 18,
    location: "Room 2",
  },
  {
    title: "Approve Personal Computer Upgrade Plan",
    startDate: new Date(2018, 6, 2, 16, 0),
    endDate: new Date(2018, 6, 3, 9, 0),
    id: 19,
    location: "Room 2",
  },
  {
    title: "Final Budget Review",
    startDate: new Date(2018, 6, 3, 10, 15),
    endDate: new Date(2018, 6, 3, 13, 35),
    id: 20,
    location: "Room 1",
  },
  {
    title: "New Brochures",
    startDate: new Date(2018, 6, 3, 14, 30),
    endDate: new Date(2018, 6, 3, 15, 45),
    id: 21,
    location: "Room 3",
  },
  {
    title: "Install New Database",
    startDate: new Date(2018, 6, 3, 15, 45),
    endDate: new Date(2018, 6, 4, 12, 15),
    id: 22,
    location: "Room 3",
  },
  {
    title: "Approve New Online Marketing Strategy",
    startDate: new Date(2018, 6, 4, 12, 35),
    endDate: new Date(2018, 6, 4, 14, 15),
    id: 23,
    location: "Room 3",
  },
  {
    title: "Upgrade Personal Computers",
    startDate: new Date(2018, 6, 4, 15, 15),
    endDate: new Date(2018, 6, 4, 20, 30),
    id: 24,
    location: "Room 2",
  },
  {
    title: "Customer Workshop",
    startDate: new Date(2018, 6, 5, 6, 0),
    endDate: new Date(2018, 6, 5, 14, 20),
    id: 25,
    location: "Room 1",
  },
  {
    title: "Customer Workshop",
    startDate: new Date(2018, 6, 5, 14, 35),
    endDate: new Date(2018, 6, 5, 16, 20),
    id: 26,
    location: "Room 1",
  },
  {
    title: "Customer Workshop 2",
    startDate: new Date(2018, 6, 5, 10, 0),
    endDate: new Date(2018, 6, 5, 11, 20),
    id: 27,
    location: "Room 2",
  },
  {
    title: "Prepare 2015 Marketing Plan",
    startDate: new Date(2018, 6, 5, 20, 0),
    endDate: new Date(2018, 6, 6, 13, 30),
    id: 28,
    location: "Room 3",
  },
  {
    title: "Brochure Design Review",
    startDate: new Date(2018, 6, 6, 14, 10),
    endDate: new Date(2018, 6, 6, 15, 30),
    id: 29,
    location: "Room 3",
  },
  {
    title: "Create Icons for Website",
    startDate: new Date(2018, 6, 6, 10, 0),
    endDate: new Date(2018, 6, 7, 14, 30),
    id: 30,
    location: "Room 1",
  },
  {
    title: "Upgrade Server Hardware",
    startDate: new Date(2018, 6, 3, 9, 30),
    endDate: new Date(2018, 6, 3, 12, 25),
    id: 31,
    location: "Room 2",
  },
  {
    title: "Submit New Website Design",
    startDate: new Date(2018, 6, 3, 12, 30),
    endDate: new Date(2018, 6, 3, 18, 0),
    id: 32,
    location: "Room 2",
  },
  {
    title: "Launch New Website",
    startDate: new Date(2018, 6, 3, 12, 20),
    endDate: new Date(2018, 6, 3, 14, 10),
    id: 33,
    location: "Room 2",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2018, 5, 26, 0, 0),
    endDate: new Date(2018, 5, 27, 0, 0),
    id: 34,
    location: "Room 1",
  },
  {
    title: "Customer Workshop",
    startDate: new Date(2018, 5, 29, 10, 0),
    endDate: new Date(2018, 5, 30, 14, 30),
    id: 35,
    location: "Room 1",
  },
  {
    title: "Google AdWords Strategy",
    startDate: new Date(2018, 6, 3, 0, 0),
    endDate: new Date(2018, 6, 4, 10, 30),
    id: 36,
    location: "Room 3",
  },
  {
    title: "Rollout of New Website and Marketing Brochures",
    startDate: new Date(2018, 6, 5, 10, 0),
    endDate: new Date(2018, 6, 9, 14, 30),
    id: 37,
    location: "Room 3",
  },
  {
    title: "Update NDA Agreement",
    startDate: new Date(2018, 6, 1, 10, 0),
    endDate: new Date(2018, 6, 3, 14, 30),
    id: 38,
    location: "Room 2",
  },
  {
    title: "Customer Workshop",
    startDate: new Date(2018, 6, 1),
    endDate: new Date(2018, 6, 2),
    allDay: true,
    id: 39,
    location: "Room 1",
  },
];

export const mockPercents = [
  { value: "10", label: "10%" },
  { value: "50", label: "50%" },
  { value: "70", label: "70%" },
];

export const mockServices: Schemas.ProfessionalProductData[] = [
  { code: "131", basePrice: 50, name: "Service 1" },
  { code: "132", basePrice: 20, name: "Service 2" },
];

export const mockOrders: Schemas.AppointmentOrderData[] = [
  {
    code: "1",
    total: 0,
    discount: 0,
    subtotal: 0,
    state: "PENDIENTE",
    products: [
      {
        code: "11",
        basePrice: 0,
        name: "-",
        discount: 0,
        taxPercent: 0,
        subtotal: 0,
        quantity: 0,
      },
    ],
  },
  {
    code: "2",
    total: 10,
    discount: 0,
    subtotal: 10,
    state: "PAGADA",
    products: [
      {
        code: "21",
        basePrice: 0,
        name: "-",
        discount: 0,
        taxPercent: 0,
        subtotal: 0,
        quantity: 0,
      },
    ],
  },
];
