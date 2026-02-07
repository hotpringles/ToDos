import { NavLink } from "react-router-dom";

const MENU_ITEMS = [
  { path: "/", name: "ToDos" },
  { path: "/roadmap", name: "Road Map" },
  { path: "/mindmap", name: "Mind Map" },
  { path: "/analytics", name: "Analytics" },
  { path: "/historytree", name: "History Tree" },
];

function SideBar() {
  return (
    <aside className="border-r border-gray-200 h-screen flex flex-col">
      <ul className="p-4 grow flex flex-col gap-2">
        {MENU_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              className={({ isActive }) =>
                `font-medium  cursor-pointer rounded-sm p-2 flex items-center transition-transform duration-150 active:scale-97 active:text-gray-500
               ${isActive ? "bg-gray-300 font-bold text-black" : "text-gray-500 hover:bg-gray-200 hover:text-black"}`
              }
              to={item.path}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="p-4 border-t border-gray-300 h-[120px] flex flex-col gap-2">
        <NavLink
          to="/setting"
          className={({ isActive }) =>
            `font-medium  cursor-pointer rounded-sm p-2 flex items-center transition-transform duration-150 active:scale-97 active:text-gray-500
               hover:bg-gray-200 hover:text-black"`
          }
        >
          Setting
        </NavLink>
        <button className="font-medium  cursor-pointer rounded-sm p-2 flex items-center transition-transform duration-150 active:scale-97 active:text-gray-500 hover:bg-gray-200 hover:text-black">
          LogOut
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
