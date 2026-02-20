import { useEffect } from "react";
import { X } from "lucide-react";

function RoadMapModal({
  goal,
  setGoal,
  description,
  setDescription,
  dueDate, // 💡 기한 상태값 추가
  setDueDate, // 💡 기한 상태 변경 함수 추가
  setIsRoadMapOpen,
  handleAddRoadMap,
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
        onClick={() => setIsRoadMapOpen(false)}
      >
        {/* 모달 크기를 입력 폼에 맞게 조정 (w-full max-w-lg) */}
        <div
          className="flex flex-col w-full max-w-lg max-h-[90vh] p-6 bg-slate-50 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. 모달 헤더 영역 */}
          <div className="flex-shrink-0 mb-6 border-b border-gray-200 pb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              RoadMap 추가
            </h2>
            {/* <button
              type="button" // 💡 폼 안에서 실수로 submit 되는 것 방지
              onClick={() => setIsRoadMapOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={24} />
            </button> */}
          </div>

          {/* 2. 폼 본문 영역 */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddRoadMap();
              setIsRoadMapOpen(false);
            }}
            className="flex flex-col gap-5 overflow-y-auto p-1"
          >
            {/* 목표 입력 (필수) */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="roadmap-goal"
                className="text-sm font-semibold text-slate-700"
              >
                목표 <span className="text-red-500">*</span>
              </label>
              <input
                id="roadmap-goal"
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="예: 전공 학점 A+ 받기"
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* 내용 입력 */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="roadmap-contents"
                className="text-sm font-semibold text-slate-700"
              >
                구체적인 내용 <span className="text-red-500">*</span>
              </label>
              <input
                id="roadmap-contents"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="목표 달성을 위한 구체적인 계획을 적어보세요."
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* 기한 입력 */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="roadmap-due"
                className="text-sm font-semibold text-slate-700"
              >
                마감 기한 <span className="text-red-500">*</span>
              </label>
              <input
                id="roadmap-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              />
            </div>

            {/* 3. 하단 액션 버튼 영역 */}
            <div className="mt-2 pt-5 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={() => setIsRoadMapOpen(false)}
                className="flex-1 py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-black/70 hover:bg-black text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                추가하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RoadMapModal;
