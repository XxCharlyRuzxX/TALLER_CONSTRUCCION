import { UserAccount } from "../interfaces/UserAccount";
import api from "./api/apiConfig";

interface LoginDTO {
  email: string;
  password: string;
}

export const login = async (loginData: LoginDTO): Promise<UserAccount> => {
  try {
    const response = await api.post<UserAccount>("/users/login", loginData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error en el inicio de sesión");
  }
};

