import api from "./api/apiConfig";
import { MaintenanceStatus } from "../interfaces/MaintenanceManager";

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

