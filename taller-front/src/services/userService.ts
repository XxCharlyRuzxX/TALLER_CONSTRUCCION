import { UserAccount } from "../interfaces/UserAccount";
import api from "./api/apiConfig";
import { API_ROUTES } from "./api/apiRoutes";
import { handleError } from "./api/errorHandler";
import { UserDTO, UserType } from "./interfaces/UserInterfaces";
import { LoginDTO, RegisterDTO } from "./interfaces/authInterfaces";

export const getAllUsers = async (): Promise<UserAccount[]> => {
  try {
    const response = await api.get<UserAccount[]>(API_ROUTES.USERS.GET_ALL);
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const updateUser = async (
  userId: number,
  userDto: UserDTO
): Promise<UserAccount> => {
  try {
    const response = await api.put<UserAccount>(
      API_ROUTES.USERS.UPDATE(userId),
      userDto
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(API_ROUTES.USERS.DELETE(userId));
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const getUserById = async (userId: number): Promise<UserAccount> => {
  try {
    const response = await api.get<UserAccount>(
      API_ROUTES.USERS.GET_BY_ID(userId)
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const login = async (loginData: LoginDTO): Promise<UserAccount> => {
  try {
    const response = await api.post<UserAccount>(
      API_ROUTES.USERS.LOGIN,
      loginData
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const registerUserAccount = async (
  registrationData: RegisterDTO,
  userType: UserType["type"]
): Promise<void> => {
  try {
    const endpoint = `${
      API_ROUTES.USERS.REGISTER
    }?userType=${encodeURIComponent(userType)}`;
    await api.post(endpoint, registrationData);
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

export const getUserType = async (
  userId: number
): Promise<UserType | undefined> => {
  try {
    const response = await api.get<string>(API_ROUTES.USERS.GET_USER_TYPE(userId));
    const userType = response.data.trim();
    if (
      userType === "admin" ||
      userType === "client" ||
      userType === "worker"
    ) {
      return { type: userType } as UserType;
    } else {
      throw new Error("Tipo de usuario no reconocido");
    }
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};
