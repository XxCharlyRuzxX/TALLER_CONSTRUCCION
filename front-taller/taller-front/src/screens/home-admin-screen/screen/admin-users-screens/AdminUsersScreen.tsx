import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { UserAccount } from "../../../../interfaces/UserAccount";
import { deleteUser, getAllUsers } from "../../../../services/userService";
import EditUserModal from "./EditUserModal";
import Colors from "../../../../utils/Colors";

const AdminUsersScreen: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const navigate = useNavigate();

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
    setPage(0);
  };

  const handleAddUser = () => {
    navigate("/register");
  };

  const handleEditUser = (userId: number) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleDeleteUser = async (userId: number) => {
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

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedUserId(null);
  };

  const handleUserUpdated = async () => {
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
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
      <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: Colors.HighlightGray }}>
            <TableRow>
              <TableCell align="center" sx={{ color: Colors.White }}>
                <b>ID</b>
              </TableCell>
              <TableCell align="center" sx={{ color: Colors.White }}>
                <b>Nombre</b>
              </TableCell>
              <TableCell align="center" sx={{ color: Colors.White }}>
                <b>Email</b>
              </TableCell>
              <TableCell align="center" sx={{ color: Colors.White }}>
                <b>Teléfono</b>
              </TableCell>
              <TableCell align="center" sx={{ color: Colors.White }}>
                <b>Acciones</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.userId} hover>
                <TableCell align="center">{user.userId}</TableCell>
                <TableCell align="center">{user.userName}</TableCell>
                <TableCell align="center">{user.accessCredentials.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditUser(user.userId)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteUser(user.userId)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>

      <EditUserModal
        open={openModal}
        userId={selectedUserId}
        onClose={handleModalClose}
        onUserUpdated={handleUserUpdated}
      />
    </Box>
  );
};

export default AdminUsersScreen;
