import { useState } from "react";
import "./App.css";
import SideBar from "./SideBar";
import ToDosPage from "./ToDos/ToDosPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoadMapPage from "./RoadMaps/RoadMapPage";
import MindMapPage from "./MindMapPage";
import AnalyticsPage from "./AnalyticsPage";
import HistoryTreePage from "./HistoryTreePage";
import SettingPage from "./SettingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="grid transition-all duration-200 ease-in-out grid-cols-[250px_1fr] data-[state=open]:grid-cols[80px_1fr]">
        <SideBar />
        <div>
          <Routes>
            <Route path="/" element={<ToDosPage />} />
            <Route path="/roadmap" element={<RoadMapPage />} />
            <Route path="/mindmap" element={<MindMapPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/historytree" element={<HistoryTreePage />} />
            <Route path="setting" element={<SettingPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
