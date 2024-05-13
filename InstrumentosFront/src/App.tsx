import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import NavBar from "./ui/NavBar/NavBar"

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App