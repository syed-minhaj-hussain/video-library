import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // const getAuthToken = JSON.parse(localStorage.getItem("token")) || null;
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  // console.log({ auth });
  // console.log(getAuthToken);

  // useEffect(() => {
  //   setUsers(JSON.parse(localStorage.getItem("updatedUsers")) || usersDB);
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem("updatedUsers", JSON.stringify(users));
  // }, [users]);

  const login = async (text, password, route) => {
    try {
      const response = await axios.post(
        "https://clink-player-backend.herokuapp.com/login",
        { email: text, password: password }
      );
      //
      if (response) {
        console.log({ response });
        const authToken = response?.data?.authtoken;
        setAuth(authToken);
        localStorage.setItem("token", JSON.stringify(authToken));
        navigate(route ? route : "/");
      }
    } catch (err) {
      setAuth(null);
      console.log({ error: err?.response?.data?.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
    navigate("/");
  };

  const register = async (text, email, password) => {
    try {
      const response = await axios.post(
        "https://clink-player-backend.herokuapp.com/register",
        { name: text, email: email, password: password }
      );
      //
      if (response) {
        console.log(response?.data?.message);
        navigate("/login");
      }
    } catch (err) {
      console.log({ error: err?.response?.data?.message });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        setAuth,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
