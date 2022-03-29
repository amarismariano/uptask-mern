import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormCollaborator = () => {
  const [email, setEmail] = useState("");

  const { showAlert, alert, submitCollaborator } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      showAlert({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    submitCollaborator(email);
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="email"
        >
          Email Colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email del Usuario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
        value="Buscar Colaborador"
      />
    </form>
  );
};

export default FormCollaborator;
