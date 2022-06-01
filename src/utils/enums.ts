export type ResultType = "LAB" | "IMAGE" | "OTHER" | "";
export type RequestType = "image" | "laboratory" | "other" | undefined;

export const REQUEST_DATA_TYPE = {
  REQUESTS: {
    LAB: "LAB",
    IMAGE: "IMAGE",
    OTHER: "OTHER",
    OTHER_REQUEST: "Otros Pedidos",
    IMAGE_REQUEST: "Pedidos de Imagen",
    LAB_REQUEST: "Pedidos de Laboratorio",
    HISTORICAL_OTHER_REQUEST: "Historial de otros pedidos",
    HISTORICAL_IMAGE_REQUEST: "Historial de pedidos de imagen",
    HISTORICAL_LAB_REQUEST: "Historial de pedidos de laboratorio",

    SELECTABLE_OPTIONS: [
      { label: "Pedidos de Imagen", value: "IMAGE" },
      { label: "Pedidos de Laboratorio", value: "LAB" },
      { label: "Otros Pedidos", value: "OTHER" },
    ],
    HISTORICAL_SELECTABLE_OPTIONS: [
      {
        label: "Historial de pedidos de imagen",
        value: "IMAGE",
      },
      {
        label: "Historial de pedidos de laboratorio",
        value: "LAB",
      },
      {
        label: "Historial de otros pedidos",
        value: "OTHER",
      },
    ],
  },
  RESULTS: {
    LAB: "LAB",
    IMAGE: "IMAGE",
    OTHER: "OTHER",
    SELECTABLE_OPTIONS: [
      { label: "Resultados de Imagen", value: "IMAGE" },
      { label: "Resultados de Laboratorio", value: "LAB" },
      { label: "Otros Resultados", value: "OTHER" },
    ],
  },
};

export const CARD_TYPE = {
  VISA: {
    VISA: "VISA",
    VI: "VI",
  },
  MASTER: {
    MASTERCARD: "MASTERCARD",
    MC: "MC",
  },
  AMERICAN_EXPRESS: {
    AMERICANEXPRESS: "AMERICAN EXPRESS",
    AMERICAN_EXPRESS: "AMERICAN_EXPRESS",
    AX: "AX",
  },
  DISCOVER: {
    DISCOVER: "DISCOVER",
    DC: "DC",
  },
};
