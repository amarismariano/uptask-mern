import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
