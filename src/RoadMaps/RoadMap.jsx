import RoadMapDetails from "./RoadMapDetails";

function RoadMap({ roadmap }) {
  return (
    <div className="p-4 flex flex-col gap-2 rounded-xl bg-white">
      <div className="flex justify-between items-center gap-2">
        <span className="text-lg">{roadmap.goal}</span>
        <RoadMapDetails />
      </div>
      <div className="flex flex-col">
        <span>Completions</span>
        <span>{roadmap.completionCount} ToDos</span>
      </div>
    </div>
  );
}

export default RoadMap;
