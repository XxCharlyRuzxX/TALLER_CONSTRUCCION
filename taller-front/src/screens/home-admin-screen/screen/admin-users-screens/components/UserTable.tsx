import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserAccount } from "../../../../../interfaces/UserAccount";
import Colors from "../../../../../utils/Colors";

interface UserTableProps {
  users: UserAccount[];
  filteredUsers: UserAccount[];
  page: number;
  rowsPerPage: number;
  onPageChange: (e: unknown, newPage: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  filteredUsers,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEditUser,
  onDeleteUser,
}) => {
  return (
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
                  onClick={() => onEditUser(user.userId)}
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDeleteUser(user.userId)}
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default UserTable;
