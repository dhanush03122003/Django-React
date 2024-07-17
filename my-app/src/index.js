import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"; // Import the Home component
import Create_task from "./Create";
import GetTaskById from "./Get_one";
import TaskList from "./Get_all";
import DeleteTaskById from "./Delete";
import UpdateTask from "./Update";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} /> {/* Set Home as the default route */}
        <Route path="/task/create" element={<Create_task />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/task/:id" element={<GetTaskById />} />
        <Route path="/task/delete/:id" element={<DeleteTaskById />} />
        <Route path="/task/update/:id" element={<UpdateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
