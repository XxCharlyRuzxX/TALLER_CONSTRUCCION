import api from "./api/apiConfig";

export interface SatisfactionSurveyDTO {
  rating: number;
  feedback: string;
  clientId: number;
}

export interface SatisfactionSurvey {
  idSurvey: number;
  rating: number;
  feedback: string;
  submittedAt: string;
  clientId: number;
}

export const createSurvey = async (
  surveyDTO: SatisfactionSurveyDTO
): Promise<SatisfactionSurvey> => {
  const response = await api.post<SatisfactionSurvey>("/satisfaction-surveys", surveyDTO);
  return response.data;
};

export const getSurveysByClientId = async (
  clientId: number
): Promise<SatisfactionSurvey[]> => {
  const response = await api.get<SatisfactionSurvey[]>(
    `/satisfaction-surveys/client/${clientId}`
  );
  return response.data;
};