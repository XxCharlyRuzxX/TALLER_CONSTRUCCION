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
  Typography,
} from "@mui/material";
import Colors from "../../../../utils/Colors";
import { VehicleDiagnosisDTO } from "../../../../services/interfaces/DiagnosisInterfaces";

interface DiagnosisTableProps {
  diagnoses: VehicleDiagnosisDTO[];
  onEdit: (diagnosis: VehicleDiagnosisDTO) => void;
  onDelete: (diagnosisId: number) => void;
}

const DiagnosisTable: React.FC<DiagnosisTableProps> = ({ diagnoses, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
      <Table>
        <TableHead sx={{ backgroundColor: Colors.HighlightGray }}>
          <TableRow>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>ID</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Detalle del Problema</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Costo</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Autorizado</b>
            </TableCell>
            <TableCell align="center" sx={{ color: Colors.White }}>
              <b>Acciones</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diagnoses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2">
                  No hay diagnósticos registrados
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            diagnoses.map((diagnosis) => (
              <TableRow key={diagnosis.idDiagnosis}>
                <TableCell align="center">{diagnosis.idDiagnosis}</TableCell>
                <TableCell align="center">{diagnosis.problemDetail}</TableCell>
                <TableCell align="center">{`$${diagnosis.maintenanceCost.toFixed(2)}`}</TableCell>
                <TableCell align="center">{diagnosis.authorized ? "Sí" : "No"}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onEdit(diagnosis)}
                    sx={{ ml: 2 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(diagnosis.idDiagnosis)}
                    sx={{ ml: 2 }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiagnosisTable;
