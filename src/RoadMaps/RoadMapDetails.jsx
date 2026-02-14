import { Ellipsis } from "lucide-react";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

function RoadMapDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();

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
  return (
    <>
      {/* 실제 할 일 리스트 안에 있는 설정 버튼 */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`-translate-y-[1px] p-2 rounded-lg transition-colors cursor-pointer ${
          isOpen ? "bg-sky-100 text-sky-600" : "text-gray-400 hover:bg-gray-100"
        }`}
      >
        <Ellipsis size={16} />
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
                  더 보기
                </button>
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}

function Portal({ children }) {
  const el = document.getElementById("portal") || document.body;
  return createPortal(children, el);
}

export default RoadMapDetails;
