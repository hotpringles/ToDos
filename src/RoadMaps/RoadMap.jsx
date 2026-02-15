import RoadMapSettings from "./RoadMapDetails";
import RoadMapItem from "./RoadMapItem";
import ToDosShow from "./ToDosShow";
import { createPortal } from "react-dom";
import { parse, format } from "date-fns";
import { useState } from "react";

function RoadMap({ roadmap }) {
  const color = {
    0: "border-green-500",
    1: "border-yellow-500",
    2: "border-blue-500",
    3: "border-red-500",
    4: "border-orange-500",
    5: "border-purple-500",
  };

  const [isToDosOpen, setIsToDosOpen] = useState(false);
  const dateObj = parse(roadmap.due, "yyyy-MM-dd", new Date());
  const due = format(dateObj, "EEE dd");
  return (
    <>
      <div
        className={`p-4 flex flex-col gap-2 rounded-xl bg-white font-semibold border-l-4 ${color[Math.floor(roadmap.completionCount === 0 ? 0 : Math.ceil(roadmap.completionCount / 10) - 1)] ?? color[5]}`}
      >
        <div className="flex justify-between items-center gap-2">
          <span className="text-lg">{roadmap.goal}</span>
          <RoadMapSettings setIsToDosOpen={setIsToDosOpen} />
        </div>
        <div className="flex flex-col">
          <span className="mb-1">Completions ({roadmap.completionCount})</span>
          <RoadMapItem roadmap={roadmap} />
        </div>
        <span className="text-sm inline-block text-end text-gray-500 font-medium">
          Due {due}
        </span>
      </div>
      {isToDosOpen && (
        <Portal>
          <ToDosShow
            todos={roadmap.completions}
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
