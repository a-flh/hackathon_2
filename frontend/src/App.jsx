import React from "react";
import { Routes, Route } from "react-router-dom";
import Page404 from "@pages/Page404";
import CreateProject from "@pages/CreateProject";
import AllProjectsPage from "@pages/AllProjectsPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<SignUp />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/proposition-projet" element={<CreateProject />} />
        <Route path="/projets" element={<AllProjectsPage />} />
      </Routes>
    </div>
  );
}

export default App;
