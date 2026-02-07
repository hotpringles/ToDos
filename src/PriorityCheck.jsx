import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

function PrioritySelect({ priority, setPriority }) {
  return (
    <div className="flex justify-center items-center gap-1">
      <span className="mr-2 text-xs font-black text-gray-500 tracking-tighter uppercase">
        priority
      </span>
      <button
        onClick={() => setPriority("high")}
        className={`h-4 w-4 flex items-center justify-center cursor-pointer rounded-full bg-red-500 transition-all ${priority === "high" ? "scale-110 shadow-[0_0_10px_rgba(239,68,68,0.6)]" : "opacity-50 hover:opacity-100"}`}
      >
        <AnimatePresence>
          {priority === "high" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* 체크 아이콘: 배경색에 따라 흰색으로 표시 */}
              <Check size={11} className="text-white" strokeWidth={4} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <button
        onClick={() => setPriority("medium")}
        className={`h-4 w-4 flex items-center justify-center cursor-pointer rounded-full bg-orange-500 transition-all ${priority === "medium" ? "scale-110 shadow-[0_0_8px_rgba(249,115,22,0.6)]" : "opacity-50 hover:opacity-100"}`}
      >
        <AnimatePresence>
          {priority === "medium" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* 체크 아이콘: 배경색에 따라 흰색으로 표시 */}
              <Check size={11} className="text-white" strokeWidth={4} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <button
        onClick={() => setPriority("low")}
        className={`h-4 w-4 flex items-center justify-center cursor-pointer rounded-full bg-yellow-400 transition-all ${priority === "low" ? "scale-110 shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "opacity-50 hover:opacity-100"}`}
      >
        <AnimatePresence>
          {priority === "low" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* 체크 아이콘: 배경색에 따라 흰색으로 표시 */}
              <Check size={11} className="text-white" strokeWidth={4} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

export default PrioritySelect;
