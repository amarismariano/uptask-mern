import express from "express";
import {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  searchCollaborator,
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

router.post("/colaboradores", checkAuth, searchCollaborator);
router.post("/colaboradores/:id", checkAuth, addCollaborator);
router.delete("/colaboradores/:id", checkAuth, deleteCollaborator);

export default router;
