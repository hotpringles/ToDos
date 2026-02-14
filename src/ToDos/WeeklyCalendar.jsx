import React, { useMemo, useState } from "react";
import { format, addDays, startOfToday, isSameDay } from "date-fns";
import { motion } from "framer-motion";

function WeeklyCalendar({ selectedDate, changeDate }) {
  const weeklyDates = useMemo(() => {
    const today = startOfToday();
    return Array.from({ length: 7 }).map((_, i) => addDays(today, i - 3));
  }, []);

  return (
    <div className="w-[300px] grid grid-cols-7 p-1 bg-white rounded-xl border border-gray-200 ml-auto">
      {weeklyDates.map((date) => {
        const isSelected = isSameDay(selectedDate, date);
        return (
          <button
            key={date.toString()}
            onClick={() => changeDate(date)}
            className="relative flex flex-col items-center rounded-xl py-1 px-2 cursor-pointer focus:outline-none"
          >
            <span
              className={`text-xs scale-75 z-10 ${isSelected ? "text-white" : "text-gray-400"}`}
            >
              {format(date, "eee").toUpperCase()}
            </span>
            <span
              className={`text-md font-bold z-10 ${isSelected ? "text-white" : "text-gray-800"}`}
            >
              {format(date, "d")}
            </span>

            {/* 3. [시각 최적화] Framer Motion을 이용한 슬라이딩 배경 */}
            {isSelected && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-black rounded-xl shadow-md"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default WeeklyCalendar;
