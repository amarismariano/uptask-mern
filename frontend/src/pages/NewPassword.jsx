import React from "react";
import { Link } from "react-router-dom";

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 fron-black text-6xl capitalize">
        Reestablece tu contraseña y no pierdas acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Nueva Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu nueva contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Guardar Nueva Contraseña"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NewPassword;
