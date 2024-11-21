import { ShippingStatus } from "../interfaces/PartDiagnosis";
import { VehicleDiagnosis } from "../interfaces/VehicleDiagnosis";
import api from "./api/apiConfig";

export interface VehicleDiagnosisDTO {
  idDiagnosis: number;
  problemDetail: string;
  maintenanceCost: number;
  authorized: boolean;
  evaluationDate: string;
  partsList: PartDiagnosisDTO[];
}

export interface PartDiagnosisDTO {
  idPart: number;
  partDetail: string;
  partCost: number;
  estimatedArrivalDate: string;
  shippingStatus: ShippingStatus;
}

export const addDiagnosis = async (
  diagnosisManagerId: number,
  diagnosis: VehicleDiagnosisDTO
): Promise<void> => {
  try {
    await api.post(`/diagnosis/${diagnosisManagerId}`, diagnosis);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al agregar el diagnóstico."
    );
  }
};

export const getAllDiagnoses = async (): Promise<VehicleDiagnosis[]> => {
  try {
    const response = await api.get<VehicleDiagnosis[]>("/diagnosis/all-diagnoses");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener todos los diagnósticos"
    );
  }
};

export const getDiagnosesByManagerId = async (
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

export const deleteDiagnosisById = async (
  diagnosisManagerId: number,
  diagnosisId: number
): Promise<void> => {
  try {
    await api.delete(
      `/diagnosis/diagnosisManager/${diagnosisManagerId}/diagnosis/${diagnosisId}`
    );
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar el diagnóstico"
    );
  }
};