import { motion } from "framer-motion";

export const ContactInfoSkeleton = () => {
  return (
    <div className="p-5 animate-pulse">
      {/* --- Header --- */}
      <div className="flex flex-col items-center pb-6 border-b border-gray-200 dark:border-gray-700">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4"
        />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>

      {/* --- Body --- */}
      <div className="py-5 space-y-6">
        {/* Información del contacto */}
        <div>
          <div className="h-3 w-44 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Detalles de la cuenta */}
        <div>
          <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
};
