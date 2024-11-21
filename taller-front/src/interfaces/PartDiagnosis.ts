export enum ShippingStatus {
  NOT_ORDERED = "NOT_ORDERED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  DELAYED = "DELAYED",
}

export interface PartDiagnosis {
  idPart: number;
  partDetail: string;
  partCost: number;
  estimatedArrivalDate: string;
  shippingStatus: ShippingStatus;
}
