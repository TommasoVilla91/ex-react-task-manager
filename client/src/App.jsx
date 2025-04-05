import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalContext"
import AppLayout from "./layouts/AppLayout"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import TaskDetails from "./pages/TaskDetails"

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="create" element={<AddTask />} />
            <Route path="tasks/:id" element={<TaskDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;