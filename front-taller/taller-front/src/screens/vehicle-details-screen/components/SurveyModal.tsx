import React from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { Rating } from "@mui/lab";

interface SurveyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number | null, feedback: string) => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState("");

  const handleSubmit = () => {
    if (!rating) {
      alert("Por favor, selecciona una calificación.");
      return;
    }
    onSubmit(rating, feedback);
    setRating(null); // Reset
    setFeedback(""); // Reset
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
          Encuesta de Satisfacción
        </Typography>

        <Typography id="modal-description" sx={{ mb: 2 }}>
          Por favor, califica tu experiencia:
        </Typography>

        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(_event, newValue) => {
            setRating(newValue);
          }}
          size="large"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Comentarios adicionales"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SurveyModal;
