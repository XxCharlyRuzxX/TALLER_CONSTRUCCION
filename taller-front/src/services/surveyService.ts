import api from "./api/apiConfig";
import { API_ROUTES } from "./api/apiRoutes";
import { SatisfactionSurvey, SatisfactionSurveyDTO } from "./interfaces/SatisfactionSurveyInterfaces";

export const createSurvey = async (
  surveyDTO: SatisfactionSurveyDTO
): Promise<SatisfactionSurvey> => {
  try {
    const response = await api.post<SatisfactionSurvey>(API_ROUTES.SATISFACTION_SURVEYS.CREATE, surveyDTO);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al crear la encuesta.");
  }
};

export const getSurveysByClientId = async (
  clientId: number
): Promise<SatisfactionSurvey[]> => {
  try {
    const response = await api.get<SatisfactionSurvey[]>(API_ROUTES.SATISFACTION_SURVEYS.GET_BY_CLIENT_ID(clientId));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al obtener las encuestas del cliente.");
  }
};
