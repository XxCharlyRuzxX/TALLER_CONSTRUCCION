import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { ClientVehicleDTO } from "../../../../../services/interfaces/VehicleInterfaces";
import { registerVehicle } from "../../../../../services/vehicleService";

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onVehicleAdded: () => void;
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({
  open,
  onClose,
  onVehicleAdded,
}) => {
  const [vehicleData, setVehicleData] = useState<ClientVehicleDTO>({
    brand: "",
    model: "",
    year: "",
    licensePlate: "",
    mileage: "",
    fuelLevel: "",
    additionalObservations: "",
    clientId: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (!vehicleData.clientId) {
        alert("Por favor, ingrese el ID del cliente.");
        setLoading(false);
        return;
      }
      await registerVehicle(vehicleData);
      onVehicleAdded();
      onClose();
    } catch (error) {
      console.error("Error al registrar el vehículo:", error);
    } finally {
      setLoading(false);
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
          mt: "5%",
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
              Agregar Vehículo
            </Typography>
            <TextField
              fullWidth
              label="ID del Cliente"
              type="number"
              value={vehicleData.clientId}
              onChange={(e) =>
                setVehicleData({
                  ...vehicleData,
                  clientId: parseInt(e.target.value, 10),
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Marca"
              value={vehicleData.brand}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, brand: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Modelo"
              value={vehicleData.model}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, model: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Año"
              type="number"
              value={vehicleData.year}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, year: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Placa"
              value={vehicleData.licensePlate}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, licensePlate: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Kilometraje"
              type="number"
              value={vehicleData.mileage}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, mileage: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Nivel de Combustible"
              type="number"
              value={vehicleData.fuelLevel}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, fuelLevel: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Observaciones Adicionales"
              value={vehicleData.additionalObservations}
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
      </Box>
    </Modal>
  );
};

export default AddVehicleModal;
