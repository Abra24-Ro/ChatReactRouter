import NotSelectedPage from "@/chat/pages/NotSelectedPage";

import { getClient } from "@/fake/fake-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { ContactInfoSkeleton } from "./ContactInfoSkeleton";
import { ContactInfo } from "./ContactInfo";

export const ContactDetails = () => {
    const { id } = useParams();
    const { data: cliente, isLoading, isError } = useQuery({
      queryKey: ["cliente", id],
      queryFn: () => getClient(id ?? ""),
      enabled: !!id,
      retry: false, // No reintentar si falla
    });
  
    console.log({ id, cliente, isLoading, isError });
  
    // Si no hay ID, mostrar NotSelectedPage
    if (!id) return <NotSelectedPage />;
  
    // Si está cargando, mostrar skeleton
    if (isLoading) return <ContactInfoSkeleton />;
  
    // Si hay error o no hay cliente, mostrar error
    if (isError || !cliente) {
      return (
        <div className="flex items-center justify-center h-full">
          Cliente no encontrado
        </div>
      );
    }
  
    // Mostrar el cliente
    return <ContactInfo client={cliente} />;
  };