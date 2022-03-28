import Project from "../models/Project.js";
import Task from "../models/Task.js";

const createTask = async (req, res) => {
  //Crear tarea
  const { project } = req.body;

  const projectExist = await Project.findById(project);

  //Verificamos que el proyecto existe
  if (!projectExist) {
    const error = new Error("El proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }

  //Verificamos si la persona que crea tarea es el creador del proyecto
  if (projectExist.owner.toString() !== req.user._id.toString()) {
    //Si no lo es:
    const error = new Error("No tienes permisos para agregar tareas");
    return res.status(404).json({ msg: error.message });
  }
  // SI todo pasa
  try {
    const savedTask = await Task.create(req.body);
    // We save the ID of the task in his parent project
    projectExist.tasks.push(savedTask._id);
    await projectExist.save();
    res.json(savedTask);
  } catch (error) {
    console.log(error);
  }

  console.log("Existe proyecto");
};

const getTask = async (req, res) => {
  //Obtener tarea en especifico x id
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  //Verificamos existencia de la tarea
  if (!task) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  //Verificamos el owner del proyecto
  if (task.project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error.message });
  }

  //Mandamos tarea
  res.json(task);
};

const updateTask = async (req, res) => {
  //Actualizar tarea
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  //Verificamos existencia de la tarea
  if (!task) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  //Verificamos el owner del proyecto
  if (task.project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error.message });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.deadline = req.body.deadline || task.deadline;

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  //Eliminar tarea
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  //Verificamos existencia de la tarea
  if (!task) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  //Verificamos el owner del proyecto
  if (task.project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error.message });
  }
  try {
    await task.deleteOne();
    res.json({ msg: "La Tarea se eliminó" });
  } catch (error) {
    console.log(error);
  }
};

const statusChange = async (req, res) => {
  //Cambiar estado de la tarea
};

export { createTask, getTask, updateTask, deleteTask, statusChange };
