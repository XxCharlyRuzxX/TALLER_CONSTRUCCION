import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { MaintenanceStatus } from "../../../interfaces/MaintenanceManager";
import { getVehicleByVehicleId } from "../../../services/carService";
import Colors from "../../../utils/Colors";
import { MaintenanceAdvance } from "../../../interfaces/MaintenanceAdvance";
import { ClientVehicle } from "../../../interfaces/ClientVehicle";
import AddAdvanceModal from "./components/AddAdvanceModal";
import UpdateAdvanceModal from "./components/UpdateAdvanceModal";
import StatusUpdateModal from "./components/StatusUpdateModal";
import { deleteMaintenanceAdvance } from "../../../services/maintenanceService";

const MaintenanceManagement: React.FC = () => {
  const { idVehicle } = useParams<{ idVehicle: string }>();
  const [vehicle, setVehicle] = useState<ClientVehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAdvance, setEditingAdvance] = useState<MaintenanceAdvance | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const getStatusColor = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.PENDING:
        return Colors.HighlightRed;
      case MaintenanceStatus.IN_PROGRESS:
        return Colors.HighlightOrange;
      case MaintenanceStatus.COMPLETED:
        return Colors.HighlightGreen;
      default:
        return Colors.Black;
    }
  };

  const fetchVehicleData = async () => {
    setLoading(true);
    try {
      const vehicleData = await getVehicleByVehicleId(idVehicle!);
      setVehicle(vehicleData);
    } catch (error) {
      console.error("Error al obtener los datos del vehículo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, [idVehicle]);

  const handleDeleteAdvance = async (idAdvance: number) => {
    if (vehicle?.maintenanceManager) {
      try {
        await deleteMaintenanceAdvance(vehicle.maintenanceManager.idMaintenanceManager, idAdvance);
        fetchVehicleData();
      } catch (error) {
        console.error("Error al eliminar el avance de mantenimiento:", error);
      }
    }
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: Colors.PrimaryGray, minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4, color: "#333" }}>
        Gestión de Mantenimiento
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : vehicle?.maintenanceManager ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#333" }}>
              Estado del Mantenimiento:{" "}
              <span style={{ color: getStatusColor(vehicle.maintenanceManager.maintenanceStatus) }}>
                {vehicle.maintenanceManager.maintenanceStatus}
              </span>
            </Typography>
            <Button variant="contained" onClick={() => setStatusModalOpen(true)}>
              Actualizar Estado
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", mb: 4 }}>
            <Table>
              <TableHead sx={{ backgroundColor: Colors.HighlightGray }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: Colors.White }}>
                    <b>ID Avance</b>
                  </TableCell>
                  <TableCell align="center" sx={{ color: Colors.White }}>
                    <b>Fecha</b>
                  </TableCell>
                  <TableCell align="center" sx={{ color: Colors.White }}>
                    <b>Descripción</b>
                  </TableCell>
                  <TableCell align="center" sx={{ color: Colors.White }}>
                    <b>Acciones</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicle.maintenanceManager.maintenanceProgresses.map((advance) => (
                  <TableRow key={advance.idMaintenanceAdvance}>
                    <TableCell align="center">{advance.idMaintenanceAdvance}</TableCell>
                    <TableCell align="center">{advance.date}</TableCell>
                    <TableCell align="center">{advance.description}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditingAdvance(advance)}
                        sx={{ ml: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteAdvance(advance.idMaintenanceAdvance)}
                        sx={{ ml: 1 }}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={() => setIsAdding(true)} sx={{ mb: 4 }}>
            Agregar Avance
          </Button>
          {isAdding && (
            <AddAdvanceModal
              open={isAdding}
              onClose={() => setIsAdding(false)}
              onAdd={() => {
                setIsAdding(false);
                fetchVehicleData();
              }}
              managerId={vehicle.maintenanceManager.idMaintenanceManager}
            />
          )}
          {editingAdvance && (
            <UpdateAdvanceModal
              open={!!editingAdvance}
              onClose={() => setEditingAdvance(null)}
              onUpdate={() => {
                setEditingAdvance(null);
                fetchVehicleData()
              }}
              advance={editingAdvance}
              managerId={vehicle.maintenanceManager.idMaintenanceManager}
            />
          )}
          {statusModalOpen && (
            <StatusUpdateModal
              open={statusModalOpen}
              currentStatus={vehicle.maintenanceManager.maintenanceStatus}
              onClose={() => setStatusModalOpen(false)}
              onUpdate={() => {
                setStatusModalOpen(false);
                fetchVehicleData();
              }}
              managerId={vehicle.maintenanceManager.idMaintenanceManager}
            />
          )}
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          Sin datos de mantenimiento
        </Typography>
      )}
    </Box>
  );
};

export default MaintenanceManagement;
