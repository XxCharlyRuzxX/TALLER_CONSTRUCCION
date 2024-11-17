export interface AccessCredentials {
  email: string;
  password: string;
}

export interface UserAccount {
  userId: number;
  userName: string;
  accessCredentials: AccessCredentials;
  phone: string;
}
