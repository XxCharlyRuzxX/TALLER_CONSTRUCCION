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
} from "@mui/material";
import { VehicleDiagnosis } from "../../../interfaces/VehicleDiagnosis";
import Colors from "../../../utils/Colors";

interface DiagnosisVehicleSectionProps {
  diagnoses: VehicleDiagnosis[];
  maintenanceStatus: string;
  onAuthorize: (updatedDiagnoses: VehicleDiagnosis[]) => void;
}

const DiagnosisVehicleSection: React.FC<DiagnosisVehicleSectionProps> = ({
  diagnoses,
  maintenanceStatus,
  onAuthorize,
}) => {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<number[]>([]);

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

  return (
    <Paper
      sx={{
        padding: 3,
        backgroundColor: Colors.PrimaryGray,
        boxShadow: "none",
      }}
    >
      {diagnoses.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            color: Colors.HighlightRed,
            fontWeight: "bold",
          }}
        >
          No hay diagnósticos disponibles.
        </Typography>
      ) : maintenanceStatus === "PENDING" ? (
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
                <TableCell>
                  <b>Seleccionar</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diagnoses.map((diagnosis) => (
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
                  <TableCell>
                    <Checkbox
                      checked={selectedDiagnoses.includes(diagnosis.idDiagnosis)}
                      onChange={() => handleDiagnosisSelection(diagnosis.idDiagnosis)}
                      sx={{
                        color: Colors.HighlightGreen,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            sx={{
              bgcolor: Colors.HighlightGreen,
              mt: 2,
              width: "fit-content",
              alignSelf: "center",
            }}
            onClick={handleAuthorize}
          >
            Autorizar Diagnósticos
          </Button>
        </>
      ) : (
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
            </TableRow>
          </TableHead>
          <TableBody>
            {diagnoses
              .filter((diagnosis) => diagnosis.authorized)
              .map((diagnosis) => (
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default DiagnosisVehicleSection;
