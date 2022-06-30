import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "@components/UserCard";
import "../assets/common.css";
import "../assets/CreateProject.css";

export default function AllProjectsPage() {
  const [projects, setProjects] = useState("");
  const [searchprojects, setSearchprojects] = useState("");

  const getProject = async () => {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/projects`, {
        projects,
      })
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="allproject-form-container">
      <h2>Les projets en cours</h2>
      <input
        type="text"
        placeholder="Rechercher un projet"
        value={searchprojects}
        onChange={(e) => setSearchprojects(e.target.value)}
      />
      <ul>
        {projects &&
          projects
            .sort((a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
            )
            .filter(
              (project) =>
                project.name
                  .toLowerCase()
                  .includes(searchprojects.toLowerCase()) ||
                project.name
                  .toLowerCase()
                  .includes(searchprojects.toLowerCase()) ||
                project.customers
                  .toLowerCase()
                  .includes(searchprojects.toLowerCase()) ||
                project.description.includes(searchprojects)
            )
            .map((project) => {
              return (
                <li key={project.id}>
                  <UserCard
                    project={project}
                    setProjects={setProjects}
                    projects={projects}
                  />
                </li>
              );
            })}
      </ul>
    </div>
  );
}
