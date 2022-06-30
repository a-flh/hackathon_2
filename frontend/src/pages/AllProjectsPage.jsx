import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProjectCard from "@components/ProjectCard";
import "../assets/common.css";
import "../assets/Project.css";
import { NavLink } from "react-router-dom";
import Logout from "@components/Logout";
import Modal from "@components/Modal";
import { MainContext } from "../contexts/MainContext";

export default function AllProjectsPage() {
  const [projects, setProjects] = useState("");
  const [searchProjects, setSearchProjects] = useState("");
  const { deleteModal, setDeleteModal } = useContext(MainContext);

  const getProjects = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/projects`, {
        projects,
      })
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getProjects();
  }, []);

  const toggleModal = () => {
    setDeleteModal(false);
  };

  return (
    <div className="allproject-form-container">
      <Logout />
      <div className="title-container">
        <h1>Projets en cours</h1>
      </div>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Rechercher un projet"
          value={searchProjects}
          onChange={(e) => setSearchProjects(e.target.value)}
        />
        <p>
          Une idée de projet ?&nbsp;
          <NavLink to="/proposition-projet" className="link-other-pages">
            C'est par ici !
          </NavLink>
        </p>
      </div>
      <ul className="project-super-container">
        {projects &&
          projects
            /* .sort((a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
            ) */
            .filter(
              (project) =>
                project.name
                  .toLowerCase()
                  .includes(searchProjects.toLowerCase())
              // || project.customer.toLowerCase().includes(searchProjects.toLowerCase())
              // || project.description.toLowerCase().includes(searchProjects.toLowerCase())
            )
            .map((project) => {
              return (
                <li key={project.id}>
                  <ProjectCard
                    project={project}
                    setProjects={setProjects}
                    projects={projects}
                  />
                </li>
              );
            })}
      </ul>
      {deleteModal && (
        <Modal
          toggleModal={toggleModal}
          modalMessage="Le projet a bien été supprimé"
        />
      )}
    </div>
  );
}
