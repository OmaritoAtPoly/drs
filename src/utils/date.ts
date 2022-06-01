/* eslint-disable @typescript-eslint/naming-convention */
import { toInteger } from "lodash";
import moment from "moment";

// TODO: use this object in all place
export enum formatDate {
  "dd MMM, yyyy" = "dd MMM, yyyy",
  "DD/MM/YYYY" = "DD/MM/YYYY",
  "MMM" = "MMM",
  "MM/YYYY" = "MM/YYYY",
  "MM/YY" = "MM/YY",
  "YYYY_MM_DD" = "YYYY-MM-DD",
  "DD_MM_YYYY" = "DD-MM-YYYY",
  "YYYY-MM-DD hh:mm" = "YYYY-MM-DD hh:mm",
  "DD_MM_YYYY hh:mm" = "DD-MM-YYYY hh:mm",
  "LLL" = "LLL",
  "LL" = "LL",
  "dddd, MMMM Do YYYY, h:mm a" = "dddd, MMMM Do YYYY, h:mm a",
  "ddd MMM" = "ddd MMM",
  "hh:mm" = "hh:mm",
  "hh:mm A" = "hh:mm A",
  "dddd, D [de] MMMM [de] YYYY, h:mm a" = "dddd, D [de] MMMM [de] YYYY, h:mm a",
}

export const fullFormatWithOptionalToday = (today?: boolean) =>
  `${today ? "[hoy], " : ""}dddd DD [de] MMMM [de] yyyy`;

export const elapsedTimeFormat = (year: number, month: number) => {
  if (!year && month > 0) return `[Desde hace] ${month} [mes(es)]`;
  if (year > 0 && !month) return `[Desde hace] ${year} [año(s)]`;
  return year && month
    ? `[Desde hace] ${year} [año(s)], ${month} [mes(es)]`
    : "[Comenzó recientemente]";
};

export const dateTimeObjectFormatter = (
  date?: Schemas.DateTimeObject,
  format?: typeof formatDate,
) => {
  if (
    date &&
    date.dateYear !== undefined &&
    date.dateMonth !== undefined &&
    date.dateDay !== undefined
  ) {
    const momentDate = moment(
      new Date(
        date.dateYear,
        date.dateMonth - 1,
        date.dateDay,
        date.timeHour || 0,
        date.timeMinute || 0,
      ),
    );
    return momentDate.format(
      ((format as unknown) as string) || formatDate["dd MMM, yyyy"],
    );
  }
  return "";
  // throw new TreatedError({ message: STRINGS.error.UNKNOWN_ERROR });
};

export const getDateTimeObject = (date: Schemas.DateTimeObject) => {
  if (
    date &&
    date.dateYear !== undefined &&
    date.dateMonth !== undefined &&
    date.dateDay !== undefined
  ) {
    return new Date(
      date.dateYear,
      date.dateMonth - 1,
      date.dateDay,
      date.timeHour || 0,
      date.timeMinute || 0,
    );
  }
  return undefined;
};

export const getDateTimeObjectMoment = (date?: Schemas.DateTimeObject) => {
  if (
    date &&
    date.dateYear !== undefined &&
    date.dateMonth !== undefined &&
    date.dateDay !== undefined
  ) {
    return moment(
      new Date(
        date?.dateYear,
        date?.dateMonth - 1,
        date?.dateDay,
        date?.timeHour || 0,
        date?.timeMinute || 0,
      ),
    );
  }
  return undefined;
};

export const getMinutesBetweenDates = (startDate: Date, endDate: Date) => {
  const diff = startDate.getTime() - endDate.getTime();
  return diff / 60000;
};

export const getDayName = (date: Date) => {
  switch (date.getDay()) {
    case 0:
      return "Domingo";
    case 1:
      return "Lunes";
    case 2:
      return "Martes";
    case 3:
      return "Miércoles";
    case 4:
      return "Jueves";
    case 5:
      return "Viernes";
    case 6:
      return "Sábado";
    default:
      return "";
  }
};

export const getFirstDateOfCurrentMonth = (currentDate?: Date) => {
  const date = currentDate || new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDateOfCurrentMonth = (currentDate?: Date) => {
  const date = currentDate || new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getFirstDateOfCurrentWeek = (currentDate?: Date) => {
  const date = currentDate || new Date();
  return moment(date).startOf("week").subtract(1, "days").toDate();
};

export const getLastDateOfCurrentWeek = (currentDate?: Date) => {
  const date = currentDate || new Date();
  return moment(date).endOf("week").toDate();
};

export const addMinutesToDate = (minutes: number, date?: Date) => {
  const currentDate = date || new Date();
  const timeSpan = minutes * 60000;
  currentDate.setTime(currentDate.getTime() + timeSpan);
  return currentDate;
};

export const getMonthWeekDaysOfNumber = (days: number) => {
  let currentDays = days;
  const months = toInteger(currentDays / 30);
  currentDays -= months * 30;
  const weeks = toInteger(currentDays / 7);
  currentDays -= weeks * 7;
  return { months, weeks, currentDays };
};
