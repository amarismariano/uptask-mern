import React from "react";
import useProjects from "../hooks/useProjects";
import PreviewProject from "../components/PreviewProject";

const Projects = () => {
  const { projects } = useProjects();
  console.log(projects);

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hy proyectos
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
