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
import { ClientVehicle } from "../../../../../interfaces/ClientVehicle";
import Colors from "../../../../../utils/Colors";


interface VehiclesTableProps {
  vehicles: ClientVehicle[];
  filteredVehicles: ClientVehicle[];
  page: number;
  rowsPerPage: number;
  handleEditVehicle: (vehicleId: string) => void;
  handleDeleteVehicle: (vehicleId: string) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const VehiclesTable: React.FC<VehiclesTableProps> = ({
  filteredVehicles,
  page,
  rowsPerPage,
  handleEditVehicle,
  handleDeleteVehicle,
  setPage,
  setRowsPerPage,
}) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
      <Table>
        <TableHead sx={{ backgroundColor: Colors.HighlightGray }}>
          <TableRow>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Placa</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Marca</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Modelo</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Año</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Kilometraje</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Acciones</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vehicle) => (
            <TableRow key={vehicle.idVehicle} hover>
              <TableCell align="center">{vehicle.staticVehicleData.licensePlate}</TableCell>
              <TableCell align="center">{vehicle.staticVehicleData.brand}</TableCell>
              <TableCell align="center">{vehicle.staticVehicleData.model}</TableCell>
              <TableCell align="center">{vehicle.staticVehicleData.year}</TableCell>
              <TableCell align="center">{vehicle.nonStaticVehicleData.mileage} km</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditVehicle(vehicle.idVehicle)}
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteVehicle(vehicle.idVehicle)}
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
        count={filteredVehicles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />
    </TableContainer>
  );
};

export default VehiclesTable;
