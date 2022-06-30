import React, { useState } from "react";
import axios from "axios";
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
    <div className="signup-form-container">
      <h2>Bienvenue dans l'équipe !</h2>
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
        <div className="prject-button-container">
          <button type="submit">VALIDER</button>
        </div>
      </form>
    </div>
  );
}
