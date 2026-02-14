import CompletionCount from "./CompletionCount";

function RoadMapShow({ roadmaps }) {
  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-md bg-white">
      <span className="inline-block text-lg font-bold mb-2">RoadMaps</span>
      <div className="flex flex-col gap-2">
        {roadmaps.map((rm, index) => (
          <div
            key={index}
            className="flex flex-col font-semibold justify-between"
          >
            <span>
              {rm.goal} ({rm.completionCount})
            </span>
            <CompletionCount completionCount={rm.completionCount} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadMapShow;
