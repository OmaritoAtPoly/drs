export type CustomerNutritionItem = {
  name: string;
  description: string;
};

export declare type ValueAndLabelType = {
  value: string;
  label: string;
};

export type RequestHistory = {
  code: string;
  index: number;
  requestType: string;
  date: string;
  time: string;
  patientName: string;
  diagnosis: string[];
  request: string[];
  data:
    | Schemas.ImageRequestResponse
    | Schemas.LaboratoryRequestResponse
    | Schemas.OtherRequestResponse;
};

export declare type LatLngAddress = {
  latitude?: number;
  longitude?: number;
  address?: string;
};

export type TreatmentPlanType = {
  laboratoryOrder: Schemas.LaboratoryRequestRequest;
  imageOrder: Schemas.ImageRequestRequest;
  recipes: Schemas.PrescriptionItemRequest[];
  recommendation: string;
  alarm: string;
  treatment: string;
  procedure: string;
};

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapData {
  code?: string;
  name?: string;
  address?: string;
  nameNotes?: string;
  notes?: string;
  city?: string;
  country?: string;
  area?: string;
  province?: string;
  mapPosition: LatLng;
  markerPosition: LatLng;
  prefix?: string;
  phone?: string;
}

export type AvailabilityGridItem = {
  hour: number;
  minute: number;
  status: "REGULAR" | "ACTIVE" | "DISABLED" | "HOVER";
  row: number;
  column: number;
};
