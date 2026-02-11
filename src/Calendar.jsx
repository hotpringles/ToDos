import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Calendar({ todos = [], selectedDate, onDateClick }) {
  // 현재 달력에 보여줄 '월' 상태 (초기값: 오늘 날짜)
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 1. 달력 날짜 계산 (Date 객체 기반)
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // 2. 월 이동 핸들러
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* 헤더: 년월 및 이동 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentMonth, "yyyy년 M월")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-2">
        {weeks.map((day, idx) => (
          <div
            key={day}
            className={`text-center text-sm font-medium ${idx === 0 ? "text-red-500" : "text-gray-500"}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-2">
        {calendarDays.map((day) => {
          // Todo 데이터 비교를 위한 문자열 키 (보통 DB에는 문자열로 저장되므로)
          const dateKey = format(day, "yyyy-MM-dd");

          // 1. 할 일 체크 (todos 배열이 없어도 에러 안 나게 안전하게 처리)
          // todos 배열의 날짜 형식이 "yyyy-MM-dd" 문자열이라고 가정
          const hasTodo = todos.some((todo) => todo.date === dateKey);

          // 2. 선택된 날짜 체크 (핵심 수정 사항 ⭐)
          // selectedDate가 Date 객체이므로 parse 없이 바로 비교 가능
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          // 3. 이번 달 여부 및 오늘 날짜 체크
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isTodayDate = isToday(day);

          return (
            <div
              key={day.toString()}
              // 클릭 시 Date 객체 그대로 전달 (부모가 Date 객체를 원하므로)
              onClick={() => onDateClick(day)}
              className="flex flex-col items-center justify-start py-2 cursor-pointer relative group"
            >
              <div
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all
                  ${
                    isSelected
                      ? "bg-black text-white shadow-md scale-105" // 선택됨
                      : isTodayDate
                        ? "bg-blue-100 text-blue-600 font-bold" // 오늘
                        : "hover:bg-gray-100 text-gray-700" // 평소
                  }
                  ${!isCurrentMonth && !isSelected ? "text-gray-300" : ""}
                `}
              >
                {format(day, "d")}
              </div>

              {/* 할 일 인디케이터 (점) */}
              {hasTodo && (
                <div
                  className={`
                  absolute bottom-1 w-1 h-1 rounded-full 
                  ${isSelected ? "bg-white" : "bg-blue-500"}
                `}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
