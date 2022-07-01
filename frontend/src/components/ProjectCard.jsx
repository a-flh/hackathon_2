import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import "../assets/common.css";
import "../assets/Project.css";

function ProjectCard({ projects, setProjects, project }) {
  const { setDeleteModal } = useContext(MainContext);
  const memberId = parseInt(localStorage.getItem("userId"), 10);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/members/${memberId}`)
      .then((res) => {
        setName(`${res.data.firstname} ${res.data.lastname}`);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (e) => {
    return window.confirm("Voulez-vous vraiment supprimer ce projet ?")
      ? axios
          .delete(`${import.meta.env.VITE_BACKEND_URL}/projects/${project.id}`)
          .then(() => {
            setProjects(projects.filter((u) => u !== project));
            setTimeout(() => {
              setDeleteModal(true);
            }, 1000);
          })
          .catch((err) => console.error(err))
      : e.preventDefault();
  };
  /* eslint-disable */
  const handleJoin = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/join/projects/${project.id}`, {
        currentMembers: name,
      })
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.error(err));
  };

  /* eslint-enable */

  return (
    <div className="project-container">
      <p>
        <span className="project-entitled">Nom:</span>{" "}
        <span className="project-header">{project.name}</span>
      </p>
      {project.customer && (
        <p>
          <span className="project-entitled">Client:</span>{" "}
          <span className="project-header">{project.customer}</span>
        </p>
      )}
      <p>
        <span className="project-entitled">Description:</span>{" "}
        {project.description}
      </p>
      <p>
        <span className="project-entitled">Date de création:</span>{" "}
        {project.startDate}
      </p>
      <p>
        <span className="project-entitled">Avancée:</span> {project.state}
      </p>
      {project.currentMembers && (
        <p>
          <span className="project-entitled">Membres:</span>{" "}
          {project.currentMembers}
        </p>
      )}
      <div className="button-container">
        <button type="button" onClick={handleJoin}>
          Rejoindre
        </button>
        <button type="button" onClick={handleDelete}>
          Clôturer
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
