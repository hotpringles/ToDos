import WeeklyCalendar from "./WeeklyCalendar";
import AddBox from "./AddBox";
import { format, startOfToday } from "date-fns";
import { useState } from "react";
import CategorySelect from "./CategorySelect";

function DonutChart({ percent, color = "text-blue-400" }) {
  // [수학 공식 파트]
  const radius = 40; // 1. 반지름 설정 (크기 결정)
  const circumference = 2 * Math.PI * radius; // 2. 원의 둘레 공식 (2πr)

  // 3. 보여줄 길이 계산
  // 전체 둘레에서 (퍼센트만큼의 길이)를 뺀 나머지 공간을 계산합니다.
  // 이 '남은 공간'만큼 그래프를 뒤로 밀어버리는 원리입니다.
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-[56px] h-[56px] flex items-center justify-center">
      {/* viewBox="0 0 100 100": 
         가로 100, 세로 100이라는 가상의 모눈종이를 만듭니다.
         transform -rotate-90:
         SVG 원은 원래 3시 방향(오른쪽)부터 그려집니다. 
         이걸 12시 방향(위쪽)부터 시작하게 하려고 90도 반시계로 돌립니다.
      */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* [배경 원]: 회색 트랙 (항상 100% 그려져 있음) */}
        <circle
          cx="50"
          cy="50" // 중심점 (50, 50)
          r={radius} // 반지름 (40)
          fill="transparent" // 안쪽 색 채우기 없음 (도넛 모양)
          stroke="#e5e7eb" // 테두리 색 (Tailwind gray-200)
          strokeWidth="10" // 테두리 두께
        />

        {/* [진행 원]: 파란색 그래프 (퍼센트만큼만 그려짐) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          className={color} // Tailwind 색상 적용 (예: text-blue-500)
          stroke="currentColor" // 현재 텍스트 색상(className)을 따라감
          strokeWidth="10"
          /* 여기가 핵심 마법! */
          strokeDasharray={circumference} // 점선 하나 길이를 원 전체 둘레로 잡음
          strokeDashoffset={offset} // 계산된 만큼 뒤로 당겨서 숨김
          strokeLinecap="round" // 선의 끝부분을 둥글게 처리
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }} // 애니메이션
        />
      </svg>

      {/* 중앙 텍스트 (absolute로 띄워서 가운데 배치) */}
      <span className="absolute text-md font-bold text-gray-700">
        {percent}%
      </span>
    </div>
  );
}

function ToDosPage() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [priority, setPriority] = useState("high");

  return (
    <div className="h-screen p-8 bg-gray-100 flex flex-col">
      <div className="mb-4 font-mono flex items-center">
        <span className="text-3xl font-bold mr-2">ToDos</span>
        <span className="text-md text-gray-500">
          / {format(selectedDate, "EEEE, MMM d")}
        </span>
        <WeeklyCalendar
          selectedDate={selectedDate}
          changeDate={setSelectedDate}
        />
      </div>

      <div className="mb-4 font-mono font-bold bg-white border border-gray-200 rounded-2xl flex justify-center items-centers">
        <div className="m-4 w-fit flex gap-1">
          <DonutChart percent={80} />
          <div className="w-fit flex flex-col text-right">
            <span className="text-md text-gray-500">Achievement</span>
            <span className="text-2xl">8/12</span>
          </div>
        </div>
        <div className="my-4 grow flex items-center border-l border-gray-200 px-4">
          <span className="text-gray-500 mr-3">Road List</span>
          <div>안녕</div>
        </div>
      </div>
      <div className="grow flex">
        <div className="grow mr-3 bg-white border border-gray-200 rounded-2xl flex flex-col">
          <div className="p-4 font-mono border-gray-200 border-b flex justify-between items-center">
            <span className="font-bold text-md">Daily task</span>
            <span className="text-sm">View All</span>
          </div>
          <div className="p-4">안녕</div>
        </div>
        <div className="w-[350px] p-4 bg-white border border-gray-200 rounded-2xl">
          <div className="flex ml-2 mb-1 items-center gap-1">
            <span className="mr-2 text-sm text-gray-500">Priority</span>
            <button
              onClick={() => setPriority("high")}
              className="h-4 w-4 cursor-pointer rounded-full bg-red-500"
            />
            <button
              onClick={() => setPriority("medium")}
              className="h-4 w-4 cursor-pointer rounded-full bg-orange-500"
            />
            <button
              onClick={() => setPriority("low")}
              className="h-4 w-4 cursor-pointer rounded-full bg-yellow-400"
            />
            <div className="w-[1px] bg-gray-300"></div>
            <CategorySelect />
          </div>
          <AddBox />
        </div>
      </div>
    </div>
  );
}

export default ToDosPage;
