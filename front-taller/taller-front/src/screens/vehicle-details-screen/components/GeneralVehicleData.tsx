import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { ClientVehicle } from "../../../interfaces/ClientVehicle";
import Colors from "../../../utils/Colors";

interface GeneralVehicleDataProps {
  vehicle: ClientVehicle;
}

const GeneralVehicleData: React.FC<GeneralVehicleDataProps> = ({ vehicle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 3,
        backgroundColor: Colors.PrimaryGray,
        borderRadius: 2,
      }}
    >
      {/* Icono del vehículo */}
      <Box
        sx={{
          width: 120,
          height: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.HighlightGray,
          borderRadius: "10%",
          marginRight: 3,
        }}
      >
        <TimeToLeaveIcon sx={{ fontSize: 70, color: Colors.White }} />
      </Box>

      {/* Datos del vehículo organizados en columnas */}
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>
              <b>Marca:</b> {vehicle.staticVehicleData.brand}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Modelo:</b> {vehicle.staticVehicleData.model}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Año:</b> {vehicle.staticVehicleData.year}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Placa:</b> {vehicle.staticVehicleData.licensePlate}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Kilometraje:</b> {vehicle.nonStaticVehicleData.mileage} km
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Nivel de Combustible:</b> {vehicle.nonStaticVehicleData.fuelLevel}%
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <b>Observaciones Adicionales:</b> {vehicle.nonStaticVehicleData.additionalObservations}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GeneralVehicleData;
