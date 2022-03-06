import User from "../models/User.js";

const register = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

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
