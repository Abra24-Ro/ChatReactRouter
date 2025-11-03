import {  HashRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { AuthLayout } from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/pages/LoginPage";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { Loading } from "./components/custom/Loading";
import { sleep } from "./lib/sleep";
import { PrivateRoute } from "./auth/components/PrivateRoute";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "./fake/fake-data";

// Lazy load con delay simulado
const ChatPageLazy = lazy(async () => {
  await sleep(2000);
  return import("./chat/pages/ChatPage");
});

const ChatLayoutLazy = lazy(() => import("./chat/layout/ChatLayout"));
const NotSelectedPageLazy = lazy(() => import("./chat/pages/NotSelectedPage"));

export const AppRouter = () => {
  const {
    data: user,
    isLoading,
    
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      return checkAuth(token);
    },
    retry: 0,
  });

  if (isLoading) {
    return <Loading fullscreen message="Cargando usuario..." />;
  }

 
  return (
    <HashRouter>
      <Routes>
        {/* --- Autenticación --- */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* --- Chat --- */}
        <Route
          path="/chat"
          element={
            <Suspense
              fallback={<Loading fullscreen message="Cargando chat..." />}
            >
              <PrivateRoute isAuthenticated={!!user}>
                <ChatLayoutLazy />
              </PrivateRoute>
            </Suspense>
          }
        >
          {/* Página por defecto (sin chat seleccionado) */}
          <Route
            index
            element={
              <Suspense fallback={<Loading message="Cargando..." />}>
                <NotSelectedPageLazy />
              </Suspense>
            }
          />

          {/* Página del chat seleccionado */}
          <Route
            path=":id"
            element={
              <Suspense
                fallback={<Loading message="Cargando conversación..." />}
              >
                <ChatPageLazy />
              </Suspense>
            }
          />
        </Route>

        {/* --- Rutas por defecto --- */}
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </HashRouter>
  );
};
