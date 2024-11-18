import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PendingIcon from "@mui/icons-material/Pending";
import { MaintenanceAdvance } from "../../../interfaces/MaintenanceAdvance";
import Colors from "../../../utils/Colors";
import { MaintenanceStatus } from "../../../interfaces/MaintenanceManager";

interface MaintenanceVehicleSectionProps {
  progresses: MaintenanceAdvance[];
  maintenanceStatus: MaintenanceStatus;
}

// Mapeo de íconos, colores y etiquetas
const STATUS_MAP = {
  [MaintenanceStatus.COMPLETED]: {
    color: Colors.HighlightGreen,
    label: "Completado",
    icon: (
      <CheckCircleIcon sx={{ color: Colors.HighlightGreen, fontSize: 25 }} />
    ),
  },
  [MaintenanceStatus.IN_PROGRESS]: {
    color: Colors.HighlightOrange,
    label: "En Progreso",
    icon: (
      <HourglassTopIcon sx={{ color: Colors.HighlightOrange, fontSize: 22 }} />
    ),
  },
  [MaintenanceStatus.PENDING]: {
    color: Colors.HighlightRed,
    label: "No Iniciado",
    icon: <PendingIcon sx={{ color: Colors.HighlightRed, fontSize: 22 }} />,
  },
};

const MaintenanceVehicleSection: React.FC<MaintenanceVehicleSectionProps> = ({
  progresses,
  maintenanceStatus,
}) => {
  const { color, label, icon } = STATUS_MAP[maintenanceStatus];

  return (
    <Paper sx={{ padding: 3, backgroundColor: Colors.PrimaryGray }}>
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

      {/* Tabla o mensaje cuando no hay avances */}
      {progresses.length > 0 ? (
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
                <b>Fecha</b>
              </TableCell>
              <TableCell>
                <b>Descripción</b>
              </TableCell>
              <TableCell>
                <b>Imágenes</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {progresses.map((maintenanceAdvance) => (
              <TableRow key={maintenanceAdvance.idMaintenanceAdvance}>
                <TableCell>
                  {new Date(maintenanceAdvance.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{maintenanceAdvance.description}</TableCell>
                <TableCell>
                  {maintenanceAdvance.imagesAdvance &&
                  maintenanceAdvance.imagesAdvance.length > 0 ? (
                    maintenanceAdvance.imagesAdvance.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt="Avance"
                        style={{ width: 50, height: 50, marginRight: 5 }}
                      />
                    ))
                  ) : ("Imágenes del mantenimiento no disponibles"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography
        >
          No hay avances de mantenimiento registrados.
        </Typography>
      )}
    </Paper>
  );
};

export default MaintenanceVehicleSection;
