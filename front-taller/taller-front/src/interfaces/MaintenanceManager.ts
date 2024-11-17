import { MaintenanceAdvance } from "./MaintenanceAdvance";

export enum MaintenanceStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface MaintenanceManager {
  idMaintenanceManager: number;
  maintenanceProgresses: MaintenanceAdvance[];
  maintenanceStatus: MaintenanceStatus;
}
