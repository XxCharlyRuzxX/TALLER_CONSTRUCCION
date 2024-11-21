import React, { useEffect, useState } from "react";
import { Modal, Paper, Box, Typography, TextField, Button } from "@mui/material";
import { getUserById, updateUser } from "../../../../services/userService";
import { UserAccount } from "../../../../interfaces/UserAccount";

interface EditUserModalProps {
  open: boolean;
  userId: number | null;
  onClose: () => void;
  onUserUpdated: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  userId,
  onClose,
  onUserUpdated,
}) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && userId !== null) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const userData = await getUserById(userId);
          setUser(userData);
          setError(null);
        } catch (err) {
          setError("Error al cargar los datos del usuario.");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [open, userId]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      await updateUser(user.userId, {
        userName: user.userName,
        email: user.accessCredentials.email,
        phone: user.phone,
        password: user.accessCredentials.password,
      });
      setError(null);
      onUserUpdated();
      onClose();
    } catch (err) {
      setError("Error al guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper sx={{ padding: "2rem", width: "600px", borderRadius: "12px" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Editar Usuario
        </Typography>
        {loading ? (
          <Typography>Cargando datos...</Typography>
        ) : (
          <>
            <TextField
              label="Nombre"
              fullWidth
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={user.accessCredentials.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  accessCredentials: {
                    ...user.accessCredentials,
                    email: e.target.value,
                  },
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Teléfono"
              fullWidth
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              sx={{ mb: 2 }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Guardar
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default EditUserModal;
