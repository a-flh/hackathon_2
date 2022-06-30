import React, { useState } from "react";
import axios from "axios";
import "../assets/common.css";
import "../assets/CreateProject.css";

export default function CreateProject() {
  const [nameproject, setNameproject] = useState("");
  const [customer, setCustomer] = useState("");
  const [description, setDescription] = useState("");
  const [stateproject, setStateproject] = useState("");

  const handleRegisterProject = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/members/projects`, {
        nameproject,
        customer,
        description,
        stateproject,
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
          value={nameproject}
          required
          onChange={(e) => setNameproject(e.target.value)}
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
        <select
          name="state"
          id="state-select"
          onChange={(e) => setStateproject(e.target.value)}
        >
          <option value="" required="">
            Avancement du projet
          </option>
          <option value="conception">En phase de conception</option>
          <option value="Pret">Prêt</option>
          <option value="production">En production</option>
        </select>
        <div className="prject-button-container">
          <button type="submit">VALIDER</button>
        </div>
      </form>
    </div>
  );
}
