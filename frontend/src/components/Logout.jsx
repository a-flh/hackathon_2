import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
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
