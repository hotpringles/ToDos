import WeeklyCalendar from "./WeeklyCalendar";
import AddBox from "./AddBox";
import { format, startOfToday, compareDesc } from "date-fns";
import { useState, useRef, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import CategorySelect from "./CategorySelect";
import RoadMapSelect from "./RoadMapSelect";
import PrioritySelect from "./PriorityCheck";
import ToDo from "./ToDo";
import DonutChart from "./DonutChart";
import Calendar from "./Calendar";
import RoadMapShow from "./RoadMapShow";
import todo_data from "../mock_data/mock_todo.json";
import roadmap_data from "../mock_data/mock_roadmap.json";

const HIGH = 1;
const MEDIUM = 2;
const LOW = 3;

function ToDosPage() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [priority, setPriority] = useState(HIGH);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(todo_data);

  const [categories, setCategories] = useState([
    "학업",
    "과제",
    "프로젝트",
    "운동",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [roadmaps, setRoadMaps] = useState(roadmap_data);
  const goals = roadmaps.map((rm) => rm.goal);
  const [selectedRoadMap, setSelectedRoadMap] = useState(null);

  const [edittingTodo, setEdittingTodo] = useState(null);

  // 최적화 고민 필요 (ex. useMemo로 관리하면 더 낫지 않을까?)
  const [totalCount, setTotalCount] = useState(0);
  const [highCount, setHighCount] = useState({});
  const [mediumCount, setMediumCount] = useState({});
  const [lowCount, setLowCount] = useState({});

  useEffect(() => {
    setTotalCount(0);
    sortedTodos.forEach((todo) => {
      if (!!todo.completedAt) {
        setTotalCount((prev) => prev + 1);
      }
    });
  }, [todos, selectedDate]);

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
    sortedTodos.forEach((todo) => {
      if (todo.priority === HIGH) {
        setHighCount((prev) =>
          !!todo.completedAt
            ? { each: prev.each + 1, total: prev.total + 1 }
            : { ...prev, total: prev.total + 1 },
        );
      } else if (todo.priority === MEDIUM) {
        setMediumCount((prev) =>
          !!todo.completedAt
            ? { each: prev.each + 1, total: prev.total + 1 }
            : { ...prev, total: prev.total + 1 },
        );
      } else {
        setLowCount((prev) =>
          !!todo.completedAt
            ? { each: prev.each + 1, total: prev.total + 1 }
            : { ...prev, total: prev.total + 1 },
        );
      }
    });
  }, [todos, selectedDate]);

  const handleToggle = (id) => {
    const now = new Date().toISOString();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? !todo.completedAt
            ? { ...todo, completedAt: now }
            : { ...todo, completedAt: null }
          : todo,
      ),
    );
  };
  const sortedTodos = useMemo(() => {
    if (!todos) return [];

    const todosTemp = todos.filter(
      (item) => item.date === format(selectedDate, "yyyy-MM-dd"),
    );
    return [...todosTemp].sort((a, b) => {
      return (
        !!a.completedAt - !!b.completedAt ||
        a.priority - b.priority ||
        compareDesc(new Date(a.updatedAt), new Date(b.updatedAt))
      );
    });
  }, [todos, selectedDate]);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
      setIsAtBottom(isBottom);
    }
  };

  const handleModifyTodo = (todo) => {
    setEdittingTodo(todo);
    console.log(todo);
    setPriority(todo.priority);
    setText(todo.contents);
    setSelectedCategory(todo.category);
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTimeUpdate = (id, newTime, duration) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id == id ? { ...todo, time: newTime, duration: duration } : todo,
      ),
    );
  };

  useEffect(() => {
    handleScroll();
  }, [todos]);

  const handleAddTodo = () => {
    const now = new Date().toISOString();
    if (!edittingTodo) {
      setTodos((prev) => [
        ...prev,
        {
          id: uuidv4(),
          priority: priority,
          category: selectedCategory,
          contents: text,
          date: selectedDate,
          createdAt: now,
          updatedAt: now,
          completedAt: null,
          time: null,
          duration: null,
          roadmap: selectedRoadMap,
        },
      ]);
    } else {
      setTodos((prev) => [
        ...prev,
        {
          id: edittingTodo.id,
          priority: priority,
          category: selectedCategory,
          contents: text,
          date: edittingTodo.date,
          createdAt: edittingTodo.createdAt,
          updatedAt: now,
          completedAt: edittingTodo.completedAt,
          time: edittingTodo.time,
          duration: edittingTodo.duration,
        },
      ]);
    }

    setEdittingTodo(null);
  };

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
        <div className="grow mr-3 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col">
          <div className="p-4 border-gray-200 border-b flex items-center">
            <span className="font-bold text-md">Daily task</span>
          </div>

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
                todo={todo}
                handleToggle={() => handleToggle(todo.id)}
                handleModify={handleModifyTodo}
                handleDelete={handleDeleteTodo}
                handleTimeUpdate={handleTimeUpdate}
              />
            ))}
            <div className="h-2" />
          </div>
          {/* --- [리스트 영역 끝] --- */}
          <div className="p-4">
            <div className="flex ml-2 mb-1 items-center gap-1">
              <PrioritySelect priority={priority} setPriority={setPriority} />
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />
              <CategorySelect
                categories={categories}
                setCategories={setCategories}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
              />
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />
              <RoadMapSelect
                roadmaps={goals}
                setRoadMaps={setRoadMaps}
                selected={selectedRoadMap}
                setSelected={setSelectedRoadMap}
              />
            </div>
            <AddBox
              text={text}
              setText={setText}
              handleAddTodo={handleAddTodo}
            />
          </div>
        </div>
        <div className="w-[300px] flex flex-col gap-3">
          {/* <Calendar todos={todos} selectedDate={selectedDate} /> */}
          <RoadMapShow roadmaps={roadmaps} todos={todos} />
          <div
            className={`h-fit flex flex-col gap-2 rounded-xl border border-gray-200 shadow-md p-4 bg-white ${totalCount === 0 ? "text-gray-400" : "text-black"}`}
          >
            <div className="flex items-center justify-between">
              <DonutChart percent={(totalCount / todos.length) * 100} />
              <div className="flex flex-col text-right">
                <span className="text-sm font-semibold transition-all duration-300 ease-in-out">
                  Achievement Rate
                </span>
                <span className="text-md font-semibold transition-all duration-300 ease-in-out">
                  <span className="text-3xl">{totalCount}</span> /{" "}
                  {sortedTodos.length}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`grow flex flex-col justify-between items-center h-fit p-3 rounded-xl gap-2 ${highCount.each === 0 ? "text-rose-300" : "ring-2 ring-rose-400/50 text-rose-500 bg-rose-50"}`}
              >
                <span className="text-sm font-semibold transition-all duration-300 ease-in-out">
                  High
                </span>
                <span
                  className={
                    "font-semibold transition-all duration-300 ease-in-out"
                  }
                >
                  {highCount.each} / {highCount.total}
                </span>
              </div>
              <div
                className={`grow flex flex-col justify-between items-center h-fit p-3 rounded-xl gap-2 ${mediumCount.each === 0 ? "text-amber-300" : "ring-2 ring-amber-400/50 text-amber-500 bg-amber-50"}`}
              >
                <span className="text-sm font-bold transition-all duration-300 ease-in-out">
                  Medium
                </span>
                <span
                  className={
                    "font-semibold transition-all duration-300 ease-in-out"
                  }
                >
                  {mediumCount.each} / {mediumCount.total}
                </span>
              </div>
              <div
                className={`grow flex flex-col justify-between items-center h-fit p-3 rounded-xl gap-2 ${lowCount.each === 0 ? "text-sky-200" : "ring-2 ring-sky-400/50 text-sky-400 bg-sky-50"}`}
              >
                <span className="text-sm font-bold transition-all duration-300 ease-in-out">
                  Low
                </span>
                <span
                  className={
                    "font-semibold transition-all duration-300 ease-in-out"
                  }
                >
                  {lowCount.each} / {lowCount.total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDosPage;
