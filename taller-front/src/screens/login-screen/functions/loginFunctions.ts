import { UserAccount } from "../../../interfaces/UserAccount";
import { getUserType, login } from "../../../services/userService";

export const authenticateUser = async (email: string, password: string): Promise<UserAccount> => {
  try {
    const loginData = { email, password };
    const user: UserAccount = await login(loginData);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error en el inicio de sesión");
  }
};

export const handleUserRedirection = async (user: UserAccount, navigate: Function) => {
  try {
    const userTypeResponse = await getUserType(user.userId);
    if (!userTypeResponse) {
      throw new Error("Tipo de usuario no encontrado");
    }
    const userType = userTypeResponse.type;
    switch (userType) {
      case "admin":
        navigate("/homeadmin");
        break;
      case "client":
        navigate("/userHome");
        break;
      case "worker":
        navigate("/workerHome");
        break;
      default:
        throw new Error("Tipo de usuario no reconocido");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error al redirigir al usuario");
  }
};

