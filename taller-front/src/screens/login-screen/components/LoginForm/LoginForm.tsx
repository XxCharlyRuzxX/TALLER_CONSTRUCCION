import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
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
import { toast } from "sonner";

import { authenticateUser, handleUserRedirection } from "../../functions/loginFunctions";

type LoginFormProps = React.ComponentProps<"div">;

export function LoginForm({ className, ...props }: LoginFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const user = await authenticateUser(email, password);
			await handleUserRedirection(user, navigate);
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(err.message || "Error en el inicio de sesion");
				return;
			}
			toast.error("Error en el inicio de sesion");
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Iniciar sesión</CardTitle>
					<CardDescription>
						Ingrese su correo electrónico para iniciar sesión en su cuenta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Correo</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="correo@ejemplo.com"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									required
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Contraseña</FieldLabel>
									<button
										type="button"
										onClick={() => toast.info("Servicio no disponible")}
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										¿Olvidaste tu contraseña?
									</button>
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
								/>
							</Field>
							<Field>
								<Button type="submit" className="w-full">
									Iniciar sesión
								</Button>
								<FieldDescription className="text-center">
									¿No tiene una cuenta?{" "}
									<Link to="/register" className="underline underline-offset-4 hover:text-foreground">
										Registrarse
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
