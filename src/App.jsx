import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./Hooks/useAuthContext";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SinglePost from "./Pages/SinglePost";
import Navbar from "./Components/Navbar";
import PostCreate from "./Components/PostCreate";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />    
    </>
  );
};

function App() {
  const { user } = useAuthContext();

  return (
      <BrowserRouter>    
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route
                path="/post/:id"
                element={user ? <SinglePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={user ? <PostCreate /> : <Navigate to="/login" />}
              />
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
             
            </Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
          </Routes>       
      </BrowserRouter>   
  );
}

export default App;
