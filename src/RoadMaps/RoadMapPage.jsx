import { useState } from "react";
import { ListFilter, Plus } from "lucide-react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import RoadMap from "./RoadMap";
import RoadMapModal from "./RoadMapModal";
import roadmap_data from "../mock_data/mock_roadmap.json";
import todo_data from "../mock_data/mock_todo.json";

function RoadMapPage() {
  const [roadmaps, setRoadMaps] = useState(roadmap_data);
  const [todos, setTodos] = useState(todo_data);
  const [isRoaMapOpen, setIsRoadMapOpen] = useState(false);
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const today = format(new Date(), "yyyy-MM-dd");
  const [dueDate, setDueDate] = useState(today);
  const handleAddRoadMap = () => {
    const now = new Date().toISOString();
    setRoadMaps((prev) => [
      {
        id: uuidv4(),
        goal: goal,
        description: description,
        dueDate: dueDate,
        createdAt: now,
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-[100vh] p-8 bg-gray-100 flex flex-col">
      <div className="h-[58px] mb-4 flex items-center justify-between">
        <span className="text-3xl font-bold mr-2">RoadMaps</span>
        <div className="flex gap-4">
          <button className="flex gap-2 items-center py-2 px-4 bg-white border border-gray-200 rounded-2xl shadow-md">
            <ListFilter size={16} className="-translate-y-[1px]" />
            <span className="translate-y-[1px]">Filter</span>
          </button>
          <button
            className="flex gap-2 items-center py-2 px-4 bg-black/80 text-white rounded-2xl shadow-md"
            onClick={() => setIsRoadMapOpen(true)}
          >
            <Plus size={16} />
            New RoadMap
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {roadmaps.map((rm) => (
          <RoadMap roadmap={rm} key={rm.id} todos={todos} />
        ))}
      </div>
      <div>
        {isRoaMapOpen && (
          <RoadMapModal
            goal={goal}
            setGoal={setGoal}
            description={description}
            setDescription={setDescription}
            dueDate={dueDate}
            setDueDate={setDueDate}
            setIsRoadMapOpen={setIsRoadMapOpen}
            handleAddRoadMap={handleAddRoadMap}
          />
        )}
      </div>
    </div>
  );
}

export default RoadMapPage;
