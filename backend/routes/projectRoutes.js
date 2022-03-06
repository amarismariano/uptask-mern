import express from "express";
import {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
} from "../controllers/ProjectController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, getProjects).post(checkAuth, newProject);

router
  .route("/:id")
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.post("/agregar-colaborador/:id", checkAuth, addCollaborator);
router.post("/eliminar-colaborador/:id", checkAuth, deleteCollaborator);

export default router;
