import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useToastContext } from "./ToastContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { toast, runToast } = useToastContext();
  // const getAuthToken = JSON.parse(localStorage.getItem("token")) || null;
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const login = async (text, password, route) => {
    try {
      const response = await axios.post(
        "https://clink-player-backend.herokuapp.com/login",
        { email: text, password: password }
      );
      //
      if (response?.data?.success === true) {
        // console.log({ response });
        runToast(toast.success, "User Logged In Successfully");
        const authToken = response?.data?.authtoken;
        setAuth(authToken);
        localStorage.setItem("token", JSON.stringify(authToken));
        navigate(route ? route : "/");
      } else {
        // console.log(response);
        runToast(toast.error, response?.data?.message);
      }
    } catch (err) {
      setAuth(null);
      runToast(toast.error, err?.response?.data?.message);
      console.log({ error: err?.response?.data?.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
    runToast(toast.success, "User Logged Out Successfully!");
    navigate("/");
  };

  const register = async (text, email, password) => {
    try {
      const response = await axios.post(
        "https://clink-player-backend.herokuapp.com/register",
        { name: text, email: email, password: password }
      );
      //
      if (response?.data?.success === true) {
        // console.log(response);
        runToast(toast.success, response?.data?.message);
        navigate("/login");
      } else {
        // console.log(response);
        runToast(toast.error, response?.data?.message);
      }
    } catch (err) {
      console.log({ error: err?.response?.data?.message });
      runToast(toast.error, err?.response?.data?.message);
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
