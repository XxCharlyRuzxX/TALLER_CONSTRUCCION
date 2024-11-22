import { UserAccount } from "../../../../../interfaces/UserAccount";
import { getUserById, updateUser } from "../../../../../services/userService";


export const fetchUserData = async (
  userId: number,
  setUser: React.Dispatch<React.SetStateAction<UserAccount | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    setLoading(true);
    const userData = await getUserById(userId);
    setUser(userData);
    setError(null);
  } catch (err) {
    setError("Error al cargar los datos del usuario.");
  } finally {
    setLoading(false);
  }
};

export const handleSaveUser = async (
  user: UserAccount,
  onUserUpdated: Function,
  onClose: Function
) => {
  try {
    await updateUser(user.userId, {
      userName: user.userName,
      email: user.accessCredentials.email,
      phone: user.phone,
      password: user.accessCredentials.password,
    });
    onUserUpdated();
    onClose();
  } catch (err) {
    console.error("Error al guardar los cambios.");
  }
};
