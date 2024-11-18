import api from "./api/apiConfig";
import { ClientVehicle } from "../interfaces/ClientVehicle";

export interface ClientVehicleDTO {
  clientId: number;
  brand: string;
  model: string;
  year: number | string;
  licensePlate: string;
  mileage: number | string;
  fuelLevel: number | string;
  additionalObservations: string;
}

export const registerVehicle = async (vehicleData: ClientVehicleDTO): Promise<ClientVehicle> => {
  try {
    const response = await api.post<ClientVehicle>("/vehicles/register", vehicleData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al registrar el vehículo");
  }
};

export const getClientVehiclesByCleintId = async (clientId: number): Promise<ClientVehicle[]> => {
  try {
    const response = await api.get<ClientVehicle[]>(`/vehicles/client/${clientId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al obtener los vehículos");
  }
};

export const getVehicleByVehicleId = async (vehicleId: string): Promise<ClientVehicle> => {
  try {
    const response = await api.get<ClientVehicle>(`/vehicles/${vehicleId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los datos del vehículo."
    );
  }
};