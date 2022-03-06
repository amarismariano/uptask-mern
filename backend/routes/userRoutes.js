import express from "express";
const router = express.Router();

import { register } from "../controllers/userController.js";

//Auth, Regis, Confirmation of Users
router.post("/", register); //Creates a new user

export default router;
