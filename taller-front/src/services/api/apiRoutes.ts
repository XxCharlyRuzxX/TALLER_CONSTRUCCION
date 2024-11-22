export const API_ROUTES = {
  USERS: {
    LOGIN: "/users/login",
    REGISTER: "/users/register",
    GET_ALL: "/users",
    GET_BY_ID: (userId: number) => `/users/${userId}`,
    DELETE: (userId: number) => `/users/${userId}`,
    UPDATE: (userId: number) => `/users/${userId}`,
    GET_USER_TYPE: (userId: number) => `/users/${userId}/type`,
  },
  VEHICLES: {
    REGISTER: "/vehicles/register",
    GET_ALL: "/vehicles",
    GET_BY_CLIENT_ID: (clientId: number) => `/vehicles/client/${clientId}`,
    GET_BY_ID: (vehicleId: string) => `/vehicles/${vehicleId}`,
    UPDATE: (vehicleId: string) => `/vehicles/${vehicleId}`,
    DELETE: (vehicleId: string) => `/vehicles/${vehicleId}`,
  },
  DIAGNOSIS: {
    BASE: "/diagnosis",
    GET_ALL: "/diagnosis/all-diagnoses",
    BY_MANAGER_ID: (managerId: number) =>
      `/diagnosis/diagnosisManager/${managerId}`,
    AUTHORIZED: (managerId: number) =>
      `/diagnosis/diagnosisManager/${managerId}/authorized`,
    ADD: (managerId: number) => `/diagnosis/${managerId}`,
    UPDATE: (managerId: number, diagnosisId: number) =>
      `/diagnosis/diagnosisManager/${managerId}/diagnosis/${diagnosisId}`,
    DELETE: (managerId: number, diagnosisId: number) =>
      `/diagnosis/diagnosisManager/${managerId}/diagnosis/${diagnosisId}`,
    CALCULATE_TOTAL_COST: (managerId: number) => `/diagnosis/diagnosisManager/${managerId}/total-cost`,
    CALCULATE_AUTHORIZED_COST: (managerId: number) => `/diagnosis/diagnosisManager/${managerId}/authorized-cost`,
  },
  MAINTENANCE: {
    BASE: "/maintenance",
    STATUS: (managerId: number) => `/maintenance/${managerId}/status`,
    ADVANCE: (managerId: number) => `/maintenance/${managerId}/advance`,
    UPDATE_ADVANCE: (managerId: number, advanceId: number) =>
      `/maintenance/${managerId}/advance/${advanceId}`,
    DELETE_ADVANCE: (managerId: number, advanceId: number) =>
      `/maintenance/${managerId}/advance/${advanceId}`,
  },
  REPORTS: {
    GENERATE: "/reports/generate",
  },
  SATISFACTION_SURVEYS: {
    CREATE: "/satisfaction-surveys",
    GET_BY_CLIENT_ID: (clientId: number) =>
      `/satisfaction-surveys/client/${clientId}`,
  },
};
