import { createPortal } from "react-dom";
import { useState, useRef } from "react";
import { Settings2, Edit3, Trash2, Timer } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import TimeModal from "./TiimeModal";

function ToDoSettings({ todo, handleModify, handleDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  // 1. 메뉴가 나타날 위치를 계산하는 함수
  const getPosition = () => {
    if (!buttonRef.current) return {};
    const rect = buttonRef.current.getBoundingClientRect();

    return {
      // 스크롤 양을 고려한 절대 좌표 계산
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX, // 메뉴 너비에 맞춰 왼쪽으로 살짝 이동
    };
  };

  // 모달에서 저장 버튼을 눌렀을 때 실행될 함수
  const onSaveTime = (newTime) => {
    handleTimeUpdate(todo.id, newTime); // ID와 새로운 시간을 부모에게 전달
    setIsTimeModalOpen(false); // 모달 닫기
  };

  return (
    <>
      {/* 실제 할 일 리스트 안에 있는 설정 버튼 */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors cursor-pointer ${
          isOpen ? "bg-sky-100 text-sky-600" : "text-gray-400 hover:bg-gray-100"
        }`}
      >
        <Settings2 size={18} />
      </button>

      {/* 2. Portal을 사용한 메뉴 (AnimatePresence가 감싸고 있어야 함) */}
      <AnimatePresence>
        {isOpen && (
          <Portal>
            {/* 전체 화면 오버레이: 바깥 클릭 시 닫기 용도 */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            {/* 실제 애니메이션 메뉴창 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              style={{
                position: "absolute",
                zIndex: 9999,
                ...getPosition(),
              }}
              className="w-36 p-1.5 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col text-sm font-medium text-gray-600">
                <button
                  onClick={() => handleModify(todo)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-colors"
                >
                  <Edit3 size={14} /> 수정하기
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false); // 드롭다운 메뉴 닫기
                    setIsTimeModalOpen(true); // 시간 모달 열기
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-colors border-t border-gray-50"
                >
                  <Timer size={14} /> 시간 설정하기
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors border-t border-gray-50"
                >
                  <Trash2 size={14} /> 삭제하기
                </button>
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
      {/* 5. TimeModal 렌더링 (Portal 밖, 컴포넌트 최상단에 배치) */}
      {/* ✨ [핵심 수정] TimeModal도 Portal로 감싸줍니다! ✨ */}
      {isTimeModalOpen && (
        <Portal>
          <TimeModal
            isOpen={isTimeModalOpen}
            onClose={() => setIsTimeModalOpen(false)}
            onSave={(newTime) => {
              handleTimeUpdate(todo.id, newTime);
              setIsTimeModalOpen(false);
            }}
            initialTime={todo.deadline}
          />
        </Portal>
      )}
    </>
  );
}

function Portal({ children }) {
  const el = document.getElementById("portal") || document.body;
  return createPortal(children, el);
}

export default ToDoSettings;
