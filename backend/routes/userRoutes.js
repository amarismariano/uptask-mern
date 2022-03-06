import express from "express";
const router = express.Router();
import {
  register,
  authUser,
  authenticate,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

//Auth, Regis, Confirmation of Users
router.post("/", register); //Creates a new user
router.post("/login", authUser);
router.get("/confirmar/:token", authenticate);
router.post("/olvide-password", forgotPassword);
router.route("/olvide-password/:token").get(checkToken).post(newPassword);

router.get("/perfil", checkAuth, profile);

export default router;
