import { useState } from "react";
import { ListFilter, Plus } from "lucide-react";
import RoadMap from "./RoadMap";
import roadmap_data from "../mock_data/mock_roadmap.json";

function RoadMapPage() {
  const [roadmaps, setRoadMaps] = useState(roadmap_data);

  return (
    <div className="min-h-[100vh] p-8 bg-gray-100 flex flex-col">
      <div className="h-[58px] mb-4 flex items-center justify-between">
        <span className="text-3xl font-bold mr-2">RoadMaps</span>
        <div className="flex gap-4">
          <button className="flex gap-2 items-center py-2 px-4 bg-white border border-gray-200 rounded-2xl shadow-md">
            <ListFilter size={16} className="-translate-y-[1px]" />
            <span className="translate-y-[1px]">Filter</span>
          </button>
          <button className="flex gap-2 items-center py-2 px-4 bg-black/80 text-white rounded-2xl shadow-md">
            <Plus size={16} />
            New RoadMap
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {roadmaps.map((rm, i) => (
          <RoadMap roadmap={rm} key={i} />
        ))}
      </div>
    </div>
  );
}

export default RoadMapPage;
