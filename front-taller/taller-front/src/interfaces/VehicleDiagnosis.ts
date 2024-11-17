import { PartDiagnosis } from "./PartDiagnosis";

export interface VehicleDiagnosis {
  idDiagnosis: number;
  problemDetail: string;
  maintenanceCost: number;
  evaluationDate: string;
  isAuthorized: boolean;
  partsList: PartDiagnosis[];
  getTotalCost(): number;
}
