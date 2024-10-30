import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import Colors from "../../../utils/Colors";
import Car  from "../interfaces/Car";


interface CarTableProps {
  cars: Car[];
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
            <TableCell>Placa</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((car) => (
              <TableRow key={car.plate}>
                <TableCell>{car.plate}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CircleIcon sx={{color: car.status === "Activo" ? Colors.HighlightGreen : Colors.HighlightRed , mr:1 , fontSize: 12} }></CircleIcon>
                  <Typography color={car.status === "Activo" ? Colors.HighlightGreen : Colors.HighlightRed}>
                    {car.status}
                  </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
