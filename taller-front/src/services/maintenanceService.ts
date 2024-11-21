import api from "./api/apiConfig";
import { MaintenanceManager, MaintenanceStatus } from "../interfaces/MaintenanceManager";
import { MaintenanceAdvance } from "../interfaces/MaintenanceAdvance";

export interface MaintenanceAdvanceDTO {
  idMaintenanceAdvance?: number;
  date: string;
  description: string;
  imagesAdvance?: string[] | null;
}


export const updateMaintenanceStatus = async (managerId: number, status: MaintenanceStatus): Promise<void> => {
  try {
    await api.put(`/maintenance/${managerId}/status`, null, {
      params: { status: encodeURIComponent(status)  },
    });
  } catch (error) {
    console.error("Error al actualizar el estado de mantenimiento:", error);
    throw error;
  }
};


export const getMaintenanceManagerById = async (managerId: number): Promise<MaintenanceManager> => {
  try {
    const response = await api.get<MaintenanceManager>(`/maintenance/${managerId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el manager de mantenimiento."
    );
  }
};

export const addMaintenanceAdvance = async (
  managerId: number,
  advance: Omit<MaintenanceAdvanceDTO, "idMaintenanceAdvance">
): Promise<MaintenanceAdvanceDTO> => {
  try {
    const response = await api.post<MaintenanceAdvanceDTO>(
      `/maintenance/${managerId}/advance`,
      advance
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al agregar un avance de mantenimiento."
    );
  }
};

export const updateMaintenanceAdvance = async (
  managerId: number,
  advanceId: number,
  updatedAdvance: Omit<MaintenanceAdvanceDTO, "idMaintenanceAdvance">
): Promise<MaintenanceAdvanceDTO> => {
  try {
    const response = await api.put<MaintenanceAdvanceDTO>(
      `/maintenance/${managerId}/advance/${advanceId}`,
      updatedAdvance
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar el avance de mantenimiento."
    );
  }
};

export const deleteMaintenanceAdvance = async (
  managerId: number,
  advanceId: number
): Promise<void> => {
  try {
    await api.delete(`/maintenance/${managerId}/advance/${advanceId}`);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar el avance de mantenimiento."
    );
  }
};

export const getAllMaintenanceAdvances = async (): Promise<MaintenanceAdvance[]> => {
  try {
    const response = await api.get<MaintenanceAdvance[]>("/maintenance/all-advances");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener todos los avances de mantenimiento."
    );
  }
};