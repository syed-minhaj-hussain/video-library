import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import regStyle from "./register.module.css";

export const Register = () => {
  const { auth, register } = useAuthContext();
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <div className={regStyle.container}>
        <section>
          <div className={regStyle.card}>
            <h3 style={{ marginBottom: "1rem" }}>
              Enter Your Username & Password{" "}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                register(text, email, password);
                setEmail("");
                setText("");
                setPassword("");
              }}
            >
              <div className={regStyle.inputs}>
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
              <div className={regStyle.inputs}>
                <label htmlFor="name">Email :</label>
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={regStyle.inputs}>
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
              <input type="submit" value="Register" className={regStyle.btn} />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
