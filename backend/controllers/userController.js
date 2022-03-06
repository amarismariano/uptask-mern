import User from "../models/User.js";
import idGenerator from "../helpers/idGenerator.js";
import generateJWT from "../helpers/JWTGenerator.js";

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
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("El password es Incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

//Confirmar
const authenticate = async (req, res) => {
  const { token } = req.params;
  const confirmedUser = await User.findOne({ token });
  if (!confirmedUser) {
    // Verificación de existencia de usuario
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }
  try {
    //Si existe el usuario cambiamos datos de confirmación y guardamos en la base de datos
    confirmedUser.confirmed = true;
    confirmedUser.token = "";
    await confirmedUser.save();
    res.json({ msg: "Usuario confirmado correctamente" });
    //Dado que es un token de un solo uso, si se vuelve a tratar de confirmar saldrá que el token no es válido (postman)
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    // Validación
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //Si usuario existe
  try {
    user.token = idGenerator();
    await user.save();
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;
  const validToken = await User.findOne({ token });
  if (validToken) {
    res.json({ msg: "Token válido y el usuario existe" });
  } else {
    const error = new Error("El token NO es válido");
    return res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });
  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("El token NO es válido");
    return res.status(404).json({ msg: error.message });
  }
};

const profile = async (req, res) => {
  console.log("Desde perfil");
};

export {
  register,
  authUser,
  authenticate,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
};
