import React, { useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { VehicleDiagnosis } from "../../../interfaces/VehicleDiagnosis";
import Colors from "../../../utils/Colors";
import { MaintenanceStatus } from "../../../interfaces/MaintenanceManager";

interface DiagnosisVehicleSectionProps {
  diagnoses: VehicleDiagnosis[];
  maintenanceStatus: MaintenanceStatus;
  onAuthorize: (updatedDiagnoses: VehicleDiagnosis[]) => void;
  onStartMaintenance: () => void;
}

const getStatusProps = (status: MaintenanceStatus) => {
  switch (status) {
    case MaintenanceStatus.COMPLETED:
    case MaintenanceStatus.IN_PROGRESS:
      return {
        color: Colors.HighlightGreen,
        label: "Completado",
        icon: <CheckCircleIcon sx={{ color: Colors.HighlightGreen, fontSize: 22 }} />,
      };
    case MaintenanceStatus.PENDING:
      return {
        color: Colors.HighlightOrange,
        label: "Pendiente",
        icon: <PendingIcon sx={{ color: Colors.HighlightOrange, fontSize: 22 }} />,
      };
    default:
      return {};
  }
};


const DiagnosisVehicleSection: React.FC<DiagnosisVehicleSectionProps> = ({
  diagnoses,
  maintenanceStatus,
  onAuthorize,
  onStartMaintenance,
}) => {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<number[]>([]);

  const { color, label, icon } = getStatusProps(maintenanceStatus);

  const handleDiagnosisSelection = (id: number) => {
    setSelectedDiagnoses((prev) =>
      prev.includes(id)
        ? prev.filter((diagnosisId) => diagnosisId !== id)
        : [...prev, id]
    );
  };

  const handleAuthorize = () => {
    const updatedDiagnoses = diagnoses.map((diagnosis) => ({
      ...diagnosis,
      authorized: selectedDiagnoses.includes(diagnosis.idDiagnosis),
    }));
    onAuthorize(updatedDiagnoses);
  };

  const renderDiagnosisRows = (filteredDiagnoses: VehicleDiagnosis[]) =>
    filteredDiagnoses.map((diagnosis) => (
      <TableRow key={diagnosis.idDiagnosis}>
        <TableCell>{diagnosis.problemDetail}</TableCell>
        <TableCell>${diagnosis.maintenanceCost.toFixed(2)}</TableCell>
        <TableCell>{diagnosis.authorized ? "Sí" : "No"}</TableCell>
        <TableCell>
          {diagnosis.partsList.length > 0
            ? diagnosis.partsList.map((part, index) => (
                <Typography key={index}>
                  {part.partDetail} (${part.partCost.toFixed(2)})
                </Typography>
              ))
            : "Sin partes"}
        </TableCell>
        {maintenanceStatus === MaintenanceStatus.PENDING && (
          <TableCell>
            <Checkbox
              checked={selectedDiagnoses.includes(diagnosis.idDiagnosis)}
              onChange={() => handleDiagnosisSelection(diagnosis.idDiagnosis)}
              sx={{ color: Colors.HighlightGreen }}
            />
          </TableCell>
        )}
      </TableRow>
    ));

  return (
    <Paper
      sx={{
        padding: 3,
        backgroundColor: Colors.PrimaryGray,
        boxShadow: "none",
      }}
    >
      {/* Estado del mantenimiento con ícono */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
          marginBottom: 2,
          gap: 2,
        }}
      >
        {icon}
        <Typography
          sx={{
            color: color,
            fontSize: 22,
          }}
        >
          {label} {/* Texto dinámico según el estado */}
        </Typography>
      </Box>

      {diagnoses.length === 0 ? (
        <Typography>No hay diagnósticos disponibles.</Typography>
      ) : (
        <>
          <Table
            sx={{
              "& td, & th": {
                textAlign: "center",
                padding: "8px",
              },
              "& th": {
                backgroundColor: Colors.HighlightGray,
                color: Colors.White,
              },
              "& td": {
                border: "none",
              },
              backgroundColor: Colors.White,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Problema</b>
                </TableCell>
                <TableCell>
                  <b>Costo</b>
                </TableCell>
                <TableCell>
                  <b>Autorizado</b>
                </TableCell>
                <TableCell>
                  <b>Partes</b>
                </TableCell>
                {maintenanceStatus === MaintenanceStatus.PENDING && (
                  <TableCell>
                    <b>Seleccionar</b>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {renderDiagnosisRows(
                maintenanceStatus === MaintenanceStatus.PENDING
                  ? diagnoses
                  : diagnoses.filter((diagnosis) => diagnosis.authorized)
              )}
            </TableBody>
          </Table>

          {maintenanceStatus === MaintenanceStatus.PENDING && (
            <Box display="flex" gap={2} justifyContent="center" mt={2}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: Colors.HighlightGreen,
                }}
                onClick={handleAuthorize}
              >
                Autorizar Diagnósticos
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: Colors.HighlightRed,
                }}
                onClick={onStartMaintenance}
              >
                Iniciar Mantenimiento
              </Button>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default DiagnosisVehicleSection;
