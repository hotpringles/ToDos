import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CategorySelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Inbox");
  const dropdownRef = useRef(null);

  const categories = ["Inbox", "Work", "Project", "Personal"];

  // [최적화] 외부 영역 클릭 시 닫기 로직
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 라벨 (v4 font-mono 적용) */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-black text-gray-500 tracking-tighter uppercase">
          Category
        </span>

        {/* 트리거 버튼 */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-xl text-slate-700 hover:bg-gray-100 transition-all focus:outline-none active:scale-95"
        >
          <span className="text-[12px] font-bold">{selected}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={14} className="text-slate-400" />
          </motion.div>
        </button>
      </div>

      {/* 드롭다운 메뉴 (Framer Motion 애니메이션) */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full mb-1 left-16 z-50 w-32 py-2 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/50"
          >
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setSelected(cat);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 text-[12px] font-medium text-slate-600 hover:bg-slate-50 hover:text-black hover:font-bold transition-colors"
                >
                  {cat}
                  {selected === cat && <Check size={12} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySelect;
