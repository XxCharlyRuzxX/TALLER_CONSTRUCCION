import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { MaintenanceAdvance } from "../../../../../../../interfaces/MaintenanceAdvance";
import Colors from "../../../../../../../utils/Colors";


interface MaintenanceTableProps {
  maintenances: MaintenanceAdvance[];
  onRowClick: (maintenance: MaintenanceAdvance) => void;
}

const MaintenanceConsultTable: React.FC<MaintenanceTableProps> = ({
  maintenances,
  onRowClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: Colors.HighlightGray }}>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>ID</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White}}>
              <b>Fecha</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Descripción</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maintenances
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((maintenance) => (
              <TableRow
                key={maintenance.idMaintenanceAdvance}
                hover
                onClick={() => onRowClick(maintenance)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="center">
                  {maintenance.idMaintenanceAdvance}
                </TableCell>
                <TableCell align="center">{maintenance.date}</TableCell>
                <TableCell align="center">{maintenance.description}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={maintenances.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default MaintenanceConsultTable;
