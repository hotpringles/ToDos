import { useState } from "react";
import { ArrowUp } from "lucide-react";

function AddBox({ text, setText, handleAddTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTodo();
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ToDo를 추가해보세요."
        className="p-2 grow border border-gray-200 bg-gray-200 rounded-xl"
      />
      <button
        type="submit"
        className="p-2 rounded-xl cursosr-pointer bg-black text-white"
      >
        <ArrowUp size={20} strokeWidth={3} />
      </button>
    </form>
  );
}

export default AddBox;
