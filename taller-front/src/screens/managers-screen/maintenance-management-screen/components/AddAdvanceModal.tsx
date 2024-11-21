import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { MaintenanceAdvance } from "../../../../interfaces/MaintenanceAdvance";
import { addMaintenanceAdvance } from "../../../../services/maintenanceService";


interface AddAdvanceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newAdvance: MaintenanceAdvance) => void;
  managerId: number;
}

const AddAdvanceModal: React.FC<AddAdvanceModalProps> = ({ open, onClose, onAdd, managerId }) => {
  const [newAdvance, setNewAdvance] = useState({
    date: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const addedAdvanceDTO = await addMaintenanceAdvance(managerId, {
        date: newAdvance.date,
        description: newAdvance.description,
        imagesAdvance: [],
      });

      const addedAdvance: MaintenanceAdvance = {
        idMaintenanceAdvance: addedAdvanceDTO.idMaintenanceAdvance ?? 0,
        date: addedAdvanceDTO.date,
        description: addedAdvanceDTO.description,
        imagesAdvance: addedAdvanceDTO.imagesAdvance || [],
      };

      onAdd(addedAdvance);
      onClose();
    } catch (error) {
      console.error("Error al agregar un avance:", error);
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
          width: "400px",
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Agregar Avance de Mantenimiento
        </Typography>
        <TextField
          label="Fecha"
          type="date"
          value={newAdvance.date}
          onChange={(e) => setNewAdvance({ ...newAdvance, date: e.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Descripción"
          value={newAdvance.description}
          onChange={(e) => setNewAdvance({ ...newAdvance, description: e.target.value })}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddAdvanceModal;
