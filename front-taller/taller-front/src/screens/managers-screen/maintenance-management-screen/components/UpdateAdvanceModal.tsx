import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { updateMaintenanceAdvance } from "../../../../services/maintenanceService";
import { MaintenanceAdvance } from "../../../../interfaces/MaintenanceAdvance";


interface UpdateAdvanceModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedAdvance: MaintenanceAdvance) => void;
  advance: MaintenanceAdvance;
  managerId: number;
}

const UpdateAdvanceModal: React.FC<UpdateAdvanceModalProps> = ({
  open,
  onClose,
  onUpdate,
  advance,
  managerId,
}) => {
  const [updatedAdvance, setUpdatedAdvance] = useState({
    date: advance.date,
    description: advance.description,
  });

  const handleSubmit = async () => {
    try {
      const updatedAdvanceDTO = await updateMaintenanceAdvance(managerId, advance.idMaintenanceAdvance, {
        date: updatedAdvance.date,
        description: updatedAdvance.description,
        imagesAdvance: [],
      });

      const mappedAdvance: MaintenanceAdvance = {
        idMaintenanceAdvance: updatedAdvanceDTO.idMaintenanceAdvance ?? 0,
        date: updatedAdvanceDTO.date,
        description: updatedAdvanceDTO.description,
        imagesAdvance: updatedAdvanceDTO.imagesAdvance || [],
      };

      onUpdate(mappedAdvance);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el avance:", error);
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
          Editar Avance de Mantenimiento
        </Typography>
        <TextField
          label="Fecha"
          type="date"
          value={updatedAdvance.date}
          onChange={(e) => setUpdatedAdvance({ ...updatedAdvance, date: e.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Descripción"
          value={updatedAdvance.description}
          onChange={(e) => setUpdatedAdvance({ ...updatedAdvance, description: e.target.value })}
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

export default UpdateAdvanceModal;
