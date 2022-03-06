import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

//Routing
app.use("/api/usuarios", userRoutes);
app.use("/api/proyectos", projectRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
