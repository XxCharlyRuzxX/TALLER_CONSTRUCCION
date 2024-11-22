export interface MaintenanceManager {
  id: number;
  status: MaintenanceStatus;
  advances: MaintenanceAdvance[];
}

export type MaintenanceStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface MaintenanceAdvance {
  idMaintenanceAdvance: number;
  date: string;
  description: string;
  imagesAdvance: string[] | null;
}

export interface MaintenanceAdvanceDTO {
  idMaintenanceAdvance?: number;
  date: string;
  description: string;
  imagesAdvance?: string[] | null;
}
