import RoadMapSettings from "./RoadMapDetails";
import RoadMapItem from "./RoadMapItem";
import ToDosShow from "./ToDosShow";
import { createPortal } from "react-dom";
import { format, parse, parseISO } from "date-fns";
import { useState, useMemo } from "react";

function RoadMap({ roadmap, todos }) {
  const color = {
    0: "border-green-500",
    1: "border-yellow-500",
    2: "border-blue-500",
    3: "border-red-500",
    4: "border-orange-500",
    5: "border-purple-500",
  };

  const [isToDosOpen, setIsToDosOpen] = useState(false);
  const startObj = parseISO(roadmap.createdAt);
  const dueObj = parse(roadmap.dueDate, "yyyy-MM-dd", new Date());
  const due = format(dueObj, "EEE dd");
  const completions = useMemo(() => {
    return todos.filter(
      (todo) => !!todo.completedAt && todo.roadmap === roadmap.goal,
    );
  }, [todos]);
  const progressing = useMemo(() => {
    return todos.filter((todo) => !todo.completedAt);
  }, [todos]);
  return (
    <>
      <div
        className={`p-4 flex flex-col gap-2 rounded-xl bg-white font-semibold border-l-4 ${color[Math.floor(completions.length === 0 ? 0 : Math.ceil(completions.length / 10) - 1)] ?? color[5]}`}
      >
        <div className="flex justify-between items-center gap-2">
          <span className="text-lg">{roadmap.goal}</span>
          <RoadMapSettings setIsToDosOpen={setIsToDosOpen} />
        </div>
        <div className="flex flex-col">
          <span className="mb-1">Completions ({completions.length})</span>
          <RoadMapItem completions={completions} />
        </div>
        <span className="mt-auto text-sm inline-block text-end text-gray-500 font-medium">
          Due {due}
        </span>
      </div>
      {isToDosOpen && (
        <Portal>
          <ToDosShow
            completions={completions}
            progressing={progressing}
            startObj={startObj}
            dueObj={dueObj}
            setIsToDosOpen={setIsToDosOpen}
          />
        </Portal>
      )}
    </>
  );
}

function Portal({ children }) {
  const el = document.getElementById("portal") || document.body;
  return createPortal(children, el);
}

export default RoadMap;
