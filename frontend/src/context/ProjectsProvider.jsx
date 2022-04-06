import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [collaborator, setCollaborator] = useState({});
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        //Validamos token
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios("/proyectos", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  //Agregar o editar proyecto
  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  //Editar Proyecto
  const editProject = async (project) => {
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/proyectos/${project.id}`,
        project,
        config
      );
      // Sincronizar state
      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      setProjects(updatedProjects);

      setAlert({
        msg: "Proyecto Actualizado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  //Crer proyecto
  const newProject = async (project) => {
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/proyectos", project, config);
      setProjects([...projects, data]);

      setAlert({
        msg: "Proyecto Creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener proyecto por id
  const getProject = async (id) => {
    setLoading(true);
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios(`/proyectos/${id}`, config);
      setProject(data);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Eliminar proyecto
  const deleteProject = async (id) => {
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/proyectos/${id}`, config);

      //Sincronizar state
      const updatedProjects = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(updatedProjects);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  //Estado del modal para agregar las tareas
  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  };

  //Agregamos las tareas
  const submitTask = async (task) => {
    // To make sure when its creating o editing a new/existing task
    if (task?.id) {
      await editTask(task);
    } else {
      await addTask(task);
    }
  };

  // Submit task
  const addTask = async (task) => {
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/tareas", task, config);

      //Agrega la tarea al estado
      const updatedProject = { ...project };
      updatedProject.tasks = [...project.tasks, data];

      //Seteamos y actualizamos
      setProject(updatedProject);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit Task
  const editTask = async (task) => {
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/tareas/${task.id}`,
        task,
        config
      );

      // We update the DOM by validating our current states and then we set the new changes
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );

      setProject(updatedProject);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Modal for the edit of the tasks
  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  //Modal for the delete of a task
  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  //Delete Task
  const deleteTask = async () => {
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/tareas/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false,
      });

      // We update the DOM by validating our current states and then we set the new changes
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.filter(
        (taskState) => taskState._id !== task._id
      );

      setProject(updatedProject);
      setModalDeleteTask(false);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  //We add new Collaborators to the project
  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        "/proyectos/colaboradores",
        { email },
        config
      );
      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = async (email) => {
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/proyectos/colaboradores/${project._id}`,
        email,
        config
      );
      setAlert({
        msg: data.msg,
        error: false,
      });
      setCollaborator({});
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalDeleteCollaborator = (collaborator) => {
    setModalDeleteCollaborator(!modalDeleteCollaborator);
    setCollaborator(collaborator);
  };

  // Eliminar colaborador
  const deleteCollaborator = async () => {
    try {
      //Validamos token
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/proyectos/eliminar-colaborador/${project._id}`,
        { id: collaborator._id },
        config
      );
      const updatedProject = { ...project };
      updatedProject.collaborators = updatedProject.collaborators.filter(
        (collaboratorState) => collaboratorState._id !== collaborator._id
      );
      setProject(updatedProject);

      setAlert({
        msg: data.msg,
        error: false,
      });
      setCollaborator({});
      setModalDeleteCollaborator(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        project,
        task,
        alert,
        loading,
        collaborator,
        modalFormTask,
        modalDeleteTask,
        modalDeleteCollaborator,
        showAlert,
        submitProject,
        getProject,
        deleteProject,
        handleModalTask,
        handleModalEditTask,
        handleModalDeleteTask,
        submitTask,
        deleteTask,
        submitCollaborator,
        addCollaborator,
        handleModalDeleteCollaborator,
        deleteCollaborator,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
