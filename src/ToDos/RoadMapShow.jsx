import CompletionCount from "./CompletionCount";

function RoadMapShow({ roadmaps, todos }) {
  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-md bg-white">
      <span className="inline-block text-lg font-bold mb-2">RoadMaps</span>
      <div className="flex flex-col gap-2">
        {roadmaps.map((rm) => {
          let completionCount = 0;
          todos.forEach((todo) => {
            if (!!todo.completedAt && todo.roadmap === rm.goal)
              completionCount++;
          });

          return (
            <div
              key={rm.id}
              className="flex flex-col font-semibold justify-between"
            >
              <span>
                {rm.goal} ({completionCount})
              </span>
              <CompletionCount completionCount={completionCount} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoadMapShow;
