import { useEffect } from "react";
import { X } from "lucide-react";
import { format, parseISO } from "date-fns"; // 💡 parseISO 추가

function ToDosModal({
  completions,
  progressing,
  startObj,
  dueObj,
  setIsToDosOpen,
}) {
  // 모달 열림 시 배경 스크롤 차단
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsToDosOpen(false)}
      >
        <div
          className="flex flex-col w-[70vw] h-[70vh] max-w-5xl p-6 bg-slate-50 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. 모달 헤더 영역 */}
          <div className="flex-shrink-0 mb-6  border-b border-gray-200 pb-4 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                ToDos
              </h2>
              <span className="text-sm font-medium text-slate-500 bg-slate-200/50 px-3 py-1 rounded-md">
                {format(startObj, "yy.MM.dd")} - {format(dueObj, "yy.MM.dd")}
              </span>
            </div>
            <button
              onClick={() => setIsToDosOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* 2. 본문 영역 */}
          <div className="grid grid-cols-2 gap-8 flex-1 min-h-0">
            {/* 왼쪽: 진행 중인 ToDos */}
            <div className="flex flex-col min-h-0">
              <div className="flex items-center gap-2 mb-4 px-1">
                <span className="font-bold text-slate-700">
                  진행 중인 ToDos
                </span>
                <span className="text-rose-400 text-sm font-semibold">
                  {progressing.length}
                </span>
              </div>
              <ul className="flex flex-col gap-3 overflow-y-auto overscroll-contain pr-2 pb-4">
                {progressing.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    진행 중인 ToDos가 없습니다.
                  </div>
                ) : (
                  progressing.map((pg) => (
                    <li
                      key={pg.id}
                      className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-2 transition-shadow hover:shadow-md"
                    >
                      {/* 💡 카테고리와 날짜 영역 */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                          {pg.category}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          {format(parseISO(pg.date), "MM.dd")}
                        </span>
                      </div>
                      {/* 할 일 내용 */}
                      <span className="text-slate-700 font-medium leading-snug">
                        {pg.contents}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* 오른쪽: 완료한 ToDos */}
            <div className="flex flex-col min-h-0">
              <div className="flex items-center gap-2 mb-4 px-1">
                <span className="font-bold text-slate-700">완료한 ToDos</span>
                <span className="text-blue-400 text-sm font-semibold">
                  {completions.length}
                </span>
              </div>
              <ul className="flex flex-col gap-3 overflow-y-auto overscroll-contain pr-2 pb-4">
                {completions.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    완료된 ToDos가 없습니다.
                  </div>
                ) : (
                  completions.map((cp) => (
                    <li
                      key={cp.id}
                      className="p-4 bg-slate-100/50 border border-slate-100 rounded-xl flex flex-col gap-2"
                    >
                      {/* 💡 카테고리와 날짜 영역 (완료된 느낌을 위해 약간 투명하게 처리) */}
                      <div className="flex justify-between items-center opacity-70">
                        <span className="text-xs font-bold px-2.5 py-1 bg-slate-200 text-slate-500 rounded-md">
                          {cp.category}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          {format(parseISO(cp.date), "MM.dd")}
                        </span>
                      </div>
                      {/* 할 일 내용 (취소선 유지) */}
                      <span className="text-slate-400 line-through decoration-slate-300 font-medium leading-snug">
                        {cp.contents}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDosModal;
