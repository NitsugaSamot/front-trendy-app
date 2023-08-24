import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "../alert/alert";
import axios from "axios";
// import axiosClient from "../../contextClient/config/axiosClient";
import useAuth from "../../contextClient/hooks/useAuth";
import imageLogo from "../../assets/trendy-spot-logo.png";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
      //Informacion requerida: email y password
      const { data } = await axios.post(
        "https://back-trendy-app.up.railway.app/users/login",
        {
          email,
          password,
        }
        );
        setAlert({});
        if(data.isDeleted){
          setAlert({
            msg: "User has been deleted",
            error: true,
          });
          return
        }
      localStorage.setItem("token", data.token);
      setAuth(data);

      // navigate('/')
      navigate("/logged_in");

  };

  const { msg } = alert;

  return (
    <>
      <div className="mainRegister">
        <h3 className="titleLogin">Inicia sesión y has tus compras</h3>

        {msg && <Alert alert={alert} />}

        <form className="formLogin" onSubmit={handleSubmit}>
          <div className="columnaLogin">
            <div className="divInput">
              <label className="label" htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="inputLogin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="divInput">
              <label className="label" htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Password"
                className="inputLogin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="columna">
            <NavLink to="/">
              <img src={imageLogo} alt="logo-home" className="logoRegister" />
            </NavLink>
          </div>

          <input type="submit" value="Iniciar Sesión" className="btnLogin" />
        </form>

        <nav className="navRegister">
          <NavLink className="linksRegister" to="register">
            ¿No tienes una cuenta? Regístrate
          </NavLink>
          <NavLink className="linksRegister" to="/reset-password">
            Olvide mi password
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Login;
