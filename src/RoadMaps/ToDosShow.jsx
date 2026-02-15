import { X } from "lucide-react";

function ToDosShow({ todos, setIsToDosOpen }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
        <div className="p-4 w-[350px] h-[400px] bg-white rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-semibold">ToDos</span>
            <button
              onClick={() => setIsToDosOpen(false)}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <li key={todo.id}>{todo.contents}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ToDosShow;
