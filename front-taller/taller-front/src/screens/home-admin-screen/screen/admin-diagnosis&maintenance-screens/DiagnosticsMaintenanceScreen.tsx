import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Colors from "../../../../utils/Colors";

const sections = [
  {
    title: "Consultar Diagnósticos",
    action: "Consultar",
    icon: <SearchIcon sx={{ fontSize: "6rem", color: Colors.HighlightGreen }} />,
    route: "/homeadmin/diagnosis&maintenance/consultdiagnosis",
  },
  {
    title: "Gestionar Diagnósticos",
    action: "Gestionar",
    icon: (
      <ManageAccountsIcon
        sx={{ fontSize: "6rem", color: Colors.HighlightGreen }}
      />
    ),
    route: "/homeadmin/diagnosis&maintenance/managmentdiagnosis",
  },
  {
    title: "Consultar Mantenimiento",
    action: "Consultar",
    icon: <SearchIcon sx={{ fontSize: "6rem", color: Colors.HighlightRed }} />,
    route: "/homeadmin/diagnosis&maintenance/consultmaintenance",
  },
  {
    title: "Gestionar Mantenimiento",
    action: "Gestionar",
    icon: (
      <ManageAccountsIcon
        sx={{ fontSize: "6rem", color: Colors.HighlightRed  }}
      />
    ),
    route:"/homeadmin/diagnosis&maintenance/managmentmaintenance",
  },
];

const DiagnosticsMaintenanceScreen: React.FC = () => {
  const handleSectionClick = (route: string) => {
    window.location.href = route;
  };

  return (
    <Box
      sx={{ backgroundColor: "#F5F1F1", minHeight: "100vh", padding: "2rem" }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 4, color: "#333" }}
      >
        Diagnósticos y Mantenimiento
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Paper
              sx={{
                padding: "2rem",
                textAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": { boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)" },
                cursor: "pointer",
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

export default DiagnosticsMaintenanceScreen;
