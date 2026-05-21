import React, { useState } from "react";
import { Button, TextField, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./functions/registerFunctions";
import Colors from "../../utils/Colors";

const RegisterScreen: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError(null);
      setSuccessMessage(null);
      await registerUser(userName, phone, email, password, confirmPassword, navigate);
      setSuccessMessage("Registro exitoso. Redirigiendo al inicio de sesión...");
    } catch (err: any) {
      setError(err.message || "Error al registrarse.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#F4F4F4" }}>
      <Box sx={{ backgroundColor: Colors.White, padding: "40px", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", width: "600px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h5" align="center" gutterBottom>
          CREAR UNA CUENTA
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          COMPLETA TUS DATOS PARA REGISTRARTE
        </Typography>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <TextField sx={{ width: "80%" }} label="Nombre Completo" variant="outlined" margin="normal" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <TextField sx={{ width: "80%" }} label="Teléfono" type="tel" variant="outlined" margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField sx={{ width: "80%" }} label="Correo Electrónico" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField sx={{ width: "80%" }} label="Contraseña" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField sx={{ width: "80%" }} label="Confirmar Contraseña" type="password" variant="outlined" margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
          {successMessage && <Typography color="success" variant="body2" sx={{ mt: 1 }}>{successMessage}</Typography>}
          <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2, width: "50%" }} onClick={handleRegister} disabled={!userName || !phone || !email || !password || !confirmPassword}>
            Registrarme
          </Button>
          <Box display="flex" justifyContent="center" sx={{ mt: 2, width: "80%" }}>
            <Link href="/login" variant="body2">¿Ya tienes una cuenta? Inicia sesión</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
