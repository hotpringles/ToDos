import CompletionCount from "./CompletionCount";

function RoadMapShow({ roadmaps }) {
  return (
    <div className="mb-5 border-2 border-gray-300 p-2 rounded-xl">
      <span className="inline-block text-lg font-bold mb-2">RoadMaps</span>
      <div>
        {roadmaps.map((rm, index) => (
          <div key={index} className="flex font-semibold justify-between">
            <span>{rm.goal}</span>
            <CompletionCount completionCount={rm.completionCount} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadMapShow;
