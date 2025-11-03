import { motion } from "framer-motion";
import { UserRoundSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NoContactSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Ícono animado */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-gradient-to-tr from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 p-6 rounded-2xl mb-6 shadow-inner"
        >
          <UserRoundSearch className="h-14 w-14 text-blue-600 dark:text-blue-400" />
        </motion.div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
          Ningún contacto seleccionado
        </h2>

        {/* Subtítulo */}
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
          Elige un contacto de la lista para ver su información o comenzar una conversación.
        </p>

        {/* Botón de acción */}
        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg px-5 py-2 transition-all shadow-md hover:shadow-lg"
        >
          Ver lista de contactos
        </Button>
      </motion.div>
    </div>
  );
};
