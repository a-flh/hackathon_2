import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logoapside from "../assets/img/logoapside.svg";
import "../assets/common.css";
import "../assets/CreateProject.css";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [description, setDescription] = useState("");

  const handleRegisterProject = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/add/projects`, {
        name,
        customer,
        description,
      })
      .then((res) => console.warn(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="createproject-form-container">
      <Link to="/">
        <img src={logoapside} className="login-logo" alt="sellect-logo" />
      </Link>
      <h2>Création de projet</h2>
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
          placeholder="Client"
          value={customer}
          required
          onChange={(e) => setCustomer(e.target.value)}
        />

        <textarea
          type="email"
          placeholder="Decrivez votre projet"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="project-button-container">
          <button type="submit">VALIDER</button>
        </div>
      </form>
    </div>
  );
}
