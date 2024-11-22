import { ShippingStatus } from "../../interfaces/PartDiagnosis";

export interface VehicleDiagnosisDTO {
  idDiagnosis: number;
  problemDetail: string;
  maintenanceCost: number;
  authorized: boolean;
  evaluationDate: string;
  partsList: PartDiagnosisDTO[];
}

export interface PartDiagnosisDTO {
  idPart: number;
  partDetail: string;
  partCost: number;
  estimatedArrivalDate: string;
  shippingStatus: ShippingStatus;
}

export interface VehicleDiagnosis {
  id: number;
  problemDetail: string;
  maintenanceCost: number;
  authorized: boolean;
  evaluationDate: string;
  partsList: PartDiagnosisDTO[];
}
