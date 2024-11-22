import { registerUserAccount } from "../../../services/userService";

export const registerUser = async (userName: string, phone: string, email: string, password: string, confirmPassword: string, navigate: Function) => {
  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden.");
  }

  try {
    const registrationData = { userName, phone: parseInt(phone, 10), email, password };
    await registerUserAccount(registrationData , "client");
    setTimeout(() => navigate("/login"), 2000);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al registrarse.");
  }
};
