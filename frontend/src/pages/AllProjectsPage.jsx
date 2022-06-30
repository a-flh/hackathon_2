import React, { useState, useEffect, useContext } from "react";
import Logout from "@components/Logout";
import { NavLink } from "react-router-dom";
import Modal from "@components/Modal";
import { MainContext } from "../contexts/MainContext";

export default function AllProjectsPage() {
  const {
    isFirstConnection,
    setIsFirstConnection,
    /* userData,
    setUserData, */
  } = useContext(MainContext);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(false);
    setIsFirstConnection(false);
  };

  useEffect(() => {
    /* if (!localStorage.getItem("loggedIn")) {
      navigate("/connexion");
    } */
    if (isFirstConnection) {
      setTimeout(() => {
        setModal(true);
      }, 1000);
    }
  }, []);

  return (
    <div>
      Hello projects
      <p>
        Vous souhaitez partager une idée ou un projet ?{" "}
        <NavLink to="/proposition-projet">C'est par ici !</NavLink>
      </p>
      <Logout />
      {modal && (
        <Modal
          toggleModal={toggleModal}
          modalMessage="Votre inscription a bien été prise en compte !"
        />
      )}
    </div>
  );
}
