import { UserAccount } from "../interfaces/UserAccount";
import api from "./api/apiConfig";
export interface UserDTO {
  userName: string;
  email: string;
  phone: string;
  password?: string;
}


export const getAllUsers = async (): Promise<UserAccount[]> => {
  const response = await api.get<UserAccount[]>("/users");
  return response.data;
};


export const updateUser = async (userId: number, userDto: UserDTO): Promise<UserAccount> => {
  const response = await api.put<UserAccount>(`/users/${userId}`, userDto);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/users/${userId}`);
};


export const getUserById = async (userId: number): Promise<UserAccount> => {
  const response = await api.get<UserAccount>(`/users/${userId}`);
  return response.data;
};


