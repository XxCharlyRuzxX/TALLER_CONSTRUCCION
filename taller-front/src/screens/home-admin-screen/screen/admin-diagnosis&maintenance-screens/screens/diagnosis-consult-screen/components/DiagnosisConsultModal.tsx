import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { VehicleDiagnosis } from "../../../../../../../interfaces/VehicleDiagnosis";
import Colors from "../../../../../../../utils/Colors";

interface DiagnosisDetailsModalProps {
  open: boolean;
  diagnosis: VehicleDiagnosis | null;
  onClose: () => void;
}

const DiagnosisDetailsModal: React.FC<DiagnosisDetailsModalProps> = ({
  open,
  diagnosis,
  onClose,
}) => {
  if (!diagnosis) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          bgcolor: "background.paper",
          borderRadius: "12px",
          border: "5px solid #444444",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Detalles del Diagnóstico
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <b>ID:</b> {diagnosis.idDiagnosis}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <b>Detalle del Problema:</b> {diagnosis.problemDetail}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <b>Costo de Mantenimiento:</b> ${diagnosis.maintenanceCost.toFixed(2)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <b>Autorizado:</b> {diagnosis.authorized ? "Sí" : "No"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <b>Fecha de Evaluación:</b> {diagnosis.evaluationDate}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Lista de Piezas
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: Colors.HighlightGreen }}>
              <TableRow>
                <TableCell>
                  <b>Detalle</b>
                </TableCell>
                <TableCell>
                  <b>Costo</b>
                </TableCell>
                <TableCell>
                  <b>Estado de Envío</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diagnosis.partsList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Sin piezas
                  </TableCell>
                </TableRow>
              ) : (
                diagnosis.partsList.map((part, index) => (
                  <TableRow key={index}>
                    <TableCell>{part.partDetail}</TableCell>
                    <TableCell>{`$${part.partCost.toFixed(2)}`}</TableCell>
                    <TableCell>{part.shippingStatus}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default DiagnosisDetailsModal;
