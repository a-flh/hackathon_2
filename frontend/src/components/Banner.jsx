import { NavLink } from "react-router-dom";
import "../assets/Banner.css";
import "../assets/common.css";
import Logout from "./Logout";
import logoapside from "../assets/img/logoapside.svg";

export default function Banner() {
  return (
    <>
      <div className="div-logo">
        <img src={logoapside} alt="logo apside" className="img-apside" />
      </div>

      <div className="container-banner">
        <h1>
          {" "}
          L'outil collaboratif qui rassemble tous les APSIDIENS au niveau
          National
        </h1>
        {localStorage.getItem("loggedIn") ? (
          <div className="btn-div">
            <Logout />
          </div>
        ) : (
          <div className="btn-div">
            <NavLink to="/inscription" className="items">
              <button
                className="button-member"
                type="button"
                /* onClick={handleClick} */
              >
                S'inscrire
              </button>
            </NavLink>
            <NavLink to="/connexion" className="items">
              <button
                className="button-connect"
                type="button"
                /* onClick={handleClick} */
              >
                Se connecter
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}
