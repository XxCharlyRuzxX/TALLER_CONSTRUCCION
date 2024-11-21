import api from "./api/apiConfig";

export type ReportType = "FULL_REPORT" | "VEHICLE_DATA_REPORT" | "DIAGNOSES_REPORT" | "MAINTENANCE_REPORT";

export const generateReport = async (vehicleId: string, reportType: ReportType): Promise<Blob> => {
  const response = await api.get<Blob>("/reports/generate", {
    params: { vehicleId, reportType },
    responseType: "blob",
  });
  return response.data;
};
