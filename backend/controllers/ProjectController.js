import Project from "../models/Project.js";

const getProjects = async (req, res) => {
  //Obtener proyectos
  const projects = await Project.find().where("owner").equals(req.user);

  res.json(projects);
};

const newProject = async (req, res) => {
  //Crear proyecto
  const project = new Project(req.body);
  project.owner = req.user._id; // EL usuario que crea el proyecto será el dueño
  try {
    const savedProject = await project.save(); // Guardamos proyecto en base de datos
    res.json(savedProject);
  } catch (error) {
    console.log(error);
  }
};

const getProject = async (req, res) => {
  //Obtener 1 proyecto determinado
  const { id } = req.params;
  const project = await Project.findById(id);

  //Si no existe proyecto
  if (!project) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // Si no es el creador del proyecto, no podrá usarlo/obtenerlo
  if (project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  res.json(project);
};

const editProject = async (req, res) => {
  // Editar proyecto
  const { id } = req.params;
  const project = await Project.findById(id);

  //Si no existe proyecto
  if (!project) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // Si no es el creador del proyecto, no podrá usarlo/obtenerlo
  if (project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  // Mandamos el nuevo nombre, si no encuentra ninguno simplemente coloca lo que existe en la base de datos
  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.deadline = req.body.deadline || project.deadline;
  project.client = req.body.client || project.client;

  try {
    const savedProject = await project.save();
    return res.json(savedProject);
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (req, res) => {
  //Eliminar proyecto
  const { id } = req.params;
  const project = await Project.findById(id);

  //Si no existe proyecto
  if (!project) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // Si no es el creador del proyecto, no podrá usarlo/obtenerlo
  if (project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }
  //Si pasa validaciones pasamos a eliminar proyecto
  try {
    await project.deleteOne();
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const addCollaborator = async (req, res) => {
  //Agregar colaborador/Ayudante
};

const deleteCollaborator = async (req, res) => {
  //Eliminar colaborador
};

const getTasks = async (req, res) => {
  //Obtener tareas
};

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getTasks,
};