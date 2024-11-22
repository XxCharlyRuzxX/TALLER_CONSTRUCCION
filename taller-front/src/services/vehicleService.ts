import { ClientVehicle } from "../interfaces/ClientVehicle";
import api from "./api/apiConfig";
import { API_ROUTES } from "./api/apiRoutes";
import { handleError } from "./api/errorHandler";
import {ClientVehicleDTO } from "./interfaces/VehicleInterfaces";


export const registerVehicle = async (vehicleData: ClientVehicleDTO): Promise<ClientVehicle> => {
  try {
    const response = await api.post<ClientVehicle>(API_ROUTES.VEHICLES.REGISTER, vehicleData);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getClientVehiclesByClientId = async (clientId: number): Promise<ClientVehicle[]> => {
  try {
    const response = await api.get<ClientVehicle[]>(API_ROUTES.VEHICLES.GET_BY_CLIENT_ID(clientId));
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getVehicleByVehicleId = async (vehicleId: string): Promise<ClientVehicle> => {
  try {
    const response = await api.get<ClientVehicle>(API_ROUTES.VEHICLES.GET_BY_ID(vehicleId));
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAllVehicles = async (): Promise<ClientVehicle[]> => {
  try {
    const response = await api.get<ClientVehicle[]>(API_ROUTES.VEHICLES.GET_ALL);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateVehicle = async (vehicleId: string, vehicleDto: ClientVehicleDTO): Promise<ClientVehicle> => {
  try {
    const response = await api.put<ClientVehicle>(API_ROUTES.VEHICLES.UPDATE(vehicleId), vehicleDto);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteVehicle = async (vehicleId: string): Promise<void> => {
  try {
    await api.delete(API_ROUTES.VEHICLES.DELETE(vehicleId));
  } catch (error) {
    handleError(error);
  }
};
