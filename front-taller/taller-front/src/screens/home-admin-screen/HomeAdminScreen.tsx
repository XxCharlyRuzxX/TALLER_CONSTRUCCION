import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import BarChartIcon from "@mui/icons-material/BarChart";
import Colors from "../../utils/Colors";

const sections = [
  {
    title: "Gestión de Usuarios",
    action: "Gestionar",
    icon: <PeopleIcon sx={{ fontSize: "8rem", color: Colors.HighlightBlue }} />,
    route: "/homeadmin/users",
  },
  {
    title: "Gestión de Vehículos",
    action: "Gestionar",
    icon: (
      <DirectionsCarIcon sx={{ fontSize: "8rem", color: Colors.DarkBlue }} />
    ),
    route: "/homeadmin/vehicles",
  },
  {
    title: "Diagnósticos y Mantenimiento",
    action: "Gestionar",
    icon: (
      <BuildCircleIcon sx={{ fontSize: "8rem", color: Colors.HighlightRed }} />
    ),
    route: "/homeadmin/diagnosis&maintenance",
  },
  {
    title: "Generación de Facturas",
    action: "Gestionar",
    icon: (
      <ReceiptIcon sx={{ fontSize: "8rem", color: Colors.HighlightGray }} />
    ),
    route: "/admin/invoices",
  },
  {
    title: "Gestión de Pagos",
    action: "Gestionar",
    icon: (
      <PaymentIcon sx={{ fontSize: "8rem", color: Colors.HighlightOrange }} />
    ),
    route: "/admin/payments",
  },
  {
    title: "Generación de Reportes",
    action: "Consultar",
    icon: (
      <BarChartIcon sx={{ fontSize: "8rem", color: Colors.HighlightGreen }} />
    ),
    route: "/admin/reports",
  },
];

const HomeAdminScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleSectionClick = (route: string) => {
    navigate(route); // Redirige al usuario a la ruta proporcionada
  };

  return (
    <Box
      sx={{ backgroundColor: "#F5F1F1", minHeight: "100vh", padding: "2rem" }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 4, color: "#333" }}
      >
        Bienvenido al Panel del Administrador
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                padding: "2rem",
                textAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": { boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)" },
              }}
              onClick={() => handleSectionClick(section.route)}
            >
              <Box sx={{ mb: 2 }}>{section.icon}</Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {section.title}
              </Typography>
              <Button variant="contained" color="primary">
                {section.action}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeAdminScreen;
