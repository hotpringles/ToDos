import React, { useState, useRef, useEffect, memo } from "react";
import { ChevronDown, Check, Plus, X, GripVertical } from "lucide-react";
import {
  motion,
  AnimatePresence,
  Reorder,
  useDragControls,
} from "framer-motion";

const CategorySelect = ({
  categories,
  setCategories,
  selected,
  setSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isAnyDragging, setIsAnyDragging] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addCategory = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setInputValue("");
    }
  };

  const deleteCategory = (e, targetCat) => {
    e.stopPropagation();
    if (categories.length <= 1) return;
    const updated = categories.filter((cat) => cat !== targetCat);
    setCategories(updated);
    if (selected === targetCat) setSelected(updated[0]);
  };

  // 드래그 & 드롭 수정 필요
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-3">
        <span className="text-xs font-black text-gray-500 tracking-tighter uppercase">
          Category
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-xl text-slate-700 hover:bg-gray-100 transition-all active:scale-95"
        >
          <span className="text-[12px] font-bold">{selected}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronDown size={14} className="text-slate-400" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 left-12 z-50 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 flex flex-col overflow-hidden"
          >
            <Reorder.Group
              axis="y"
              values={categories}
              onReorder={setCategories}
              layoutScroll
              className="max-h-56 overflow-y-auto custom-scrollbar p-1.5"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {categories.map((cat) => (
                  <CategoryItem
                    key={cat}
                    cat={cat}
                    selected={selected}
                    setSelected={setSelected}
                    setIsOpen={setIsOpen}
                    deleteCategory={deleteCategory}
                    isAnyDragging={isAnyDragging}
                    setIsAnyDragging={setIsAnyDragging}
                  />
                ))}
              </AnimatePresence>
            </Reorder.Group>

            <div className="border-t border-gray-50 p-2 bg-white z-10">
              <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-50 rounded-xl border border-transparent focus-within:border-blue-100 focus-within:bg-blue-50/30 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCategory()}
                  placeholder="새 카테고리..."
                  className="w-full bg-transparent text-[11px] outline-none placeholder:text-gray-400 font-medium text-slate-700"
                />
                <button
                  onClick={addCategory}
                  className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
                >
                  <Plus size={12} className="text-gray-500" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- [개별 아이템 컴포넌트] ---
const CategoryItem = memo(
  ({
    cat,
    selected,
    setSelected,
    setIsOpen,
    deleteCategory,
    isAnyDragging,
    setIsAnyDragging,
  }) => {
    const controls = useDragControls();
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // [수정된 로직]
    // 1. showDeleteButton: 호버 중이고 + 드래그 상황이 아닐 때
    const showDeleteButton = isHovered && !isDragging && !isAnyDragging;

    // 2. showCheckMark: 선택된 항목이고 + 드래그 상황이 아닐 때 (여기가 추가됨!)
    const showCheckMark = selected === cat && !isDragging && !isAnyDragging;

    return (
      <Reorder.Item
        value={cat}
        dragListener={false}
        dragControls={controls}
        layout="position"
        onDragStart={() => {
          setIsDragging(true);
          setIsAnyDragging(true);
          setIsHovered(false);
        }}
        onDragEnd={() => {
          setIsDragging(false);
          setIsAnyDragging(false);
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          zIndex: isDragging ? 9999 : 0,
        }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
        transition={{
          layout: { type: "spring", stiffness: 500, damping: 40, mass: 1 },
        }}
        className="relative mb-1 select-none"
      >
        <motion.div
          onPointerEnter={() => !isAnyDragging && setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          animate={{
            backgroundColor:
              selected === cat
                ? "#eff6ff"
                : isDragging || (isHovered && !isAnyDragging)
                  ? "#f9fafb"
                  : "#ffffff",
            scale: isDragging ? 1.05 : 1,
            boxShadow: isDragging
              ? "0px 10px 25px rgba(0,0,0,0.15)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.2 }}
          className={`group flex items-stretch w-full text-[12px] font-medium text-slate-600 rounded-xl overflow-hidden
          ${isDragging ? "ring-1 ring-blue-100" : ""}
        `}
        >
          <div
            className="flex items-center px-2.5 cursor-grab active:cursor-grabbing touch-none"
            onPointerDown={(e) => controls.start(e)}
          >
            <GripVertical
              size={13}
              className={`transition-colors ${
                isDragging
                  ? "text-blue-500"
                  : "text-gray-300 group-hover:text-gray-400"
              }`}
            />
          </div>

          <button
            onClick={() => {
              if (!isAnyDragging) {
                setSelected(cat);
                setIsOpen(false);
              }
            }}
            className="flex-1 flex items-center py-2.5 text-left"
          >
            <span
              className={`truncate transition-all ${
                selected === cat
                  ? "font-bold text-slate-800"
                  : "font-medium text-slate-500 group-hover:text-slate-700"
              }`}
            >
              {cat}
            </span>
          </button>

          <div className="flex items-center justify-center w-9 pr-2">
            {/* AnimatePresence로 조건이 바뀔 때 부드럽게 사라지고 나타나게 처리 */}
            <AnimatePresence mode="wait" initial={false}>
              {showDeleteButton ? (
                // [X 표시]
                <motion.button
                  key="delete"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.1 }}
                  onClick={(e) => deleteCategory(e, cat)}
                  className="p-1.5 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors"
                >
                  <X size={12} />
                </motion.button>
              ) : showCheckMark ? (
                // [체크 표시] - 이제 드래그 중(isAnyDragging)이면 조건이 false가 되어 사라짐
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.1 }}
                >
                  <Check size={12} strokeWidth={3} className="text-blue-500" />
                </motion.div>
              ) : null}
              {/* 드래그 중일 땐 둘 다 false가 되어 아무것도 렌더링되지 않음 */}
            </AnimatePresence>
          </div>
        </motion.div>
      </Reorder.Item>
    );
  },
);

export default CategorySelect;
