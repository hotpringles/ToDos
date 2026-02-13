import { Leaf } from "lucide-react";

function CompletionCount({ completionCount }) {
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: completionCount }, (_, i) => (
        <span key={i}>
          <Leaf
            size={16}
            strokeWidth={3}
            className="scale-x-[-1] text-green-500 fill-green-200"
          />
        </span>
      ))}
    </div>
  );
}

export default CompletionCount;
