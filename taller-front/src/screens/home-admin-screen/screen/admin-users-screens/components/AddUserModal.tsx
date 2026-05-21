import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Alert } from "@mui/material";
import Colors from "../../../../../utils/Colors";
import { RegisterDTO } from "../../../../../services/interfaces/authInterfaces";
import { UserType } from "../../../../../services/interfaces/UserInterfaces";
import { registerUserAccount } from "../../../../../services/userService";

interface RegisterUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserRegistered: () => void;
}

const RegisterUserModal: React.FC<RegisterUserModalProps> = ({ open, onClose, onUserRegistered }) => {
  const [registrationData, setRegistrationData] = useState<RegisterDTO>({
    userName: "",
    phone: 0,
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState<UserType["type"]>("client");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await registerUserAccount(registrationData, userType);
      onUserRegistered();
      onClose();
    } catch (err: any) {
      setError(err.message || "Hubo un problema al registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ width: 450, padding: 3, backgroundColor: Colors.White, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Registrar Nuevo Usuario
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Nombre de Usuario"
          name="userName"
          value={registrationData.userName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={registrationData.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          type="number"
        />
        <TextField
          label="Email"
          name="email"
          value={registrationData.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contraseña"
          name="password"
          value={registrationData.password}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          type="password"
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button color="success"   onClick={() => setUserType("client")} variant={userType === "client" ? "contained" : "outlined"}>Cliente</Button>
          <Button color="success"  onClick={() => setUserType("admin")} variant={userType === "admin" ? "contained" : "outlined"}>Administrador</Button>
          <Button color="success"  onClick={() => setUserType("worker")} variant={userType === "worker" ? "contained" : "outlined"}>Trabajador</Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleRegister}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterUserModal;
