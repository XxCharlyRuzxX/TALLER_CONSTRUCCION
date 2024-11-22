import { VehicleDiagnosis } from "../interfaces/VehicleDiagnosis";
import api from "./api/apiConfig";
import { API_ROUTES } from "./api/apiRoutes";
import { handleError } from "./api/errorHandler";
import { VehicleDiagnosisDTO } from "./interfaces/DiagnosisInterfaces";

export const addDiagnosis = async (
  diagnosisManagerId: number,
  diagnosis: VehicleDiagnosisDTO
): Promise<void> => {
  try {
    await api.post(`/diagnosis/${diagnosisManagerId}`, diagnosis);
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const getAllDiagnoses = async (): Promise<VehicleDiagnosis[]> => {
  try {
    const response = await api.get<VehicleDiagnosis[]>(
      API_ROUTES.DIAGNOSIS.GET_ALL
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const getDiagnosesByManagerId = async (
  diagnosisManagerId: number
): Promise<VehicleDiagnosis[]> => {
  try {
    const response = await api.get<VehicleDiagnosis[]>(
      API_ROUTES.DIAGNOSIS.BY_MANAGER_ID(diagnosisManagerId)
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const getAuthorizedDiagnoses = async (
  diagnosisManagerId: number
): Promise<VehicleDiagnosis[]> => {
  try {
    const response = await api.get<VehicleDiagnosis[]>(
      API_ROUTES.DIAGNOSIS.AUTHORIZED(diagnosisManagerId)
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const updateDiagnosis = async (
  diagnosisManagerId: number,
  diagnosisId: number,
  updatedDiagnosis: Partial<VehicleDiagnosisDTO>
): Promise<void> => {
  try {
    await api.put(
      API_ROUTES.DIAGNOSIS.UPDATE(diagnosisManagerId, diagnosisId),
      updatedDiagnosis
    );
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const calculateTotalCost = async (
  diagnosisManagerId: number
): Promise<number> => {
  try {
    const response = await api.get<number>(
      API_ROUTES.DIAGNOSIS.CALCULATE_TOTAL_COST(diagnosisManagerId)
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const calculateAuthorizedCost = async (
  diagnosisManagerId: number
): Promise<number> => {
  try {
    const response = await api.get<number>(
      API_ROUTES.DIAGNOSIS.CALCULATE_AUTHORIZED_COST(diagnosisManagerId)
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const deleteDiagnosisById = async (
  diagnosisManagerId: number,
  diagnosisId: number
): Promise<void> => {
  try {
    await api.delete(
      API_ROUTES.DIAGNOSIS.DELETE(diagnosisManagerId, diagnosisId)
    );
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};
