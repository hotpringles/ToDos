import { X } from "lucide-react";
import { format } from "date-fns";

function ToDosShow({
  completions,
  progressing,
  startObj,
  dueObj,
  setIsToDosOpen,
}) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
        <div className="flex flex-col gap-2 p-4 w-[350px] h-[400px] bg-white rounded-2xl">
          <div className="flex items-center mb-2">
            <div className="flex gap-2 items-baseline">
              <span className="text-2xl font-semibold">ToDos</span>
              <span>
                {format(startObj, "yy/MM/dd")} ~ {format(dueObj, "yy/MM/dd")}
              </span>
            </div>
            <button
              onClick={() => setIsToDosOpen(false)}
              className="ml-auto p-2 text-gray-400 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <span className="font-semibold">
                완료한 ToDos ({completions.length})
              </span>
              {completions.map((cp) => (
                <li key={cp.id}>{cp.contents}</li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <span className="font-semibold">
                진행 중인 ToDos ({progressing.length})
              </span>
              {progressing.map((pg) => (
                <li key={pg.id}>{pg.contents}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDosShow;
