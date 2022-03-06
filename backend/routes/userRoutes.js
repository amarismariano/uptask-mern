import express from "express";
const router = express.Router();
import {
  register,
  authUser,
  authenticate,
} from "../controllers/userController.js";

//Auth, Regis, Confirmation of Users
router.post("/", register); //Creates a new user
router.post("/login", authUser);
router.get("/confirmar/:token", authenticate);

export default router;
