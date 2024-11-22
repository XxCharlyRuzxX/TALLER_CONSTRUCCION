import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { ClientVehicle } from "../../../interfaces/ClientVehicle";
import {
  addDiagnosis,
  deleteDiagnosisById,
  updateDiagnosis,
} from "../../../services/diagnosisService";
import Colors from "../../../utils/Colors";
import AddDiagnosisModal from "./components/AddDiagnosisModal";
import EditDiagnosisModal from "./components/EditDiagnosisModal";
import DiagnosisTable from "./components/DiagnosisTable";
import { VehicleDiagnosisDTO } from "../../../services/interfaces/DiagnosisInterfaces";
import { getVehicleByVehicleId } from "../../../services/vehicleService";

const VehicleDiagnosisManagement: React.FC = () => {
  const { idVehicle } = useParams<{ idVehicle: string }>();
  const [vehicle, setVehicle] = useState<ClientVehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDiagnosis, setEditingDiagnosis] =
    useState<VehicleDiagnosisDTO | null>(null);

  useEffect(() => {
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
    fetchVehicleData();
  }, [idVehicle]);

  const handleDelete = async (diagnosisId: number) => {
    if (vehicle && vehicle.diagnosisManager) {
      try {
        await deleteDiagnosisById(
          vehicle.diagnosisManager.idDiagnosisManager,
          diagnosisId
        );
        setVehicle((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            diagnosisManager: {
              ...prev.diagnosisManager,
              diagnoses: prev.diagnosisManager.diagnoses.filter(
                (d) => d.idDiagnosis !== diagnosisId
              ),
            },
          };
        });
      } catch (error) {
        console.error("Error al eliminar el diagnóstico:", error);
      }
    }
  };

  const handleAdd = async (
    diagnosis: Omit<VehicleDiagnosisDTO, "idDiagnosis">
  ) => {
    if (vehicle && vehicle.diagnosisManager) {
      try {
        await addDiagnosis(vehicle.diagnosisManager.idDiagnosisManager, {
          ...diagnosis,
          idDiagnosis: 0,
        });
        const updatedVehicle = await getVehicleByVehicleId(idVehicle!);
        setVehicle(updatedVehicle);
        setIsAddModalOpen(false);
      } catch (error) {
        console.error("Error al agregar el diagnóstico:", error);
      }
    }
  };

  const handleEdit = async (diagnosis: VehicleDiagnosisDTO) => {
    if (vehicle && vehicle.diagnosisManager) {
      try {
        await updateDiagnosis(
          vehicle.diagnosisManager.idDiagnosisManager,
          diagnosis.idDiagnosis,
          diagnosis
        );
        const updatedVehicle = await getVehicleByVehicleId(idVehicle!);
        setVehicle(updatedVehicle);
        setIsEditModalOpen(false);
      } catch (error) {
        console.error("Error al actualizar el diagnóstico:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: Colors.PrimaryGray,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 4, color: "#333" }}
      >
        Gestión de Diagnósticos del Vehículo
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : vehicle && vehicle.diagnosisManager ? (
        <>
          <DiagnosisTable
            diagnoses={vehicle.diagnosisManager.diagnoses}
            onEdit={(diagnosis) => {
              setEditingDiagnosis(diagnosis);
              setIsEditModalOpen(true);
            }}
            onDelete={handleDelete}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            onClick={() => setIsAddModalOpen(true)}
          >
            Agregar Diagnóstico
          </Button>
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          Sin diagnósticos
        </Typography>
      )}

      <AddDiagnosisModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />

      {editingDiagnosis && (
        <EditDiagnosisModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          initialData={editingDiagnosis}
        />
      )}
    </Box>
  );
};

export default VehicleDiagnosisManagement;
