import React, { useState } from "react";
import { Modal, Box, Typography, Select, MenuItem, Button } from "@mui/material";
import { MaintenanceStatus } from "../../../../interfaces/MaintenanceManager";
import { updateMaintenanceStatus } from "../../../../services/maintenanceService";


interface StatusUpdateModalProps {
  open: boolean;
  currentStatus: MaintenanceStatus;
  onClose: () => void;
  onUpdate: (newStatus: MaintenanceStatus) => void;
  managerId: number;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  open,
  currentStatus,
  onClose,
  onUpdate,
  managerId,
}) => {
  const [newStatus, setNewStatus] = useState<MaintenanceStatus>(currentStatus);

  const handleSubmit = async () => {
    try {
      await updateMaintenanceStatus(managerId, newStatus);
      onUpdate(newStatus);
    } catch (error) {
      console.error("Error al actualizar el estado del mantenimiento:", error);
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
          Actualizar Estado de Mantenimiento
        </Typography>
        <Select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value as MaintenanceStatus)}
          fullWidth
          sx={{ mb: 3 }}
        >
          {Object.values(MaintenanceStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Actualizar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StatusUpdateModal;
