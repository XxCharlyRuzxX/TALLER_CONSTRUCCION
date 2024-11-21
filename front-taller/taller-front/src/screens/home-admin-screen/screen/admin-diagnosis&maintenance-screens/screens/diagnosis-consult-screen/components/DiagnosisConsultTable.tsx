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
import Colors from "../../../../../../../utils/Colors";
import { VehicleDiagnosis } from "../../../../../../../interfaces/VehicleDiagnosis";


interface DiagnosisTableProps {
  diagnoses: VehicleDiagnosis[];
  onRowClick: (diagnosis: VehicleDiagnosis) => void;
}

const DiagnosisConsultTable: React.FC<DiagnosisTableProps> = ({
  diagnoses,
  onRowClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Detalle del Problema</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Costo de Mantenimiento</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Autorizado</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Fecha de Evaluación</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diagnoses
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((diagnosis) => (
              <TableRow
                key={diagnosis.idDiagnosis}
                hover
                onClick={() => onRowClick(diagnosis)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="center">{diagnosis.idDiagnosis}</TableCell>
                <TableCell align="center">{diagnosis.problemDetail}</TableCell>
                <TableCell align="center">{`$${diagnosis.maintenanceCost.toFixed(2)}`}</TableCell>
                <TableCell align="center">
                  {diagnosis.authorized ? "Sí" : "No"}
                </TableCell>
                <TableCell align="center">{diagnosis.evaluationDate}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={diagnoses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default DiagnosisConsultTable;
