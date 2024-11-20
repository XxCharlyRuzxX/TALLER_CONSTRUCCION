import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import Colors from "../../../utils/Colors";
import DescriptionIcon from "@mui/icons-material/Description";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HelpIcon from "@mui/icons-material/Help";

interface SummarySectionProps {
  totalToPay: number;
  onRequestReport: () => void;
  onSubmitSurvey: () => void;
  onCustomerSupport: () => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  totalToPay,
  onRequestReport,
  onSubmitSurvey,
  onCustomerSupport,
}) => {
  return (
    <Paper
      sx={{
        padding: 3,
        backgroundColor: Colors.PrimaryGray,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >      <Box>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Total a pagar:
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: Colors.HighlightGreen,
          }}
        >
          ${totalToPay.toFixed(2)}
        </Typography>
      </Box>

      {/* Botones */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<DescriptionIcon />}
          onClick={onRequestReport}
          sx={{
            backgroundColor: Colors.HighlightBlue,
            color: Colors.White,
            "&:hover": {
              backgroundColor: Colors.DarkBlue,
            },
            minWidth: "300px",
          }}
        >
          Solicitar Reporte de Mantenimiento
        </Button>

        <Button
          variant="contained"
          startIcon={<ThumbUpIcon />}
          onClick={onSubmitSurvey}
          sx={{
            backgroundColor: Colors.HighlightBlue,
            color: Colors.White,
            "&:hover": {
              backgroundColor: Colors.DarkBlue,
            },
            minWidth: "300px",
          }}
        >
          Realizar Encuesta de Satisfacción
        </Button>

        <Button
          variant="contained"
          startIcon={<HelpIcon />}
          onClick={onCustomerSupport}
          sx={{
            backgroundColor: Colors.HighlightBlue,
            color: Colors.White,
            "&:hover": {
              backgroundColor: Colors.DarkBlue,
            },
            minWidth: "300px",
          }}
        >
          Ayuda al Cliente
        </Button>
      </Box>
    </Paper>
  );
};

export default SummarySection;
