import { Loader2 } from "lucide-react";
import type { FC } from "react";

interface LoadingProps {
  fullscreen?: boolean;
  message?: string;
  size?: "sm" | "md" | "lg";
}

export const Loading: FC<LoadingProps> = ({
  fullscreen = false,
  message = "Cargando...",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerClass = fullscreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center py-10";

  return (
    <div className={containerClass}>
      <Loader2
        className={`animate-spin text-neutral-800 ${sizeClasses[size]}`}
        strokeWidth={2}
      />
      {message && (
        <p className="mt-3 text-sm text-neutral-600 font-medium">{message}</p>
      )}
    </div>
  );
};
