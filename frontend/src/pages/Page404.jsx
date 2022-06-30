import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/Page404.css";

function Page404() {
  return (
    <div className="error-page" title="404">
      <p> Error 404 </p>
      <NavLink to="/" className="link-home">
        {" "}
        Page d'accueil
      </NavLink>
    </div>
  );
}

export default Page404;
