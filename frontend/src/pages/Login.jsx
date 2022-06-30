import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/common.css";
import "../assets/Login.css";
// import { MainContext } from "../contexts/MainContext";
import logoapside from "../assets/img/logoapside.svg";
import login from "../assets/img/login.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login/members`, {
        email,
        password,
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("userId", res.data.id);
          localStorage.setItem("loggedIn", true);
          navigate("/projets");
        }
      })
      .catch((err) => {
        // console.error(err.message);
        if (err) {
          setLoginError(true);
          setTimeout(() => {
            setLoginError(false);
          }, 5000);
        }
      });
  };

  return (
    <div className="login-container">
      <Link to="/">
        <img src={logoapside} className="login-logo" alt="sellect-logo" />
      </Link>
      <div className="login-form-container">
        <h2>
          Bonjour ! <span> Connectez-vous! </span>
        </h2>
        <form onSubmit={handleLogin} className="login-content">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-container-error">
            {loginError && (
              <span className="error">
                L'email ou le mot de passe ne correspondent pas
              </span>
            )}
          </div>
          <div className="login-button-container">
            <button type="submit">SE CONNECTER</button>
          </div>
        </form>
        <p>
          Pas de compte ?{" "}
          <NavLink to="/inscription" className="link-other-pages">
            Inscrivez-vous !
          </NavLink>
        </p>
      </div>
      <div className="login-image-container">
        <img className="login-image" src={login} alt="happyWoman" />
        <div className="login-image-text">
          <h1>
            Partagez
            <br />
            vos idées
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
