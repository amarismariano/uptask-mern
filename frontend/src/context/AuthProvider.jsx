import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //State para autenticacion de usuarios
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //Comprobar que haya token
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");

      //Validación del token
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      //Si hay token
      try {
        const { data } = await clientAxios("/usuarios/perfil", config);
        setAuth(data);
        navigate("/proyectos");
      } catch (error) {
        setAuth({}); // SI expira token
      }
      setLoading(false);
    };
    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
