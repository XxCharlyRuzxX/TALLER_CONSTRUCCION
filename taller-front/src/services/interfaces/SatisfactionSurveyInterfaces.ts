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
