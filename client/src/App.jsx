import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import About from "./Pages/About.jsx";
import SignIn from "./Pages/SignIn.jsx";
import Projects from "./Pages/Projects.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Header from "./Components/Header.jsx";
import FooterCom from "./Components/FooterCom.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import UpdatePost from "./Pages/UpdatePost.jsx";
import PostPage from "./Pages/PostPage";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Search from "./Pages/Search.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path='/search' element={<Search />} />
          <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          </Route>     
          <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>     
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
        </Routes>
        <FooterCom />
      </BrowserRouter>
    </>
  );
}

export default App;
