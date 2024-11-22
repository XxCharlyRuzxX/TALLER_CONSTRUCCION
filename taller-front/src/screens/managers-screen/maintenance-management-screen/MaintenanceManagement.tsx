import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import Colors from "../../../utils/Colors";
import { ClientVehicle } from "../../../interfaces/ClientVehicle";
import AddAdvanceModal from "./components/AddAdvanceModal";
import UpdateAdvanceModal from "./components/UpdateAdvanceModal";
import StatusUpdateModal from "./components/StatusUpdateModal";
import { deleteMaintenanceAdvance } from "../../../services/maintenanceService";
import MaintenanceAdvancesTable from "./components/MaintenanceAdvancesTable";
import { MaintenanceAdvance } from "../../../interfaces/MaintenanceAdvance";
import { getStatusColor } from "./functions/statusColor";
import { getVehicleByVehicleId } from "../../../services/vehicleService";

const MaintenanceManagement: React.FC = () => {
  const { idVehicle } = useParams<{ idVehicle: string }>();
  const [vehicle, setVehicle] = useState<ClientVehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAdvance, setEditingAdvance] = useState<MaintenanceAdvance | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);


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
          <MaintenanceAdvancesTable
            advances={vehicle.maintenanceManager.maintenanceProgresses}
            onEdit={(advance) => setEditingAdvance(advance)}
            onDelete={handleDeleteAdvance}
          />

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
                fetchVehicleData();
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
