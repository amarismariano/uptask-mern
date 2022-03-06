import express from "express";
const router = express.Router();

import { register, authUser } from "../controllers/userController.js";

//Auth, Regis, Confirmation of Users
router.post("/", register); //Creates a new user
router.post("/login", authUser);

export default router;
