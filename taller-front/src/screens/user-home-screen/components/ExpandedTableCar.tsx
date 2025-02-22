import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CarTable from "./CarTable";
import { Colors } from "../../../utils/Colors";
import { ClientVehicle } from "../../../interfaces/ClientVehicle";

interface ExpandableTableProps {
  cars: ClientVehicle[];
  title: string;
  onAddCar: () => void;
}

export const ExpandableTableCard: React.FC<ExpandableTableProps> = ({
  cars,
  title,
  onAddCar,
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onAddCar();
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleExpandClick}
      sx={{
        mt: 2,
        backgroundColor: Colors.HighlightGray,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: Colors.White }} />}
        sx={{
          color: "white",
          backgroundColor: Colors.HighlightGray,
          borderRadius: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <IconButton
            aria-label="Agregar Auto"
            onClick={handleAddCarClick}
            sx={{ color: Colors.White }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={{ backgroundColor: Colors.White, borderRadius: "0" }}
      >
        <CarTable
          cars={cars}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpandableTableCard;
