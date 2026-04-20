import React, { useState } from "react";
import { Button, TextField, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./functions/registerFunctions";
import Colors from "../../utils/Colors";
import { ApiError, parseApiError } from "../../services/api/errorHandler";

type RegisterField = "userName" | "phone" | "email" | "password" | "confirmPassword";
type RegisterFieldErrors = Partial<Record<RegisterField, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

const validateRegisterForm = (
  userName: string,
  phone: string,
  email: string,
  password: string,
  confirmPassword: string
): RegisterFieldErrors => {
  const errors: RegisterFieldErrors = {};

  if (!userName.trim()) {
    errors.userName = "El nombre es obligatorio.";
  }

  if (!PHONE_REGEX.test(phone.trim())) {
    errors.phone = "El teléfono debe tener exactamente 10 dígitos.";
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};

const mapBackendFieldErrors = (fieldErrors: Record<string, string>): RegisterFieldErrors => {
  const mappedErrors: RegisterFieldErrors = {};

  const supportedFields: RegisterField[] = ["userName", "phone", "email", "password", "confirmPassword"];
  supportedFields.forEach((field) => {
    if (fieldErrors[field]) {
      mappedErrors[field] = fieldErrors[field];
    }
  });

  return mappedErrors;
};

const RegisterScreen: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearFieldError = (field: RegisterField) => {
    setFieldErrors((previousErrors) => ({ ...previousErrors, [field]: undefined }));
  };

  const handleRegister = async () => {
    const localValidationErrors = validateRegisterForm(userName, phone, email, password, confirmPassword);
    if (Object.keys(localValidationErrors).length > 0) {
      setFieldErrors(localValidationErrors);
      setSuccessMessage(null);
      setError("Corrige los campos marcados.");
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      setFieldErrors({});
      await registerUser(userName, phone, email, password, confirmPassword, navigate);
      setSuccessMessage("Registro exitoso. Redirigiendo al inicio de sesión...");
    } catch (err: unknown) {
      const parsedError = err instanceof ApiError ? err : parseApiError(err);
      const backendFieldErrors = mapBackendFieldErrors(parsedError.fieldErrors);
      if (Object.keys(backendFieldErrors).length > 0) {
        setFieldErrors((previousErrors) => ({ ...previousErrors, ...backendFieldErrors }));
      }
      setError(parsedError.message || "Error al registrarse.");
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
          <TextField
            sx={{ width: "80%" }}
            label="Nombre Completo"
            variant="outlined"
            margin="normal"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              clearFieldError("userName");
            }}
            error={Boolean(fieldErrors.userName)}
            helperText={fieldErrors.userName}
          />
          <TextField
            sx={{ width: "80%" }}
            label="Teléfono"
            type="tel"
            variant="outlined"
            margin="normal"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              clearFieldError("phone");
            }}
            error={Boolean(fieldErrors.phone)}
            helperText={fieldErrors.phone}
          />
          <TextField
            sx={{ width: "80%" }}
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            error={Boolean(fieldErrors.email)}
            helperText={fieldErrors.email}
          />
          <TextField
            sx={{ width: "80%" }}
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearFieldError("password");
            }}
            error={Boolean(fieldErrors.password)}
            helperText={fieldErrors.password}
          />
          <TextField
            sx={{ width: "80%" }}
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearFieldError("confirmPassword");
            }}
            error={Boolean(fieldErrors.confirmPassword)}
            helperText={fieldErrors.confirmPassword}
          />
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
