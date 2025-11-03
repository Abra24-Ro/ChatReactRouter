import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Menu,
  Search,
  Phone,
  Video,
  MoreVertical,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { ContactList } from "../components/ContactList";

import { ContactDetails } from "../components/contact-details/ContactDetails";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { checkAuth } from "@/fake/fake-data";

const ChatLayout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    toast.success("Sesión cerrada correctamente", {
      position: "top-center",
      duration: 2500,
    });
    navigate("/auth", { replace: true });
  };

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      return checkAuth(token ?? "");
    },
  });

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 h-full md:h-auto md:flex md:flex-col w-64 border-r border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <span className="font-semibold text-[15px] text-gray-900 tracking-tight">
            {user?.name}
          </span>
          <button
            className="md:hidden text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar contactos..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Contact list */}
        <div className="flex-1 overflow-y-auto">
          <ContactList />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <button
            onClick={onLogout}
            className="cursor-pointer w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col md:ml-0">
        {/* Header */}
        <header className="h-14 border-b border-gray-200 px-5 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-600 hover:text-gray-900 -ml-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-[11px] font-semibold">
                G5
              </div>
              <div>
                <p className="text-[15px] font-semibold text-gray-900">
                  G5 Customer{" "}
                </p>
                <p className="text-[11px] text-gray-500">Active now</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
              <Phone size={16} />
            </button>
            <button className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
              <Video size={16} />
            </button>
            <button className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          <Outlet />
        </div>
      </main>

      {/* Right Panel */}
      <aside className="hidden xl:flex flex-col w-80 border-l border-gray-200 bg-white">
        <div className="h-14 border-b border-gray-200 px-5 flex items-center">
          <h2 className="text-[15px] font-semibold text-gray-900">
            Información del Contacto
          </h2>
        </div>
        <ScrollArea className="flex-1">
          <ContactDetails />
        </ScrollArea>
      </aside>
    </div>
  );
};

export default ChatLayout;
