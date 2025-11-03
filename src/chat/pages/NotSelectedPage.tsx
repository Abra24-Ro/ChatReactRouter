import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const NotSelectedPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center p-6 text-neutral-700 dark:text-neutral-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-6 shadow-sm">
          <MessageSquare className="h-10 w-10 text-neutral-400" />
        </div>
        <h2 className="text-xl font-semibold">Selecciona una conversación</h2>
        <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
          Elige un chat en la barra lateral para comenzar a conversar.  
          Si aún no tienes uno, crea una nueva conversación.
        </p>
      </motion.div>
    </div>
  );
};

export default NotSelectedPage;
