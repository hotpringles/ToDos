import { Clover } from "lucide-react";

function CompletionCount({ completionCount }) {
  const color = {
    0: "text-green-500 fill-green-200",
    1: "text-yellow-500 fill-yellow-200",
    2: "text-blue-500 fill-blue-200",
    3: "text-red-500 fill-red-200",
    4: "text-orange-500 fill-orange-200",
    5: "text-purple-500 fill-purple-200",
  };
  return (
    <div className="flex gap-[2px]">
      {Array.from(
        {
          length:
            completionCount === 0
              ? 0
              : completionCount % 10 === 0
                ? 10
                : completionCount % 10,
        },
        (_, i) => (
          <span key={i}>
            <Clover
              size={16}
              strokeWidth={3}
              className={`scale-x-[-1] ${color[Math.floor(completionCount === 0 ? 0 : Math.ceil(completionCount / 10) - 1)] ?? color[5]}`}
            />
          </span>
        ),
      )}
    </div>
  );
}

export default CompletionCount;
