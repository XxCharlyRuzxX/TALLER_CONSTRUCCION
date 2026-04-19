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

type RegisterFormProps = React.ComponentProps<"div">;

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await registerUser(userName, phone, email, password, confirmPassword, navigate);
      toast.success("Registro exitoso. Redirigiendo al inicio de sesion...");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Error al registrarse.");
        return;
      }
      toast.error("Error al registrarse.");
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
                  onChange={(event) => setUserName(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="register-phone">Teléfono</FieldLabel>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="9991234567"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="register-email">Correo</FieldLabel>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="register-password">Contraseña</FieldLabel>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="register-confirm-password">Confirmar contraseña</FieldLabel>
                <Input
                  id="register-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
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
