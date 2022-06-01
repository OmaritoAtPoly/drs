// eslint-disable-next-line @typescript-eslint/no-var-requires
const writtenNumber = require("written-number");

writtenNumber.defaults.lang = "es";

enum IMCCLASIFICATION {
  UNDER_WEIGHT = "Bajo Peso",
  NORMAL = "Normal",
  OVER_WEIGHT = "Sobrepeso",
  OBESE = "Obeso",
}

export const getIMC = (weight: number, size: number) => {
  let result = 0;
  if (weight && size) {
    const sizeInMetter = size / 100;
    result = parseFloat((weight / (sizeInMetter * sizeInMetter)).toFixed(2));
  }
  return Number.isFinite(result) ? result : 0;
};

export const getIMCClasification = (weight: number, size: number) => {
  const imc = getIMC(weight, size);

  if (imc < 18.5) {
    return IMCCLASIFICATION.UNDER_WEIGHT;
  }
  if (imc >= 18.5 && imc < 24.9) {
    return IMCCLASIFICATION.NORMAL;
  }
  if (imc >= 25.0 && imc < 29.9) {
    return IMCCLASIFICATION.OVER_WEIGHT;
  }
  return IMCCLASIFICATION.OBESE;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writtenNumberToLetter = (number: any) =>
  String(writtenNumber(number)).toLocaleUpperCase();

export const numberToDay = (j: number) => `0${j}`.slice(-2);

export const getWeekDay = (position: number) => {
  const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  if (position >= 0 && position < 7) return weekDays[position];
  return "";
};

export const requestType = [
  { label: "Imagen", value: "image" },
  { label: "Laboratorio", value: "laboratory" },
  { label: "Otros", value: "other" },
];

export const getTranslatedOrderState = (orderState: string) => {
  switch (orderState) {
    case "PENDENT":
      return "PENDIENTE";
    case "CANCELED":
      return "CANCELADA";
    case "PAID":
      return "PAGADA";
    case "IN_PROGRESS":
      return "EN PROGRESO";
    case "INVOICED":
      return "FACTURADA";
    default:
      return orderState;
  }
};

export const getTranslatedOrderPayWay = (payWay: string) => {
  switch (payWay) {
    case "TRANSFER":
      return "Transferencia";
    case "CASH":
      return "Efectivo";
    case "CARD":
      return "Tarjeta";
    default:
      return payWay;
  }
};

export const getTimeScheduleOption = (
  intervalTime: number,
  intervalLimit: number,
) => {
  const interval = [];
  let i = intervalTime;
  while (i <= intervalLimit) {
    interval.push({
      label: `${i} minutos`,
      value: `${i}`,
    });
    i += 5;
  }
  return interval;
};
