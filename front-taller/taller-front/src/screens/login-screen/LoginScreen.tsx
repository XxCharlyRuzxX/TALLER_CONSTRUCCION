import React from "react";
import { Button, TextField, Typography, Box, Link } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#F4F4F4", }} >
      <Box sx={{ backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", width: "600px", height: "500px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }} >
        <Typography variant="h5" align="center" gutterBottom>
          BIENVENIDO NUEVAMENTE
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          INICIA SECCIÓN PARA CONTINUAR
        </Typography>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", }} >
          <TextField sx={{ width: "80%" }} label="Correo Electrónico" variant="outlined" margin="normal" />
          <TextField sx={{ width: "80%" }} label="Contraseña" type="password" variant="outlined" margin="normal" />
          <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2, width: "50%" }} > Ingresar </Button>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2, width: "80%" }} >
            <Link href="#" variant="body2"> Crear mi cuenta </Link>
            <Link href="#" variant="body2"> Hé olvidado mi contraseña </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
