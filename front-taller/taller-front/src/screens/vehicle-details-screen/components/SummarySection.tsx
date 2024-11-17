import React from "react";
import { Paper, Typography } from "@mui/material";
import Colors from "../../../utils/Colors";

interface SummarySectionProps {
  totalToPay: number;
}

const SummarySection: React.FC<SummarySectionProps> = ({ totalToPay }) => {
  return (
    <Paper sx={{ padding: 3 , backgroundColor: Colors.PrimaryGray}}>
      <Typography variant="h6" gutterBottom>
        Resumen General
      </Typography>
      <Typography variant="body1">Total a pagar:</Typography>
      <Typography variant="h4" color={Colors.HighlightGreen}>
        ${totalToPay.toFixed(2)}
      </Typography>
    </Paper>
  );
};

export default SummarySection;
