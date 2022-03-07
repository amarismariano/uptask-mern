import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

//Permitir conexiones desde front end
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //Puede consultar API
      callback(null, true);
    } else {
      //No permitido request
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

//Routing
app.use("/api/usuarios", userRoutes);
app.use("/api/proyectos", projectRoutes);
app.use("/api/tareas", taskRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
