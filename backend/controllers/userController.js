import User from "../models/User.js";

const register = async (req, res) => {
  //Creación de usurios y almacenamiento a la base de datos
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

export { register };
