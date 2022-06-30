import axios from "axios";
import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import "../assets/common.css";
import "../assets/Project.css";

function ProjectCard({ projects, setProjects, project }) {
  const { setDeleteModal } = useContext(MainContext);
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
      <div className="button-container">
        <button type="button">Rejoindre</button>
        <button type="button" onClick={handleDelete}>
          Clôturer
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
