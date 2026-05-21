import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { registerUser } from "../../functions/registerFunctions";
import { ApiError, parseApiError } from "@/services/api/errorHandler";

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

type RegisterFormProps = React.ComponentProps<"div">;

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});

  const navigate = useNavigate();

  const clearFieldError = (field: RegisterField) => {
    setFieldErrors((previousErrors) => ({ ...previousErrors, [field]: undefined }));
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const localValidationErrors = validateRegisterForm(userName, phone, email, password, confirmPassword);
    if (Object.keys(localValidationErrors).length > 0) {
      setFieldErrors(localValidationErrors);
      toast.error("Corrige los campos marcados.");
      return;
    }

    try {
      setFieldErrors({});
      await registerUser(userName, phone, email, password, confirmPassword, navigate);
      toast.success("Registro exitoso. Redirigiendo al inicio de sesion...");
    } catch (err: unknown) {
      const parsedError = err instanceof ApiError ? err : parseApiError(err);
      const backendFieldErrors = mapBackendFieldErrors(parsedError.fieldErrors);
      if (Object.keys(backendFieldErrors).length > 0) {
        setFieldErrors((previousErrors) => ({ ...previousErrors, ...backendFieldErrors }));
      }
      toast.error(parsedError.message || "Error al registrarse.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crear una cuenta</CardTitle>
          <CardDescription>Llene sus datos para completar el registro.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="register-name">Nombre completo</FieldLabel>
                <Input
                  id="register-name"
                  placeholder="Juan Martinez"
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                    clearFieldError("userName");
                  }}
                  required
                />
                {fieldErrors.userName && <FieldDescription className="text-red-600">{fieldErrors.userName}</FieldDescription>}
              </Field>
              <Field>
                <FieldLabel htmlFor="register-phone">Teléfono</FieldLabel>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="9991234567"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    clearFieldError("phone");
                  }}
                  required
                />
                {fieldErrors.phone && <FieldDescription className="text-red-600">{fieldErrors.phone}</FieldDescription>}
              </Field>
              <Field>
                <FieldLabel htmlFor="register-email">Correo</FieldLabel>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearFieldError("email");
                  }}
                  required
                />
                {fieldErrors.email && <FieldDescription className="text-red-600">{fieldErrors.email}</FieldDescription>}
              </Field>
              <Field>
                <FieldLabel htmlFor="register-password">Contraseña</FieldLabel>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearFieldError("password");
                  }}
                  required
                />
                {fieldErrors.password && <FieldDescription className="text-red-600">{fieldErrors.password}</FieldDescription>}
              </Field>
              <Field>
                <FieldLabel htmlFor="register-confirm-password">Confirmar contraseña</FieldLabel>
                <Input
                  id="register-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    clearFieldError("confirmPassword");
                  }}
                  required
                />
                {fieldErrors.confirmPassword && <FieldDescription className="text-red-600">{fieldErrors.confirmPassword}</FieldDescription>}
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  Registrarse
                </Button>
                <FieldDescription className="text-center">
                  ¿Ya tiene una cuenta?{" "}
                  <Link to="/login" className="underline underline-offset-4 hover:text-foreground">
                    Iniciar sesión
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
