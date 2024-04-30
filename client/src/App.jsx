import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import Dashboard from "./Pages/Dashboard.jsx"
import About from "./Pages/About.jsx"
import SignIn from "./Pages/SignIn.jsx"
import Projects from "./Pages/Projects.jsx"
import SignUp from "./Pages/SignUp.jsx"
function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/projects" element={<Projects/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App 