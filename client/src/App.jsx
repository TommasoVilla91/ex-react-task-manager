import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<TaskList />} />
          <Route path="create" element={<AddTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;