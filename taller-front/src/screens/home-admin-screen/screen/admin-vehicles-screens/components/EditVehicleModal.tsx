import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  updateVehicle,
  getVehicleByVehicleId,
} from "../../../../../services/vehicleService";
import { ClientVehicle } from "../../../../../interfaces/ClientVehicle";
import { ClientVehicleDTO } from "../../../../../services/interfaces/VehicleInterfaces";

interface EditVehicleModalProps {
  open: boolean;
  vehicleId: string | null;
  onClose: () => void;
  onVehicleUpdated: () => void;
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({
  open,
  vehicleId,
  onClose,
  onVehicleUpdated,
}) => {
  const [vehicleData, setVehicleData] = useState<ClientVehicleDTO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleId) {
      setLoading(true);
      getVehicleByVehicleId(vehicleId)
        .then((data: ClientVehicle) => {
          setVehicleData({
            brand: data.staticVehicleData.brand,
            model: data.staticVehicleData.model,
            year: data.staticVehicleData.year.toString(),
            licensePlate: data.staticVehicleData.licensePlate,
            mileage: data.nonStaticVehicleData.mileage.toString(),
            fuelLevel: data.nonStaticVehicleData.fuelLevel.toString(),
            additionalObservations:
              data.nonStaticVehicleData.additionalObservations || "",
            clientId: data.clientId,
          });
        })
        .catch((error) => console.error("Error al cargar el vehículo:", error))
        .finally(() => setLoading(false));
    }
  }, [vehicleId]);

  const handleSave = async () => {
    if (vehicleId && vehicleData) {
      setLoading(true);
      try {
        await updateVehicle(vehicleId, vehicleData);
        onVehicleUpdated();
        onClose();
      } catch (error) {
        console.error("Error al actualizar el vehículo:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "600px",
          bgcolor: "background.paper",
          p: 4,
          mx: "auto",
          mt: "10%",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
              Editar Vehículo
            </Typography>
            {vehicleData && (
              <>
                <TextField
                  fullWidth
                  label="Marca"
                  value={vehicleData.brand || ""}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      brand: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Modelo"
                  value={vehicleData.model || ""}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      model: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Año"
                  type="number"
                  value={vehicleData.year || ""}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      year: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Kilometraje"
                  type="number"
                  value={vehicleData.mileage || ""}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      mileage: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Nivel de Combustible"
                  type="number"
                  value={vehicleData.fuelLevel || ""}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      fuelLevel: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Observaciones Adicionales"
                  value={vehicleData.additionalObservations || ""}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      additionalObservations: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  fullWidth
                >
                  Guardar
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EditVehicleModal;
