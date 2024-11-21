import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sections } from "./components/AdminSections";

const HomeAdminScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleSectionClick = (route: string) => {
    if (route != "") {
      navigate(route);
    }
    else{
      alert("Esta seccion no está disponible");
    }
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
