import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import logStyle from "./login.module.css";

export const Login = () => {
  const { isUserLoggedIn, login } = useAuthContext();
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthContext();
  console.log({ isUserLoggedIn });

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className={logStyle.container}>
        <section>
          <div className={logStyle.card}>
            <h3 style={{ marginBottom: "1rem" }}>
              Enter Your Username & Password{" "}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login(text, password, state?.from);
                // console.log(val);
                setText("");
                setPassword("");
              }}
            >
              <div className={logStyle.inputs}>
                <label htmlFor="name">Username :</label>
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Username..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className={logStyle.inputs}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name=""
                  id="password"
                  placeholder="Enter Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Login" className={logStyle.btn} />
            </form>
          </div>
          <p>
            Don't have an account ? <Link to="/register">register</Link>{" "}
          </p>
        </section>
      </div>
    </>
  );
};
