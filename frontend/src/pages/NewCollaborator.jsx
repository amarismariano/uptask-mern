import { useEffect } from "react";
import FormCollaborator from "../components/FormCollaborator";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";

const NewCollaborator = () => {
  const { getProject, project, loading } = useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (loading) return "Loading...";

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador(a) al Proyecto: {project.name}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormCollaborator />
      </div>
    </>
  );
};

export default NewCollaborator;
