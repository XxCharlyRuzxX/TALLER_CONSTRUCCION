import { VehicleDiagnosis } from "./VehicleDiagnosis";

export interface DiagnosisManager {
  idDiagnosisManager: number;
  diagnoses: VehicleDiagnosis[];
  authorizedDiagnoses: VehicleDiagnosis[];
}
