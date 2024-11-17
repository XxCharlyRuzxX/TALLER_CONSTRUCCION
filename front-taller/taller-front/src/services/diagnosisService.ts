import { ShippingStatus } from "../interfaces/PartDiagnosis";
import { VehicleDiagnosis } from "../interfaces/VehicleDiagnosis";
import api from "./api/apiConfig";

export interface VehicleDiagnosisDTO {
  idDiagnosis: number;
  problemDetail: string;
  maintenanceCost: number;
  authorized: boolean;
  evaluationDate: String;
  partsList: PartDiagnosisDTO[]
}

export interface PartDiagnosisDTO {
  partDetail: string;
  partCost: number;
  estimatedArrivalDate: string;
  shippingStatus: ShippingStatus;
}

export const getAllDiagnoses = async (
  diagnosisManagerId: number
): Promise<VehicleDiagnosis[]> => {
  try {
    const response = await api.get<VehicleDiagnosis[]>(
      `/diagnosis/diagnosisManager/${diagnosisManagerId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los diagnósticos"
    );
  }
};

export const getAuthorizedDiagnoses = async (
  diagnosisManagerId: number
): Promise<VehicleDiagnosis[]> => {
  try {
    const response = await api.get<VehicleDiagnosis[]>(
      `/diagnosis/diagnosisManager/${diagnosisManagerId}/authorized`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener los diagnósticos autorizados"
    );
  }
};

export const updateDiagnosis = async (
  diagnosisManagerId: number,
  diagnosisId: number,
  updatedDiagnosis: Partial<VehicleDiagnosisDTO>
): Promise<void> => {
  try {
    await api.put(
      `/diagnosis/diagnosisManager/${diagnosisManagerId}/diagnosis/${diagnosisId}`,
      updatedDiagnosis
    );
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar el diagnóstico"
    );
  }
};

export const calculateTotalCost = async (
  diagnosisManagerId: number
): Promise<number> => {
  try {
    const response = await api.get<number>(
      `/diagnosis/diagnosisManager/${diagnosisManagerId}/total-cost`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al calcular el costo total"
    );
  }
};

export const calculateAuthorizedCost = async (
  diagnosisManagerId: number
): Promise<number> => {
  try {
    const response = await api.get<number>(
      `/diagnosis/diagnosisManager/${diagnosisManagerId}/authorized-cost`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al calcular el costo autorizado"
    );
  }
};
