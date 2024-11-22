
export interface UserDTO {
  userName: string;
  email: string;
  phone: string;
  password?: string;
}

export interface UserAccount {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface UserType {
  type: "admin" | "client" | "worker";
}