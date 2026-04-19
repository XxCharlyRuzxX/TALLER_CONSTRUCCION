import { LoginForm } from "./components/LoginForm/LoginForm";

function LoginScreen() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background p-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,oklch(0.97_0_0),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,oklch(0.2_0_0),transparent_55%)]" />
      <LoginForm className="w-full max-w-sm" />
    </main>
  );
}

export default LoginScreen;
