import { useState } from "react";
import { Reorder } from "framer-motion";

// 🔥 1. 개별 아이템을 별도의 컴포넌트로 완전히 분리합니다.
function ListItem({ item }) {
  // 🔥 2. whileDrag 대신 명확한 로컬 상태를 만듭니다.
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Item
      value={item}
      // 🔥 3. 드래그 시작/종료 시점에 맞춰 상태를 무조건 업데이트합니다.
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      // 🔥 4. isDragging 상태에 따라 애니메이션을 명시적으로 지시합니다.
      animate={{
        scale: isDragging ? 1.05 : 1,
        boxShadow: isDragging
          ? "0 5px 15px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
      // transition으로 부드럽게 돌아가도록 시간을 줍니다.
      transition={{ duration: 0.2 }}
      style={{
        padding: "16px",
        margin: "8px 0",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        cursor: isDragging ? "grabbing" : "grab",
        position: "relative",
        // 🔥 5. 드래그 중인 아이템이 다른 아이템 밑으로 숨지 않도록 zIndex 설정
        zIndex: isDragging ? 10 : 1,
      }}
    >
      {item.contents}
    </Reorder.Item>
  );
}

// 메인 페이지 컴포넌트
function MindMapPage() {
  const [items, setItems] = useState([
    { id: 1, contents: "아이템 1" },
    { id: 2, contents: "아이템 2" },
    { id: 3, contents: "아이템 3" },
    { id: 4, contents: "아이템 4" },
  ]);

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Framer Motion 리스트 (확실한 해결 버전)</h2>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        style={{ listStyleType: "none", padding: 0 }}
      >
        {/* 분리한 ListItem 컴포넌트를 매핑합니다 */}
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </Reorder.Group>
    </div>
  );
}

export default MindMapPage;
