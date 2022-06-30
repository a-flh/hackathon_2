import axios from "axios";
import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

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
    <div>
      <p>Nom: {project.name}</p>
      {project.customer && <p>Client: {project.customer}</p>}
      <p>Description: {project.description}</p>
      <p>Date de création: {project.startDate}</p>
      <p>Avancée: {project.state}</p>
      <button type="button" onClick={handleDelete}>
        Clôturer ce projet
      </button>
    </div>
  );
}

export default ProjectCard;
