import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Colors from "../../../utils/Colors";
import { ClientVehicleDTO, registerVehicle } from "../../../services/carService";
import { UserAccount } from "../../../interfaces/UserAccount";

interface RegisterVehicleModalProps {
  userAccount: UserAccount;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const RegisterVehicleModal: React.FC<RegisterVehicleModalProps> = ({
  userAccount,
  open,
  onClose,
  onSave,
}) => {
  const initialVehicleData: ClientVehicleDTO = {
    clientId: userAccount.userId,
    brand: "",
    model: "",
    year: 0,
    licensePlate: "",
    mileage: 0,
    fuelLevel: 0,
    additionalObservations: "",
  };

  const [vehicleData, setVehicleData] = useState<ClientVehicleDTO>(initialVehicleData);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setVehicleData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "mileage" || name === "fuelLevel" ? Number(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    try {
      setError(null);
      await registerVehicle(vehicleData);
      setVehicleData(initialVehicleData);
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar el vehículo");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Registrar Nuevo Vehículo
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Marca"
          name="brand"
          value={vehicleData.brand}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Modelo"
          name="model"
          value={vehicleData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Año"
          name="year"
          value={vehicleData.year || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Placa"
          name="licensePlate"
          value={vehicleData.licensePlate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Kilometraje"
          name="mileage"
          value={vehicleData.mileage || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Nivel de Combustible (%)"
          name="fuelLevel"
          value={vehicleData.fuelLevel || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Observaciones Adicionales"
          name="additionalObservations"
          value={vehicleData.additionalObservations}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" onClick={onClose} sx={{ bgcolor: Colors.HighlightRed }}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: Colors.HighlightGreen }}
            onClick={handleSave}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterVehicleModal;
