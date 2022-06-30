import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Logout from "@components/Logout";
import Moment from "moment";
import Modal from "@components/Modal";
import logoapside from "../assets/img/logoapside.svg";
import createproject from "../assets/img/createproject.jpg";
import "../assets/common.css";
import "../assets/CreateProject.css";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [description, setDescription] = useState("");
  const startDate = Moment().format("DD-MM-YYYY");
  const [modal, setModal] = useState(false);

  const handleRegisterProject = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/add/projects`, {
        name,
        customer,
        description,
        startDate,
      })
      .then((res) => console.warn(res))
      .catch((err) => console.error(err));
  };

  const toggleModal = () => {
    setModal(false);
  };

  return (
    <div className="login-container">
      <Link to="/">
        <img src={logoapside} className="login-logo" alt="sellect-logo" />
      </Link>
      <div className="login-form-container">
        <h2>
          Bonjour ! <span>Un nouveau projet ?</span>
        </h2>
        <form
          className="createproject-form-content"
          onSubmit={handleRegisterProject}
        >
          <input
            type="text"
            placeholder="Nom"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client (facultatif)"
            value={customer}
            required
            onChange={(e) => setCustomer(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Decrivez votre projet"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="project-button-container">
            <button type="submit">VALIDER</button>
          </div>
        </form>
        <NavLink to="/projets" className="link-other-pages">
          {" "}
          Consulter les autres projets
        </NavLink>
        {modal && (
          <Modal
            toggleModal={toggleModal}
            modalMessage="Votre projet a bien été créé !"
          />
        )}
        <Logout />
      </div>
      <div className="login-image-container">
        <img className="login-image" src={createproject} alt="happyWoman" />
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
