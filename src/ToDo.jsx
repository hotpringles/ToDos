import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

function ToDo({ priority, category, contents, isCompleted, handleToggle }) {
  const priorityStyle = {
    high: "border-red-300 bg-red-50 text-red-500",
    medium: "border-orange-300 bg-orange-50 text-orange-500",
    low: "border-yellow-300 bg-yellow-50 text-yellow-500",
  };
  return (
    <div className="flex items-center gap-4 h-[90px] p-4 border-b border-gray-200">
      <button
        onClick={handleToggle}
        className={`w-6 h-6 border border-gray-200 rounded-md flex justify-center items-center ${isCompleted ? "bg-gray-100" : ""}`}
      >
        {/* <AnimatePresence> */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            // exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check size={15} strokeWidth={4} />
          </motion.div>
        )}
        {/* </AnimatePresence> */}
      </button>
      <div className="grow flex flex-col">
        <span
          className={`text-2xl font-semibold ${isCompleted ? "line-through text-gray-400" : ""}`}
        >
          {contents}
        </span>
        <div className="flex items-center gap-2 text-xs scale-90 origin-left">
          <span
            className={`px-2 py-1 rounded-lg border ${priorityStyle[priority]}`}
          >
            {priority}
          </span>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
