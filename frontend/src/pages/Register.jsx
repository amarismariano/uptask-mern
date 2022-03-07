import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPw, setRepeatPw] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validaciones
    if ([name, email.password, repeatPw].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    //Validación de contraseñas
    if (password !== repeatPw) {
      setAlert({
        msg: "Las contraseñas no son iguales",
        error: true,
      });
      return;
    }
    //Longitud de contraseña para más seguridad
    if (password.length < 6) {
      setAlert({
        msg: "La contraseña es muy corta, mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlert({});

    // Crear el usuario en la API
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
        {
          name,
          email,
          password,
        }
      );
      setAlert({
        msg: data.msg,
        error: false,
      });

      //Reiniciamos form
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPw("");
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 fron-black text-6xl capitalize">
        Crea tu Cuenta y Administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Contraseña de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Repetir Password
          </label>
          <input
            value={repeatPw}
            onChange={(e) => setRepeatPw(e.target.value)}
            id="password2"
            type="password"
            placeholder="Repite tu contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una Cuenta? Inicia Sesión!
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Register;
