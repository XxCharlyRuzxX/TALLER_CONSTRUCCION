import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { MaintenanceAdvance } from "../../../../interfaces/MaintenanceAdvance";
import Colors from "../../../../utils/Colors";


interface MaintenanceAdvancesTableProps {
  advances: MaintenanceAdvance[];
  onEdit: (advance: MaintenanceAdvance) => void;
  onDelete: (id: number) => void;
}

const MaintenanceAdvancesTable: React.FC<MaintenanceAdvancesTableProps> = ({ advances, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", mb: 4 }}>
      <Table>
        <TableHead sx={{ backgroundColor: Colors.HighlightGray }}>
          <TableRow>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>ID Avance</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Fecha</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Descripción</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Acciones</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advances.map((advance) => (
            <TableRow key={advance.idMaintenanceAdvance}>
              <TableCell align="center">{advance.idMaintenanceAdvance}</TableCell>
              <TableCell align="center">{advance.date}</TableCell>
              <TableCell align="center">{advance.description}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onEdit(advance)}
                  sx={{ ml: 1 }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(advance.idMaintenanceAdvance)}
                  sx={{ ml: 1 }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaintenanceAdvancesTable;
