import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //State para autenticacion de usuarios
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  //Comprobar que haya token
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");

      //Validación del token
      if (!token) {
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
      } catch (error) {
        console.log(error);
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
