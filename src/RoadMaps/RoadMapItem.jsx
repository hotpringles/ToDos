import { useState } from "react";
import { Ellipsis, Clover } from "lucide-react";

function RoadMapItem({ completions }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const LIMIT = 3;

  // 펼쳐져 있으면 전체, 아니면 4개만
  const visibleItems = isExpanded ? completions : completions.slice(0, LIMIT);

  const remainingCount = completions.length - LIMIT;

  return (
    <ul className="flex flex-col gap-1">
      {visibleItems.map((todo) => (
        <li key={todo.id} className="flex gap-1 items-center">
          <Clover
            size={14}
            strokeWidth={2.5}
            className="-translate-y-[2px] text-green-500 fill-green-200"
          />
          {todo.contents}
        </li>
      ))}
      {remainingCount > 0 && <Ellipsis size={16} />}
    </ul>
  );
}

export default RoadMapItem;
