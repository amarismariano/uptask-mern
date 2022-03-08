import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clientAxios(url);

        setAlert({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
        //Si todo sale bien
        setConfirmedAccount(true);
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 fron-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {!confirmedAccount && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia Sesión!
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
