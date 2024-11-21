import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { VehicleDiagnosisDTO } from "../../../../services/diagnosisService";

interface DiagnosisModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (diagnosis: VehicleDiagnosisDTO) => void;
  initialData?: VehicleDiagnosisDTO;
}

const DiagnosisModal: React.FC<DiagnosisModalProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [diagnosisData, setDiagnosisData] = useState<VehicleDiagnosisDTO>(
    initialData || {
      idDiagnosis: 0,
      problemDetail: "",
      maintenanceCost: 0,
      authorized: false,
      evaluationDate: "",
      partsList: [],
    }
  );

  const isEditing = !!diagnosisData.idDiagnosis;

  const handleInputChange = (field: keyof VehicleDiagnosisDTO, value: any) => {
    setDiagnosisData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(diagnosisData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          borderRadius: "12px",
          border: "3px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
          {isEditing ? "Editar Diagnóstico" : "Agregar Diagnóstico"}
        </Typography>
        <TextField
          label="Detalle del Problema"
          fullWidth
          variant="outlined"
          value={diagnosisData.problemDetail}
          onChange={(e) => handleInputChange("problemDetail", e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Costo de Mantenimiento"
          fullWidth
          variant="outlined"
          type="number"
          value={diagnosisData.maintenanceCost}
          onChange={(e) => handleInputChange("maintenanceCost", parseFloat(e.target.value))}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Fecha de Evaluación"
          fullWidth
          variant="outlined"
          type="date"
          value={diagnosisData.evaluationDate}
          onChange={(e) => handleInputChange("evaluationDate", e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 3 }}
        />
        <Typography variant="body1" sx={{ mb: 3 }}>
          Autorizado:{" "}
          <Button
            variant="contained"
            color={diagnosisData.authorized ? "success" : "error"}
            onClick={() => handleInputChange("authorized", !diagnosisData.authorized)}
          >
            {diagnosisData.authorized ? "Sí" : "No"}
          </Button>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DiagnosisModal;
