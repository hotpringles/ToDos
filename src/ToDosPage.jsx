import WeeklyCalendar from "./WeeklyCalendar";
import AddBox from "./AddBox";
import { format, startOfToday } from "date-fns";
import { useState, useRef, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import PrioritySelect from "./PriorityCheck";
import ToDo from "./ToDo";

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
      <span className="absolute translate-y-[1px] text-sm font-bold text-gray-700 ">
        {percent}%
      </span>
    </div>
  );
}

function ToDosPage() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [priority, setPriority] = useState("high");
  const [todos, setTodos] = useState([
    {
      id: 1,
      priority: "high",
      category: "Inbox",
      contents: "안녕",
      isCompleted: false,
    },
    {
      id: 2,
      priority: "medium",
      category: "Inbox",
      contents: "가을",
      isCompleted: false,
    },
    {
      id: 3,
      priority: "medium",
      category: "Inbox",
      contents: "여름",
      isCompleted: false,
    },
    {
      id: 4,
      priority: "high",
      category: "Inbox",
      contents: "계절",
      isCompleted: false,
    },
    {
      id: 5,
      priority: "low",
      category: "Inbox",
      contents: "눈물",
      isCompleted: false,
    },
  ]);

  // 최적화 고민 필요 (ex. useMemo로 관리하면 더 낫지 않을까?)
  const [totalCount, setTotalCount] = useState(0);
  const [highCount, setHighCount] = useState({});
  const [mediumCount, setMediumCount] = useState({});
  const [lowCount, setLowCount] = useState({});

  useEffect(() => {
    setTotalCount(0);
    todos.forEach((todo) => {
      if (todo.isCompleted) {
        setTotalCount((prev) => prev + 1);
      }
    });
  }, [todos]);

  useEffect(() => {
    setHighCount({
      each: 0,
      total: 0,
    });
    setMediumCount({
      each: 0,
      total: 0,
    });
    setLowCount({
      each: 0,
      total: 0,
    });
    todos.forEach((todo) => {
      if (todo.priority === "high") {
        setHighCount((prev) =>
          todo.isCompleted
            ? { each: prev.each + 1, total: prev.total + 1 }
            : { ...prev, total: prev.total + 1 },
        );
      } else if (todo.priority === "medium") {
        setMediumCount((prev) =>
          todo.isCompleted
            ? { each: prev.each + 1, total: prev.total + 1 }
            : { ...prev, total: prev.total + 1 },
        );
      } else {
        setLowCount((prev) =>
          todo.isCompleted
            ? { each: prev.each + 1, total: prev.total + 1 }
            : { ...prev, total: prev.total + 1 },
        );
      }
    });
  }, [todos]);

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };
  const sortedTodos = [...todos].sort((a, b) => a.isCompleted - b.isCompleted);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
      setIsAtBottom(isBottom);
    }
  };

  useEffect(() => {
    handleScroll();
  }, [todos]);

  return (
    <div className="h-screen p-8 bg-gray-100 flex flex-col">
      <div className="mb-4 flex items-center">
        <span className="text-3xl font-bold mr-2">ToDos</span>
        <span className="text-md text-gray-500">
          / {format(selectedDate, "EEEE, MMM d")}
        </span>
        <WeeklyCalendar
          selectedDate={selectedDate}
          changeDate={setSelectedDate}
        />
      </div>
      <div className="grow flex min-h-0">
        <div className="grow mr-3 bg-white border border-gray-200 rounded-2xl flex flex-col">
          <div className="p-4 border-gray-200 border-b flex justify-between items-center">
            <span className="font-bold text-md">Daily task</span>
            <span className="text-sm">View All</span>
          </div>
          {/* <div
            className="grow overflow-y-auto
            [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]
            [-webkit-mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]"
          >
            {sortedTodos.map((todo) => (
              <ToDo
                key={todo.id}
                priority={todo.priority}
                contents={todo.contents}
                category={todo.category}
                isCompleted={todo.isCompleted}
                handleToggle={() => handleToggle(todo.id)}
              />
            ))}
          </div> */}
          {/* --- [수정된 리스트 영역] --- */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={`grow overflow-y-auto pr-2 transition-all duration-500 
                  ${
                    isAtBottom
                      ? "[mask-image:none]"
                      : `[mask-image:linear-gradient(to_bottom,black_80%,transparent_100%),linear-gradient(black,black)]`
                  }
                  
                  /* 1. 왼쪽 마스크는 스크롤바 공간을 제외한 만큼(calc), 오른쪽 마스크는 딱 스크롤바만큼(12px) */
                  [mask-size:calc(100%-12px)_100%,12px_100%]
                  [-webkit-mask-size:calc(100%-12px)_100%,12px_100%]

                  /* 2. 첫 번째 마스크는 왼쪽(left)에, 두 번째 마스크는 오른쪽(right)에 배치 */
                  [mask-position:left,right]
                  [-webkit-mask-position:left,right]

                  /* 3. 마스크가 반복되지 않게 설정 */
                  [mask-repeat:no-repeat]
                  [-webkit-mask-repeat:no-repeat]
                `}
          >
            {sortedTodos.map((todo) => (
              <ToDo
                key={todo.id}
                {...todo}
                handleToggle={() => handleToggle(todo.id)}
              />
            ))}
            <div className="h-2" />
          </div>
          {/* --- [리스트 영역 끝] --- */}
          <div className="p-4">
            <div className="flex ml-2 mb-1 items-center gap-1">
              <PrioritySelect priority={priority} setPriority={setPriority} />
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />
              <CategorySelect />
            </div>
            <AddBox />
          </div>
        </div>
        <div className="w-[350px] p-4 flex flex-col gap-2 bg-white border border-gray-200 rounded-2xl">
          <div className="flex justify-around">
            <div className="flex flex-col text-center h-fit">
              <span
                className={`text-lg font-bold transition-all duration-300 ease-in-out
               ${highCount.each === 0 ? "text-red-300" : "text-red-500"}`}
              >
                High
              </span>
              <span
                className={`font-semibold transition-all duration-300 ease-in-out
               ${highCount.each === 0 ? "text-red-300" : "text-red-500"}`}
              >
                {highCount.each} / {highCount.total}
              </span>
            </div>
            <div className="flex flex-col text-center h-fit">
              <span
                className={`text-lg font-bold transition-all duration-300 ease-in-out
               ${mediumCount.each === 0 ? "text-orange-300" : "text-orange-500"}`}
              >
                Medium
              </span>
              <span
                className={`font-semibold transition-all duration-300 ease-in-out
               ${mediumCount.each === 0 ? "text-orange-300" : "text-orange-500"}`}
              >
                {mediumCount.each} / {mediumCount.total}
              </span>
            </div>
            <div
              className={`flex flex-col text-center text-lg font-semibold h-fit ${lowCount.each === 0 ? "text-yellow-200" : "text-yellow-400"}`}
            >
              <span className="transition-all duration-300 ease-in-out">
                Low
              </span>
              <span className={"transition-all duration-300 ease-in-out"}>
                {lowCount.each} / {lowCount.total}
              </span>
            </div>
          </div>
          <div className="flex gap-2 rounded-xl border border-gray-200 p-1 justify-around items-center">
            <DonutChart percent={(totalCount / todos.length) * 100} />
            <div className="flex flex-col text-right ">
              <span
                className={`text-lg font-bold transition-all duration-300 ease-in-out
               ${totalCount === 0 ? "text-gray-500" : "text-black"}`}
              >
                Ahcheivement Rate
              </span>
              <span
                className={`text-md font-semibold transition-all duration-300 ease-in-out
               ${totalCount === 0 ? "text-gray-500" : "text-black"}`}
              >
                {totalCount} / {todos.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDosPage;
