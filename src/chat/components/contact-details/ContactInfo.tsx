import type { Client } from "@/chat/interfaces/chat.interface";
import { Button } from "@/components/ui/button";

interface Props {
  client:Client
}

export const ContactInfo = ({client}:Props) => {

  return (
    <div className="p-5">
      <div className="flex flex-col items-center pb-6 border-b border-gray-200">
        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-2xl font-bold mb-4">
          {client.name.charAt(0).toUpperCase()}
        </div>
        <h3 className="font-semibold text-[17px] text-gray-900 mb-1">
          {client.name}
        </h3>
        <p className="text-[13px] text-gray-600 mb-2">{client.currentPlan.toUpperCase()}</p>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
          <span className="text-[11px] text-gray-500">Active now</span>
        </div>
      </div>

      <div className="py-5 space-y-5">
        <div>
          <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Información del Contacto
          </h4>
          <div className="space-y-2.5 text-[13px]">
            <div className="flex justify-between">
              <span className="text-gray-500">Correo</span>
              <span className="text-gray-900 font-medium">{client.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Telefono</span>
              <span className="text-gray-900 font-medium">{client.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ID</span>
              <span className="text-gray-900 font-medium">{client.id}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Detalles de la Cuenta
          </h4>
          <div className="space-y-2.5 text-[13px]">
            <div className="flex justify-between">
              <span className="text-gray-500">Plan</span>
              <span className="text-gray-900 font-semibold">{client.currentPlan.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Miembro desde</span>
              <span className="text-gray-900 font-medium">{client.memberSince.toDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Ultima factura</span>
              <span className="text-gray-900 font-semibold">${client.currentPlan.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-200">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-medium h-10 rounded-lg shadow-sm transition-colors">
          Ver Perfil
        </Button>
      </div>
    </div>
  );
};
