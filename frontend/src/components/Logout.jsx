import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

function Logout() {
  const { setUserData } = useContext(MainContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/logout/members`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          setUserData(null);
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="logout-button-container">
      <button type="button" className="button-member" onClick={handleLogout}>
        Se déconnecter
      </button>
    </div>
  );
}

export default Logout;
