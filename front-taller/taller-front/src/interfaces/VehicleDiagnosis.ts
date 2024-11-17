import { PartDiagnosis } from "./PartDiagnosis";

export interface VehicleDiagnosis {
  idDiagnosis: number;
  problemDetail: string;
  maintenanceCost: number;
  evaluationDate: string;
  authorized: boolean;
  partsList: PartDiagnosis[];
}
