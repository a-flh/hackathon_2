import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@pages/AdminDashboard";
import Page404 from "@pages/Page404";
import CreateProject from "@pages/CreateProject";
import UserHome from "./pages/UserHome";
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
        <Route path="/mon-compte" element={<UserHome />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/createproject" element={<CreateProject />} />
      </Routes>
    </div>
  );
}

export default App;
