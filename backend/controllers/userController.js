import User from "../models/User.js";
import idGenerator from "../helpers/idGenerator.js";

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
    user.token = idGenerator(); // Generamos ID desde helpers
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar que el usuario esté confirmando
  if (!user.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //Comprobar su password
  if (await user.confirmPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    const error = new Error("El password es Incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

export { register, authUser };
