import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { UserAccount } from "../../../../interfaces/UserAccount";
import { getAllUsers } from "../../../../services/userService";
import Colors from "../../../../utils/Colors";
import { handleDeleteUser, handleSearchUsers } from "./functions/userFunctions";
import UserTable from "./components/UserTable";
import EditUserModal from "./components/EditUserModal";
import RegisterUserModal from "./components/AddUserModal";

const AdminUsersScreen: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    handleSearchUsers(query, users, setFilteredUsers);
    setPage(0);
  };

  const handleAddUser = () => {
    setOpenRegisterModal(true);
  };

  const handleEditUser = (userId: number) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedUserId(null);
  };

  const handleUserUpdated = async () => {
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleDelete = async (userId: number) => {
    await handleDeleteUser(userId, setUsers, setFilteredUsers);
  };

  const handleUserRegistered = async () => {
    try {
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
    }
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: Colors.PrimaryGray, minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Gestión de Usuarios
      </Typography>
      <Box sx={{ mb: 2, display: "flex" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar por nombre o email"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{
            width: "100%",
            mx: "auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{ ml: 2, minWidth: "200px" }}
        >
          Agregar Usuario
        </Button>
      </Box>

      <UserTable
        users={users} // Pasamos users también
        filteredUsers={filteredUsers}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        onEditUser={handleEditUser}
        onDeleteUser={handleDelete}
      />

      <EditUserModal
        open={openModal}
        userId={selectedUserId}
        onClose={handleModalClose}
        onUserUpdated={handleUserUpdated}
      />
      <RegisterUserModal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        onUserRegistered={handleUserRegistered}
      />
    </Box>
  );
};

export default AdminUsersScreen;
