import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Tag, Clock } from "lucide-react";
import { format, parse, addMinutes } from "date-fns";
import ToDoSettings from "./ToDoSettings";

function ToDo({
  todo,
  handleToggle,
  handleModify,
  handleDelete,
  handleTimeUpdate,
}) {
  const priorityToString = {
    1: "high", // high
    2: "medium", // medium
    3: "low", // low
  };

  const priorityStyle = {
    high: "border-rose-300 bg-rose-50 text-rose-500",
    medium: "border-amber-300 bg-amber-50 text-amber-500",
    low: "border-sky-300 bg-sky-50 text-sky-500",
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const calculatedEndTime = (startTime) => {
    const startDate = parse(startTime, "HH:mm", new Date());
    const endTime = addMinutes(startDate, parseInt(todo.duration));
    return format(endTime, "HH:mm");
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", duration: 0.3, bounce: 0.4 },
    },
  };

  return (
    <div className="flex items-center gap-4 h-[90px] p-4 border-b border-gray-200">
      <button
        onClick={handleToggle}
        className={`w-6 h-6 border border-gray-200 rounded-md flex justify-center items-center ${todo.isCompleted ? "bg-gray-100" : ""}`}
      >
        {/* <AnimatePresence> */}
        {todo.isCompleted && (
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
        <div className="flex items-baseline gap-1">
          <span
            className={`mr-1 text-2xl font-semibold ${todo.isCompleted ? "line-through text-gray-400" : ""}`}
          >
            {todo.contents}
          </span>
        </div>
        <div className="flex items-center gap-1 font-semibold text-xs scale-90 origin-left">
          <span
            className={`px-2 py-1 mr-2 rounded-lg border ${priorityStyle[priorityToString[todo.priority]]}`}
          >
            {priorityToString[todo.priority]}
          </span>
          <Tag
            size={16}
            strokeWidth={1.5}
            stroke="white"
            fill="currentColor"
            className="text-gray-500"
          />
          <span className="text-gray-500">{todo.category}</span>
        </div>
      </div>
      {todo.time && todo.duration && (
        <div className="flex items-center gap-1 font-bold text-xs text-gray-500">
          <Clock size={12} />
          <span className="translate-y-[1px]">
            {todo.time} ~ {calculatedEndTime(todo.time)}
          </span>
        </div>
      )}
      <ToDoSettings
        todo={todo}
        handleModify={handleModify}
        handleDelete={handleDelete}
        handleTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}

export default ToDo;
