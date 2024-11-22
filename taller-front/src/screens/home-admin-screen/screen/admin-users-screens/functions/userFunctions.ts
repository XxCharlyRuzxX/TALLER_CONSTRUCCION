import { UserAccount } from "../../../../../interfaces/UserAccount";
import { deleteUser } from "../../../../../services/userService";


export const handleSearchUsers = (
  query: string,
  users: UserAccount[],
  setFilteredUsers: React.Dispatch<React.SetStateAction<UserAccount[]>>
) => {
  if (query === "") {
    setFilteredUsers(users);
  } else {
    const filtered = users.filter(
      (user) =>
        user.userName.toLowerCase().includes(query.toLowerCase()) ||
        user.accessCredentials.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  }
};

export const handleDeleteUser = async (
  userId: number,
  setUsers: React.Dispatch<React.SetStateAction<UserAccount[]>>,
  setFilteredUsers: React.Dispatch<React.SetStateAction<UserAccount[]>>
) => {
  try {
    await deleteUser(userId);
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.userId !== userId)
    );
    setFilteredUsers((prevFiltered) =>
      prevFiltered.filter((user) => user.userId !== userId)
    );
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};
