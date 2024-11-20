import React, { useState } from "react";
import { Button, TextField, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login, getUserType } from "../../services/authService";
import { UserAccount } from "../../interfaces/UserAccount";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null);
      const user = await authenticateUser(email, password);
      await handleUserRedirection(user);
    } catch (err: any) {
      setError(err.message || "Error en el inicio de sesión");
    }
  };

  const authenticateUser = async (email: string, password: string): Promise<UserAccount> => {
    const loginData = { email, password };
    const user: UserAccount = await login(loginData);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const handleUserRedirection = async (user: UserAccount) => {
    const userTypeResponse = await getUserType(user.userId);
    const userType = userTypeResponse.type;

    switch (userType) {
      case "Admin":
        navigate("/homeadmin");
        break;
      case "Client":
        navigate("/userHome");
        break;
      case "Worker":
        navigate("/workerHome");
        break;
      default:
        throw new Error("Tipo de usuario no reconocido");
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F4F4F4",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "600px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          BIENVENIDO NUEVAMENTE
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          INICIA SESIÓN PARA CONTINUAR
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TextField
            sx={{ width: "80%" }}
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ width: "80%" }}
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, width: "50%" }}
            onClick={handleLogin}
            disabled={!email || !password}
          >
            Ingresar
          </Button>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ mt: 2, width: "80%" }}
          >
            <Link
              component="button"
              variant="body2"
              onClick={handleNavigateToRegister}
            >
              Crear mi cuenta
            </Link>
            <Link variant="body2" onClick={() => alert("Servicio no disponible")}>
              He olvidado mi contraseña
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
