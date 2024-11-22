import api from "./api/apiConfig";
import { API_ROUTES } from "./api/apiRoutes";
import { ReportType } from "./interfaces/ReportInterfaces";

export const generateReport = async (vehicleId: string, reportType: ReportType): Promise<Blob> => {
  try {
    const response = await api.get<Blob>(API_ROUTES.REPORTS.GENERATE, {
      params: { vehicleId, reportType },
      responseType: "blob",
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al generar el reporte.");
  }
};
