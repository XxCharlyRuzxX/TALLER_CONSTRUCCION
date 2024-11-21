import { DiagnosisManager } from "./DiagnosisManager";
import { MaintenanceManager } from "./MaintenanceManager";

export interface StaticVehicleData {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
}

export interface NonStaticVehicleData {
  mileage: number;
  fuelLevel: number;
  additionalObservations: string;
}

export interface ClientVehicle {
  idVehicle: string;
  clientId: number;
  staticVehicleData: StaticVehicleData;
  nonStaticVehicleData: NonStaticVehicleData;
  diagnosisManager: DiagnosisManager;
  maintenanceManager: MaintenanceManager;
}
