import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { ClientVehicle } from "../../../interfaces/ClientVehicle";


interface CarTableProps {
  cars: ClientVehicle[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CarTable: React.FC<CarTableProps> = ({
  cars,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TableContainer sx={{ borderRadius: "40px", overflow: "hidden" }}>
      <Table>
      <TableHead>
  <TableRow>
  <TableCell align="center"><b>Vehículo</b></TableCell>
    <TableCell align="center"><b>Placa</b></TableCell>
    <TableCell align="center"><b>Marca</b></TableCell>
    <TableCell align="center"><b>Modelo</b></TableCell>
    <TableCell align="center"><b>Año</b></TableCell>
    <TableCell align="center"><b>Kilometraje</b></TableCell>
    <TableCell align="center"><b>Combustible</b></TableCell>
    <TableCell align="center"><b>Diagnósticos</b></TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {cars
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((car) => {
      return (
        <TableRow key={car.idVehicle}>
          <TableCell align="center">
          <TimeToLeaveIcon sx={{mr: 1, fontSize: 30, color:"gray"}} />
          </TableCell>
          <TableCell align="center">{car.staticVehicleData.licensePlate}</TableCell>
          <TableCell align="center">{car.staticVehicleData.brand}</TableCell>
          <TableCell align="center">{car.staticVehicleData.model}</TableCell>
          <TableCell align="center">{car.staticVehicleData.year}</TableCell>
          <TableCell align="center">{car.nonStaticVehicleData.mileage} km</TableCell>
          <TableCell align="center">{Math.round(car.nonStaticVehicleData.fuelLevel * 100)}%</TableCell>
          <TableCell align="center">{car.diagnosisManager.diagnoses.length}</TableCell>
        </TableRow>
      );
    })}
</TableBody>

      </Table>

      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={cars.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default CarTable;
