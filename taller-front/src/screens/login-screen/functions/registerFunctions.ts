import { registerUserAccount } from "../../../services/userService";
import { ApiError } from "../../../services/api/errorHandler";

export const registerUser = async (userName: string, phone: string, email: string, password: string, confirmPassword: string, navigate: Function) => {
  if (password !== confirmPassword) {
    throw new ApiError("Las contraseñas no coinciden.", {
      confirmPassword: "Las contraseñas no coinciden.",
    });
  }

  const registrationData = {
    userName: userName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    password,
  };

  await registerUserAccount(registrationData, "client");
  setTimeout(() => navigate("/login"), 2000);
};
