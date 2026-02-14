import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

const HIGH = 1;
const MEDIUM = 2;
const LOW = 3;

function PrioritySelect({ priority, setPriority }) {
  return (
    <div className="flex justify-center items-center gap-1">
      <span className="mr-2 text-xs font-black text-gray-500 tracking-tighter uppercase">
        priority
      </span>
      <button
        onClick={() => setPriority(HIGH)}
        className={`h-4 w-4 flex items-center justify-center cursor-pointer rounded-full bg-rose-500 transition-all ${priority === HIGH ? "scale-110 shadow-[0_0_10px_rgba(244,63,94,0.6)]" : "opacity-50 hover:opacity-100"}`}
      >
        <AnimatePresence>
          {priority === HIGH && (
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
        onClick={() => setPriority(MEDIUM)}
        className={`h-4 w-4 flex items-center justify-center cursor-pointer rounded-full bg-amber-500 transition-all ${priority === MEDIUM ? "scale-110 shadow-[0_0_10px_rgba(245,158,11,0.6)]" : "opacity-50 hover:opacity-100"}`}
      >
        <AnimatePresence>
          {priority === MEDIUM && (
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
        onClick={() => setPriority(LOW)}
        className={`h-4 w-4 flex items-center justify-center cursor-pointer rounded-full bg-sky-400 transition-all ${priority === LOW ? "scale-110 shadow-[0_0_10px_rgba(14,165,233,0.6)]" : "opacity-50 hover:opacity-100"}`}
      >
        <AnimatePresence>
          {priority === LOW && (
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
