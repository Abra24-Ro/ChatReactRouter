import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/fake/fake-data";
import { toast } from "sonner";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Inicio de sesión exitoso ✅", {
        position: "top-center",
        duration: 2500,
      });
      navigate("/chat", { replace: true });
    },
    onError: () => {
      toast.error("Error al iniciar sesión 😕", {
        position: "top-center",
        duration: 3000,
      });
    },
  });

  const handleGoogleLogin = () => {
    // Simula un inicio de sesión rápido con Google
    loginMutation();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm md:max-w-md bg-white border border-neutral-200 rounded-2xl shadow-lg p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
            Inicia sesión en tu cuenta
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Bienvenido de nuevo, nos alegra verte 
          </p>
        </div>

        {/* Campos simulados */}
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-neutral-700">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              disabled
              className="h-11 bg-neutral-100 text-neutral-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-neutral-700">
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled
                className="h-11 bg-neutral-100 text-neutral-500 cursor-not-allowed pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Botón Google */}
        {isPending ? (
          <Button disabled className="w-full h-11">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesión...
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full h-11 rounded-lg border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
            onClick={handleGoogleLogin}
          >
            Continuar con Google
          </Button>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-neutral-500">
          ¿No tienes cuenta?{" "}
          <Link
            to="/auth/register"
            className="text-neutral-900 font-medium hover:underline underline-offset-4"
          >
            Crear una
          </Link>
        </div>
      </div>
    </div>
  );
};
